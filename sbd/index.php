<?php
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/Mailer.php';

if (!isLoggedIn() || !hasRole('sbd')) {
    header('Location: ' . SITE_URL . '/login.php'); exit;
}
$sbd_id = $_SESSION['user_id'];

// Handle SBD action from dashboard
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    $req_id = (int)$_POST['request_id'];
    $notes  = trim($_POST['notes'] ?? '');
    $action = $_POST['action'];

    $req = $pdo->prepare("SELECT r.*, g.name AS gift_name, g.stock_count, u.name AS requester_name, u.email AS requester_email, u.department AS requester_dept FROM requests r JOIN gifts g ON r.gift_id = g.id JOIN users u ON r.user_id = u.id WHERE r.id = ? AND r.status = 'pending_sbd'");
    $req->execute([$req_id]);
    $request = $req->fetch();

    if ($request) {
        if ($action === 'approve') {
            if ($request['stock_count'] >= $request['quantity']) {
                $pdo->prepare("UPDATE requests SET status='approved', sbd_id=?, sbd_notes=?, sbd_actioned_at=NOW() WHERE id=?")
                    ->execute([$sbd_id, $notes, $req_id]);
                $pdo->prepare("UPDATE gifts SET stock_count = stock_count - ?, status = CASE WHEN (stock_count - ?) <= 0 THEN 'Out of Stock' WHEN (stock_count - ?) <= 5 THEN 'Low Stock' ELSE 'Available' END WHERE id=?")
                    ->execute([$request['quantity'], $request['quantity'], $request['quantity'], $request['gift_id']]);
                
                logAudit('Approvals', 'SBD_APPROVE', "Head of SBD (" . $_SESSION['name'] . ") granted final approval for Request #$req_id (" . $request['gift_name'] . " x" . $request['quantity'] . "). Stock deducted automatically." . (!empty($notes) ? " Notes: " . $notes : ""), $req_id);

                $gift = ['name' => $request['gift_name']];
                $requester = ['name' => $request['requester_name'], 'email' => $request['requester_email'], 'department' => $request['requester_dept']];
                $request['sbd_notes'] = $notes;
                Mailer::sendFinalApprovalNotification($request, $requester, $gift);
                $_SESSION['flash'] = ['type' => 'success', 'title' => 'Approved!', 'message' => "Request #$req_id has been fully approved. Requester has been notified."];
            } else {
                $_SESSION['flash'] = ['type' => 'error', 'title' => 'Insufficient Stock', 'message' => 'Cannot approve — not enough stock available.'];
            }
        } elseif ($action === 'reject') {
            $pdo->prepare("UPDATE requests SET status='rejected_sbd', sbd_id=?, sbd_notes=?, sbd_actioned_at=NOW() WHERE id=?")
                ->execute([$sbd_id, $notes, $req_id]);
            
            logAudit('Approvals', 'SBD_REJECT', "Head of SBD (" . $_SESSION['name'] . ") rejected Request #$req_id (" . $request['gift_name'] . ")." . (!empty($notes) ? " Reason: " . $notes : ""), $req_id);

            $gift = ['name' => $request['gift_name']];
            $requester = ['name' => $request['requester_name'], 'email' => $request['requester_email'], 'department' => $request['requester_dept']];
            Mailer::sendRejectionNotification($request, $requester, $gift, $_SESSION['name'] . ' (Head of SBD)', $notes);
            $_SESSION['flash'] = ['type' => 'warning', 'title' => 'Rejected', 'message' => "Request #$req_id has been rejected."];
        }
    }
    header('Location: ' . SITE_URL . '/sbd/index.php'); exit;
}

$pending_stmt = $pdo->query("SELECT COUNT(*) FROM requests WHERE status='pending_sbd'");
$pending_count = (int)$pending_stmt->fetchColumn();

