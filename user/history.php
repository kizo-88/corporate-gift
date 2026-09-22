<?php
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../includes/db.php';

if (!isLoggedIn() || !hasRole('user')) {
    header('Location: ' . SITE_URL . '/login.php'); exit;
}
$user_id = $_SESSION['user_id'];

// Handle cancel request
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'cancel') {
    $req_id = (int)$_POST['request_id'];
    $chk = $pdo->prepare("SELECT id FROM requests WHERE id = ? AND user_id = ? AND status = 'pending_hod'");
    $chk->execute([$req_id, $user_id]);
    if ($chk->fetch()) {
        $pdo->prepare("DELETE FROM requests WHERE id = ?")->execute([$req_id]);
        $_SESSION['flash'] = ['type' => 'success', 'title' => 'Cancelled', 'message' => 'Your request has been cancelled.'];
    }
    header('Location: ' . SITE_URL . '/user/history.php'); exit;
}

// Fetch user requests
$stmt = $pdo->prepare("
    SELECT r.*, g.name AS gift_name, g.image_url,
           hu.name AS hod_name, su.name AS sbd_name
    FROM requests r
    JOIN gifts g ON r.gift_id = g.id
    LEFT JOIN users hu ON r.hod_id = hu.id
    LEFT JOIN users su ON r.sbd_id = su.id
    WHERE r.user_id = ?
    ORDER BY r.requested_at DESC
");
$stmt->execute([$user_id]);
$requests = $stmt->fetchAll();

require_once __DIR__ . '/../includes/header.php';

$statusLabels = [
    'pending_hod'  => ['label' => 'Pending HOD',  'class' => 'status-pending-hod',  'icon' => 'fa-hourglass-half'],
    'pending_sbd'  => ['label' => 'Pending SBD',  'class' => 'status-pending-sbd',  'icon' => 'fa-clock'],
    'approved'     => ['label' => 'Approved',      'class' => 'status-approved',     'icon' => 'fa-circle-check'],
    'rejected_hod' => ['label' => 'Rejected by HOD', 'class' => 'status-rejected-hod', 'icon' => 'fa-circle-xmark'],
    'rejected_sbd' => ['label' => 'Rejected by SBD', 'class' => 'status-rejected-sbd', 'icon' => 'fa-circle-xmark'],
];
?>

<div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
  <div>
    <h1 class="page-title"><i class="fa-solid fa-clipboard-list me-2 text-primary"></i>My Requests</h1>
    <p class="page-subtitle">Track the status of all your corporate gift requests.</p>
  </div>
  <a href="<?= SITE_URL ?>/user/index.php" class="btn btn-umpsa-teal"><i class="fa-solid fa-arrow-left me-2"></i>Back to Catalog</a>
</div>

<div class="card-premium">
  <div class="card-header-umpsa d-flex align-items-center gap-2">
    <i class="fa-solid fa-list"></i> Request History
  </div>
  <div class="p-3">
    <div class="table-responsive">
      <table id="requestsTable" class="table table-hover align-middle" style="width:100%">
        <thead>
          <tr>
            <th>#ID</th>
            <th>Gift</th>
            <th>Qty</th>
            <th>Event Name</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($requests as $r): ?>
          <?php $s = $statusLabels[$r['status']] ?? ['label' => $r['status'], 'class' => 'status-pending-hod', 'icon' => 'fa-circle']; ?>
          <tr>
            <td><strong>#<?= $r['id'] ?></strong></td>
            <td><?= htmlspecialchars($r['gift_name']) ?></td>
            <td><?= $r['quantity'] ?></td>
            <td><?= htmlspecialchars($r['event_name']) ?></td>
            <td><?= date('d M Y', strtotime($r['requested_at'])) ?></td>
            <td><span class="status-badge <?= $s['class'] ?>"><i class="fa-solid <?= $s['icon'] ?> me-1"></i><?= $s['label'] ?></span></td>
            <td>
              <button class="btn btn-sm btn-umpsa-blue" onclick="viewDetail(<?= htmlspecialchars(json_encode($r)) ?>)"><i class="fa-solid fa-eye"></i></button>
              <?php if ($r['status'] === 'approved'): ?>
                <a href="<?= SITE_URL ?>/print_slip.php?id=<?= $r['id'] ?>" target="_blank" class="btn btn-sm btn-success ms-1" title="Print Delivery Slip"><i class="fa-solid fa-print"></i></a>
              <?php endif; ?>
              <?php if ($r['status'] === 'pending_hod'): ?>
                <form method="POST" class="d-inline ms-1" onsubmit="showLoading('Cancelling request...')">
                  <input type="hidden" name="action" value="cancel">
                  <input type="hidden" name="request_id" value="<?= $r['id'] ?>">
                  <button type="submit" class="btn btn-sm btn-outline-danger" onclick="return confirm('Cancel this request?')"><i class="fa-solid fa-trash"></i></button>
                </form>
              <?php endif; ?>
            </td>
          </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>
  </div>
</div>

<!-- Detail Modal -->
<div class="modal fade" id="detailModal" tabindex="-1">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header modal-header-umpsa">
        <h5 class="modal-title"><i class="fa-solid fa-circle-info me-2"></i>Request Details</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body p-4" id="detailBody"></div>
    </div>
  </div>
</div>

<?php require_once __DIR__ . '/../includes/footer.php'; ?>

<script>
$(document).ready(function() {
    if ($('#requestsTable').length) {
        $('#requestsTable').DataTable({ order: [[4, 'desc']], pageLength: 10 });
    }
});

const statusLabels = <?= json_encode($statusLabels) ?>;

function viewDetail(r) {
    const s = statusLabels[r.status] || { label: r.status, class: 'status-pending-hod', icon: 'fa-circle' };
    let html = `
    <table class="table table-bordered" style="font-size:.88rem;">
      <tr><th width="35%">Request ID</th><td><strong>#${r.id}</strong></td></tr>
      <tr><th>Gift</th><td>${r.gift_name}</td></tr>
      <tr><th>Quantity</th><td>${r.quantity}</td></tr>
      <tr><th>Event Name</th><td>${r.event_name}</td></tr>
      <tr><th>Recipient</th><td>${r.recipient_name}</td></tr>
      <tr><th>Purpose</th><td>${r.purpose}</td></tr>
      <tr><th>Date Submitted</th><td>${r.requested_at}</td></tr>
      <tr><th>Justification</th><td><a href="<?= SITE_URL ?>/uploads/justifications/${r.justification_file}" target="_blank" class="btn btn-sm btn-umpsa-blue"><i class="fa-solid fa-file me-1"></i>View File</a></td></tr>
      <tr><th>Status</th><td><span class="status-badge ${s.class}"><i class="fa-solid ${s.icon} me-1"></i>${s.label}</span></td></tr>
    </table>`;

    if (r.hod_name) {
        html += `<div class="card-premium p-3 mb-3"><strong><i class="fa-solid fa-stamp me-1 text-blue"></i>Level 1 — HOD Review</strong><br>
        <small class="text-muted">By: ${r.hod_name} | ${r.hod_actioned_at ? r.hod_actioned_at : 'N/A'}</small><br>
        ${r.hod_notes ? '<p class="mt-2 mb-0">' + r.hod_notes + '</p>' : '<em class="text-muted">No notes provided.</em>'}</div>`;
    }
    if (r.sbd_name) {
        html += `<div class="card-premium p-3"><strong><i class="fa-solid fa-badge-check me-1 text-teal"></i>Level 2 — SBD Review</strong><br>
        <small class="text-muted">By: ${r.sbd_name} | ${r.sbd_actioned_at ? r.sbd_actioned_at : 'N/A'}</small><br>
        ${r.sbd_notes ? '<p class="mt-2 mb-0">' + r.sbd_notes + '</p>' : '<em class="text-muted">No notes provided.</em>'}</div>`;
    }
    if (r.status === 'approved') {
        html += `<div class="text-center mt-3"><a href="<?= SITE_URL ?>/print_slip.php?id=${r.id}" target="_blank" class="btn btn-success"><i class="fa-solid fa-print me-2"></i>Print Delivery Slip</a></div>`;
    }
    document.getElementById('detailBody').innerHTML = html;
    new bootstrap.Modal(document.getElementById('detailModal')).show();
}
</script>
