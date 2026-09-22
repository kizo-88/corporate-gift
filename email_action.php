<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/includes/db.php';
require_once __DIR__ . '/includes/Mailer.php';

// Email action handler - HOD or SBD can approve/reject from email link
$action     = $_GET['action']     ?? '';
$role       = $_GET['role']       ?? '';
$request_id = (int)($_GET['request_id'] ?? 0);
$token      = $_GET['token']      ?? '';

$valid_token = generateActionToken($request_id, $role);

// Validate inputs
if (!in_array($action, ['approve', 'reject']) || !in_array($role, ['hod', 'sbd']) || $request_id <= 0 || !hash_equals($valid_token, $token)) {
    http_response_code(403);
    displayActionPage('error', 'Invalid Link', 'This approval link is invalid, expired, or has already been used.', '#dc2626');
    exit;
}

// Fetch request
$expected_status = ($role === 'hod') ? 'pending_hod' : 'pending_sbd';
$stmt = $pdo->prepare("
    SELECT r.*, g.name AS gift_name, g.stock_count,
           u.name AS requester_name, u.email AS requester_email, u.department AS requester_dept
    FROM requests r
    JOIN gifts g ON r.gift_id = g.id
    JOIN users u ON r.user_id = u.id
    WHERE r.id = ? AND r.status = ?
");
$stmt->execute([$request_id, $expected_status]);
$request = $stmt->fetch();

if (!$request) {
    displayActionPage('error', 'Already Actioned', 'This request has already been reviewed, or no longer requires your input.', '#f59e0b');
    exit;
}

// Find the acting approver's user record by role (look up from DB)
$approver = $pdo->query("SELECT * FROM users WHERE email = '" . SMTP_USER . "' LIMIT 1")->fetch();
if (!$approver) {
    // Find any user with the given role
    $astmt = $pdo->prepare("SELECT * FROM users WHERE role = ? LIMIT 1");
    $astmt->execute([$role]);
    $approver = $astmt->fetch();
}
$approver_id = $approver ? $approver['id'] : 0;

// --- APPROVE ---
if ($action === 'approve') {
    if ($role === 'hod') {
        $pdo->prepare("UPDATE requests SET status='pending_sbd', hod_id=?, hod_notes='Approved via email.', hod_actioned_at=NOW() WHERE id=?")
            ->execute([$approver_id, $request_id]);
        $gift     = ['name' => $request['gift_name']];
        $requester = ['name' => $request['requester_name'], 'email' => $request['requester_email'], 'department' => $request['requester_dept']];
        $hod_data  = ['name' => $approver['name'] ?? 'HOD'];
        $request['hod_notes'] = 'Approved via email.';
        Mailer::sendSbdNotification($request, $requester, $gift, $hod_data);
        displayActionPage('success', 'HOD Approval Confirmed', "Request #$request_id has been approved and forwarded to the Head of SBD for final authorization.", '#065f46');
    } else { // sbd
        if ($request['stock_count'] >= $request['quantity']) {
            $pdo->prepare("UPDATE requests SET status='approved', sbd_id=?, sbd_notes='Approved via email.', sbd_actioned_at=NOW() WHERE id=?")
                ->execute([$approver_id, $request_id]);
            $pdo->prepare("UPDATE gifts SET stock_count = stock_count - ?, status = CASE WHEN (stock_count - ?) <= 0 THEN 'Out of Stock' WHEN (stock_count - ?) <= 5 THEN 'Low Stock' ELSE 'Available' END WHERE id=?")
                ->execute([$request['quantity'], $request['quantity'], $request['quantity'], $request['gift_id']]);
            $gift      = ['name' => $request['gift_name']];
            $requester  = ['name' => $request['requester_name'], 'email' => $request['requester_email'], 'department' => $request['requester_dept']];
            $request['sbd_notes'] = 'Approved via email.';
            Mailer::sendFinalApprovalNotification($request, $requester, $gift);
            displayActionPage('success', 'Request Fully Approved', "Request #$request_id has been authorized. The requester has been notified and stock updated.", '#065f46');
        } else {
            displayActionPage('error', 'Insufficient Stock', "Cannot approve request #$request_id — the item is out of stock.", '#dc2626');
        }
    }
    exit;
}

// --- REJECT: Display rejection reason form ---
if ($action === 'reject') {
    // If notes submitted, process rejection
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['notes'])) {
        $notes = trim($_POST['notes'] ?? 'No reason provided.');
        if ($role === 'hod') {
            $pdo->prepare("UPDATE requests SET status='rejected_hod', hod_id=?, hod_notes=?, hod_actioned_at=NOW() WHERE id=?")
                ->execute([$approver_id, $notes, $request_id]);
        } else {
            $pdo->prepare("UPDATE requests SET status='rejected_sbd', sbd_id=?, sbd_notes=?, sbd_actioned_at=NOW() WHERE id=?")
                ->execute([$approver_id, $notes, $request_id]);
        }
        $gift      = ['name' => $request['gift_name']];
        $requester  = ['name' => $request['requester_name'], 'email' => $request['requester_email'], 'department' => $request['requester_dept']];
        $by_label   = $role === 'hod' ? ($approver['name'] ?? 'HOD') . ' (HOD)' : ($approver['name'] ?? 'Head of SBD') . ' (Head of SBD)';
        Mailer::sendRejectionNotification($request, $requester, $gift, $by_label, $notes);
        displayActionPage('reject_done', 'Request Rejected', "Request #$request_id has been rejected. The requester has been notified.", '#dc2626');
        exit;
    }

    // Show rejection form
    displayRejectionForm($request_id, $role, $token);
    exit;
}