$requests_stmt = $pdo->query("
    SELECT r.*, g.name AS gift_name, u.name AS requester_name, u.email AS requester_email, u.department,
           hu.name AS hod_name
    FROM requests r
    JOIN gifts g ON r.gift_id = g.id
    JOIN users u ON r.user_id = u.id
    LEFT JOIN users hu ON r.hod_id = hu.id
    WHERE r.status = 'pending_sbd'
    ORDER BY r.hod_actioned_at ASC
");
$requests = $requests_stmt->fetchAll();

require_once __DIR__ . '/../includes/header.php';
?>

<div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
  <div>
    <h1 class="page-title"><i class="fa-solid fa-award me-2 text-primary"></i>SBD Final Approvals</h1>
    <p class="page-subtitle">Review and authorize gift requests that have passed HOD review.</p>
  </div>
  <?php if ($pending_count > 0): ?>
    <span class="badge bg-danger fs-6 py-2 px-3"><i class="fa-solid fa-bell me-2"></i><?= $pending_count ?> Awaiting Decision</span>
  <?php endif; ?>
</div>

<div class="row g-3 mb-4">
  <div class="col-md-4">
    <div class="stat-card stat-blue" onclick="document.getElementById('sbdTable').scrollIntoView({behavior:'smooth'})" title="Jump to Pending Requests"><div class="stat-icon"><i class="fa-solid fa-inbox"></i></div><div class="stat-value"><?= $pending_count ?></div><div class="stat-label">Pending Final Approval</div></div>
  </div>
</div>

<div class="card-premium">
  <div class="card-header-umpsa"><i class="fa-solid fa-badge-check me-2"></i>Requests Awaiting SBD Decision</div>
  <div class="p-3">
    <div class="table-responsive">
      <table id="sbdTable" class="table table-hover align-middle" style="width:100%">
        <thead>
          <tr><th>#ID</th><th>Requester</th><th>Dept</th><th>Gift</th><th>Qty</th><th>Event</th><th>HOD</th><th>Justification</th><th>Action</th></tr>
        </thead>
        <tbody>
          <?php foreach ($requests as $r): ?>
          <tr>
            <td><strong>#<?= $r['id'] ?></strong></td>
            <td><?= htmlspecialchars($r['requester_name']) ?></td>
            <td><span class="badge bg-secondary"><?= htmlspecialchars($r['department'] ?? 'N/A') ?></span></td>
            <td><?= htmlspecialchars($r['gift_name']) ?></td>
            <td><?= $r['quantity'] ?></td>
            <td><?= htmlspecialchars($r['event_name']) ?></td>
            <td><?= htmlspecialchars($r['hod_name'] ?? '—') ?></td>
            <td><a href="<?= SITE_URL ?>/uploads/justifications/<?= urlencode($r['justification_file']) ?>" target="_blank" class="btn btn-sm btn-umpsa-blue"><i class="fa-solid fa-file"></i></a></td>
            <td>
              <button class="btn btn-sm btn-success me-1" onclick="openAction(<?= $r['id'] ?>, 'approve', '<?= htmlspecialchars(addslashes($r['requester_name'])) ?>', '<?= htmlspecialchars(addslashes($r['gift_name'])) ?>')"><i class="fa-solid fa-check me-1"></i>Approve</button>
              <button class="btn btn-sm btn-danger" onclick="openAction(<?= $r['id'] ?>, 'reject', '<?= htmlspecialchars(addslashes($r['requester_name'])) ?>', '<?= htmlspecialchars(addslashes($r['gift_name'])) ?>')"><i class="fa-solid fa-times me-1"></i>Reject</button>
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
      <form method="POST" onsubmit="showLoading('Processing final approval...')">
        <input type="hidden" name="request_id" id="action_req_id">
        <input type="hidden" name="action" id="action_type">
        <div class="modal-body p-4">
          <p id="actionDescription" class="mb-3"></p>
          <label class="form-label">Notes / Decision Justification</label>
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
    if ($('#sbdTable').length) {
        $('#sbdTable').DataTable({
            language: {
                emptyTable: "<div class='py-3 text-muted'><i class='fa-solid fa-circle-check me-2 text-success'></i>No pending requests. All clear!</div>"
            }
        });
    }
});

function openAction(id, action, name, gift) {
    document.getElementById('action_req_id').value = id;
    document.getElementById('action_type').value = action;
    const isApprove = action === 'approve';
    document.getElementById('actionModalTitle').innerHTML = isApprove ? '<i class="fa-solid fa-circle-check me-2 text-success"></i>Final Approval' : '<i class="fa-solid fa-circle-xmark me-2 text-danger"></i>Reject Request';
    document.getElementById('actionDescription').innerHTML = isApprove
        ? `<div class="alert alert-success py-2">Approving request <strong>#${id}</strong> (${gift} for <strong>${name}</strong>) will <strong>authorize the issuance</strong> and decrement inventory stock. The requester will be notified immediately.</div>`
        : `<div class="alert alert-danger py-2">Rejecting request <strong>#${id}</strong> from <strong>${name}</strong> will cancel the request and notify the requester.</div>`;
    const btn = document.getElementById('actionSubmitBtn');
    btn.innerHTML = isApprove ? '<i class="fa-solid fa-circle-check me-1"></i> Authorize Issuance' : '<i class="fa-solid fa-circle-xmark me-1"></i> Confirm Rejection';
    btn.className = 'btn ' + (isApprove ? 'btn-success' : 'btn-danger');
    new bootstrap.Modal(document.getElementById('actionModal')).show();
}
</script>
