<?php
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/Mailer.php';

if (!isLoggedIn() || !hasRole('hod')) {
    header('Location: ' . SITE_URL . '/login.php'); exit;
}
$hod_id   = $_SESSION['user_id'];
$dept     = $_SESSION['department'];

// Handle HOD action (approve/reject) from dashboard
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    $req_id = (int)$_POST['request_id'];
    $notes  = trim($_POST['notes'] ?? '');
    $action = $_POST['action'];

    $req = $pdo->prepare("SELECT r.*, g.name AS gift_name, g.stock_count, u.name AS requester_name, u.email AS requester_email, u.department AS requester_dept FROM requests r JOIN gifts g ON r.gift_id = g.id JOIN users u ON r.user_id = u.id WHERE r.id = ? AND r.status = 'pending_hod'");
    $req->execute([$req_id]);
    $request = $req->fetch();

    if ($request) {
        if ($action === 'approve') {
            $pdo->prepare("UPDATE requests SET status='pending_sbd', hod_id=?, hod_notes=?, hod_actioned_at=NOW() WHERE id=?")
                ->execute([$hod_id, $notes, $req_id]);
            
            $gift = ['name' => $request['gift_name']];
            $requester = ['name' => $request['requester_name'], 'email' => $request['requester_email'], 'department' => $request['requester_dept']];
            $hod_data = ['name' => $_SESSION['name']];
            $request['hod_notes'] = $notes;
            Mailer::sendSbdNotification($request, $requester, $gift, $hod_data);
            $_SESSION['flash'] = ['type' => 'success', 'title' => 'Approved!', 'message' => "Request #$req_id has been approved and forwarded to SBD."];
        } elseif ($action === 'reject') {
            $pdo->prepare("UPDATE requests SET status='rejected_hod', hod_id=?, hod_notes=?, hod_actioned_at=NOW() WHERE id=?")
                ->execute([$hod_id, $notes, $req_id]);
            $gift = ['name' => $request['gift_name']];
            $requester = ['name' => $request['requester_name'], 'email' => $request['requester_email'], 'department' => $request['requester_dept']];
            Mailer::sendRejectionNotification($request, $requester, $gift, $_SESSION['name'] . ' (HOD)', $notes);
            $_SESSION['flash'] = ['type' => 'warning', 'title' => 'Rejected', 'message' => "Request #$req_id has been rejected and the requester notified."];
        }
    }
    header('Location: ' . SITE_URL . '/hod/index.php'); exit;
}