// ===== Helper Functions =====
function displayActionPage(string $type, string $title, string $message, string $color) {
    global $request_id;
    $icon = [
        'success'     => '<i class="fa-solid fa-circle-check text-success" style="font-size:3rem;"></i>',
        'error'       => '<i class="fa-solid fa-triangle-exclamation text-warning" style="font-size:3rem;"></i>',
        'reject_done' => '<i class="fa-solid fa-circle-xmark text-danger" style="font-size:3rem;"></i>'
    ][$type] ?? '<i class="fa-solid fa-circle-info text-info" style="font-size:3rem;"></i>';
?><!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?= htmlspecialchars($title) ?> — UMPSA Holdings</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
<link href="<?= SITE_URL ?>/assets/css/style.css" rel="stylesheet">
</head><body>
<div class="action-wrapper">
  <div class="action-card">
    <div class="action-icon"><?= $icon ?></div>
    <h2><?= htmlspecialchars($title) ?></h2>
    <p class="text-muted mt-2 mb-4"><?= htmlspecialchars($message) ?></p>
    <hr>
    <p style="font-size:.78rem;color:#94a3b8;">UMPSA Holdings Corporate Gift Management System<br>&copy; <?= date('Y') ?> All rights reserved.</p>
  </div>
</div>
</body></html><?php
}

function displayRejectionForm(int $request_id, string $role, string $token) {
?><!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Reject Request — UMPSA Holdings</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
<link href="<?= SITE_URL ?>/assets/css/style.css" rel="stylesheet">
</head><body>
<div class="action-wrapper">
  <div class="action-card text-start" style="max-width:500px;">
    <div class="text-center mb-3"><i class="fa-solid fa-circle-xmark text-danger" style="font-size:3.5rem;"></i></div>
    <h2 class="text-center">Reject Request #<?= $request_id ?></h2>
    <p class="text-muted text-center mb-4">Please provide a reason for rejection. The requester will be notified.</p>
    <form method="POST" action="<?= SITE_URL ?>/email_action.php?action=reject&role=<?= urlencode($role) ?>&request_id=<?= $request_id ?>&token=<?= urlencode($token) ?>"
          onsubmit="document.getElementById('rejectBtn').disabled=true;document.getElementById('rejectBtn').textContent='Processing...';">
      <div class="mb-3">
        <label class="form-label fw-600">Rejection Reason <span class="text-danger">*</span></label>
        <textarea class="form-control" name="notes" rows="4" required placeholder="Please explain the reason for rejection..."></textarea>
      </div>
      <button type="submit" class="btn btn-danger w-100 py-2" id="rejectBtn"><i class="fa-solid fa-times-circle me-2"></i>Confirm Rejection</button>
    </form>
  </div>
</div>
</body></html><?php
}
?>