// Fetch requests from HOD's department
$requests_stmt = $pdo->prepare("
    SELECT r.*, g.name AS gift_name, u.name AS requester_name, u.email AS requester_email
    FROM requests r
    JOIN gifts g ON r.gift_id = g.id
    JOIN users u ON r.user_id = u.id
    WHERE r.status = 'pending_hod' AND u.department = ?
    ORDER BY r.requested_at ASC
");
$requests_stmt->execute([$dept]);
$pending_requests = $requests_stmt->fetchAll();

$all_stmt = $pdo->prepare("
    SELECT r.*, g.name AS gift_name, u.name AS requester_name, u.email AS requester_email
    FROM requests r
    JOIN gifts g ON r.gift_id = g.id
    JOIN users u ON r.user_id = u.id
    WHERE r.hod_id = ? OR (r.status = 'pending_hod' AND u.department = ?)
    ORDER BY r.requested_at DESC
");
$all_stmt->execute([$hod_id, $dept]);
$all_requests = $all_stmt->fetchAll();

$pending_count = count($pending_requests);

require_once __DIR__ . '/../includes/header.php';
$statusLabels = [
    'pending_hod'  => ['label' => 'Pending HOD', 'class' => 'status-pending-hod'],
    'pending_sbd'  => ['label' => 'Pending SBD', 'class' => 'status-pending-sbd'],
    'approved'     => ['label' => 'Approved',    'class' => 'status-approved'],
    'rejected_hod' => ['label' => 'Rejected',    'class' => 'status-rejected-hod'],
    'rejected_sbd' => ['label' => 'Rejected',    'class' => 'status-rejected-sbd'],
];
?>

<div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
  <div>
    <h1 class="page-title"><i class="fa-solid fa-building me-2 text-primary"></i>Department Approvals</h1>
    <p class="page-subtitle">Review and action gift requests from <strong><?= htmlspecialchars($dept ?? 'your department') ?></strong>.</p>
  </div>
  <?php if ($pending_count > 0): ?>
    <span class="badge bg-danger fs-6 py-2 px-3"><i class="fa-solid fa-bell me-2"></i><?= $pending_count ?> Pending</span>
  <?php endif; ?>
</div>

<div class="row g-3 mb-4">
  <div class="col-md-4">
    <div class="stat-card stat-amber" onclick="document.getElementById('hodTable').scrollIntoView({behavior:'smooth'})" title="Jump to Pending Requests"><div class="stat-icon"><i class="fa-solid fa-hourglass-half"></i></div><div class="stat-value"><?= $pending_count ?></div><div class="stat-label">Awaiting Your Action</div></div>
  </div>
</div>

<div class="card-premium">
  <div class="card-header-umpsa"><i class="fa-solid fa-table me-2"></i>All Department Requests</div>
  <div class="p-3">
    <div class="table-responsive">
      <table id="hodTable" class="table table-hover align-middle" style="width:100%">
        <thead>
          <tr><th>#ID</th><th>Requester</th><th>Gift</th><th>Qty</th><th>Event</th><th>Date</th><th>Justification</th><th>Status</th><th>Action</th></tr>
        </thead>
        <tbody>
          <?php foreach ($all_requests as $r): ?>
          <?php $s = $statusLabels[$r['status']] ?? ['label' => $r['status'], 'class' => 'status-pending-hod']; ?>
          <tr>
            <td><strong>#<?= $r['id'] ?></strong></td>
            <td><?= htmlspecialchars($r['requester_name']) ?></td>
            <td><?= htmlspecialchars($r['gift_name']) ?></td>
            <td><?= $r['quantity'] ?></td>
            <td><?= htmlspecialchars($r['event_name']) ?></td>
            <td><?= date('d M Y', strtotime($r['requested_at'])) ?></td>
            <td><a href="<?= SITE_URL ?>/uploads/justifications/<?= urlencode($r['justification_file']) ?>" target="_blank" class="btn btn-sm btn-umpsa-blue"><i class="fa-solid fa-file"></i></a></td>
            <td><span class="status-badge <?= $s['class'] ?>"><?= $s['label'] ?></span></td>
            <td>
              <?php if ($r['status'] === 'pending_hod'): ?>
                <button class="btn btn-sm btn-success me-1" onclick="openAction(<?= $r['id'] ?>, 'approve', '<?= htmlspecialchars(addslashes($r['requester_name'])) ?>')"><i class="fa-solid fa-check me-1"></i>Approve</button>
                <button class="btn btn-sm btn-danger" onclick="openAction(<?= $r['id'] ?>, 'reject', '<?= htmlspecialchars(addslashes($r['requester_name'])) ?>')"><i class="fa-solid fa-times me-1"></i>Reject</button>
              <?php else: ?><span class="text-muted">—</span><?php endif; ?>
            </td>
          </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>
  </div>
</div>

<!-- Action Modal -->
<div class="modal fade" id="actionModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header modal-header-umpsa">
        <h5 class="modal-title" id="actionModalTitle">Action</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <form method="POST" id="actionForm" onsubmit="showLoading('Processing approval...')">
        <input type="hidden" name="request_id" id="action_req_id">
        <input type="hidden" name="action" id="action_type">
        <div class="modal-body p-4">
          <p id="actionDescription" class="mb-3"></p>
          <label class="form-label">Notes / Comments <span class="text-muted">(optional for approval, recommended for rejection)</span></label>
          <textarea class="form-control" name="notes" rows="3" placeholder="Enter your notes here..."></textarea>
        </div>
        <div class="modal-footer border-0">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancel</button>
          <button type="submit" class="btn" id="actionSubmitBtn">Confirm</button>
        </div>
      </form>
    </div>
  </div>
</div>

<?php require_once __DIR__ . '/../includes/footer.php'; ?>

<script>
$(document).ready(function() {
    if ($('#hodTable').length) {
        $('#hodTable').DataTable({
            order: [[5, 'desc']],
            language: {
                emptyTable: "<div class='py-3 text-muted'><i class='fa-solid fa-folder-open me-2 text-primary'></i>No department requests found.</div>"
            }
        });
    }
});

function openAction(id, action, name) {
    document.getElementById('action_req_id').value = id;
    document.getElementById('action_type').value = action;
    const isApprove = action === 'approve';
    document.getElementById('actionModalTitle').innerHTML = isApprove ? '<i class="fa-solid fa-circle-check me-2 text-success"></i>Approve Request' : '<i class="fa-solid fa-circle-xmark me-2 text-danger"></i>Reject Request';
    document.getElementById('actionDescription').innerHTML = isApprove
        ? `Approving request <strong>#${id}</strong> from <strong>${name}</strong> will forward it to the Head of SBD for final approval.`
        : `Rejecting request <strong>#${id}</strong> from <strong>${name}</strong> will notify the requester immediately.`;
    const btn = document.getElementById('actionSubmitBtn');
    btn.innerHTML = isApprove ? '<i class="fa-solid fa-circle-check me-1"></i> Approve & Forward' : '<i class="fa-solid fa-circle-xmark me-1"></i> Confirm Rejection';
    btn.className = 'btn ' + (isApprove ? 'btn-success' : 'btn-danger');
    new bootstrap.Modal(document.getElementById('actionModal')).show();
}
</script>
