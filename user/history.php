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
    SELECT r.*, g.name AS gift_name, g.image_url, g.cost,
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
      <table id="requestsTable" class="table table-hover align-middle single-column-list-table" style="width:100%">
        <thead>
          <tr>
            <th class="py-2">Corporate Gift Requests</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($requests as $r): ?>
          <?php
            $s = $statusLabels[$r['status']] ?? ['label' => $r['status'], 'class' => 'status-pending-hod', 'icon' => 'fa-circle'];
            $imgUrl = !empty($r['image_url']) && file_exists(__DIR__ . '/../uploads/gifts/' . $r['image_url'])
                      ? SITE_URL . '/uploads/gifts/' . rawurlencode($r['image_url']) : null;
          ?>
          <tr>
            <td class="p-3">
              <div class="row g-2 align-items-center">
                <!-- Left: Thumbnail & Info -->
                <div class="col-12 col-md-8">
                  <div class="d-flex align-items-center gap-3">
                    <?php if ($imgUrl): ?>
                      <img src="<?= $imgUrl ?>" alt="<?= htmlspecialchars($r['gift_name']) ?>" class="rounded-3 border flex-shrink-0" style="width:58px;height:58px;object-fit:cover;">
                    <?php else: ?>
                      <div class="rounded-3 border flex-shrink-0 bg-light d-flex align-items-center justify-content-center text-primary" style="width:58px;height:58px;font-size:1.5rem;">
                        <i class="fa-solid fa-gift"></i>
                      </div>
                    <?php endif; ?>
                    
                    <div class="overflow-hidden">
                      <div class="d-flex align-items-center gap-2 flex-wrap mb-1">
                        <span class="badge bg-light text-primary border">#<?= $r['id'] ?></span>
                        <h6 class="mb-0 fw-bold text-dark text-truncate" style="font-size:1rem;"><?= htmlspecialchars($r['gift_name']) ?></h6>
                      </div>
                      <div class="d-flex flex-wrap align-items-center gap-2 small text-muted">
                        <?php if (isset($r['cost']) && $r['cost'] > 0): ?>
                          <span class="fw-bold text-dark">RM <?= number_format($r['cost'], 2) ?></span> &bull;
                        <?php endif; ?>
                        <span>Qty: <strong><?= $r['quantity'] ?></strong></span> &bull;
                        <span><?= date('d M Y', strtotime($r['requested_at'])) ?></span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Right: Status (Visible first!) & Action Button -->
                <div class="col-12 col-md-4">
                  <div class="d-flex align-items-center justify-content-between justify-content-md-end gap-2 pt-2 pt-md-0 border-top border-md-0">
                    <!-- Status ALWAYS visible before button click -->
                    <span class="status-badge <?= $s['class'] ?> m-0 py-1.5 px-3">
                      <i class="fa-solid <?= $s['icon'] ?> me-1"></i><?= $s['label'] ?>
                    </span>

                    <div class="d-flex align-items-center gap-1">
                      <!-- 1 Main Button to see ALL information -->
                      <button class="btn btn-sm btn-umpsa-blue px-3 py-1.5 text-nowrap" onclick="viewDetail(<?= htmlspecialchars(json_encode($r)) ?>)" title="View All Information">
                        <i class="fa-solid fa-eye me-1"></i><span>View Details</span>
                      </button>
                      
                      <?php if ($r['status'] === 'approved'): ?>
                        <a href="<?= SITE_URL ?>/print_slip.php?id=<?= $r['id'] ?>" target="_blank" class="btn btn-sm btn-success py-1.5 px-2" title="Print Delivery Slip"><i class="fa-solid fa-print"></i></a>
                      <?php endif; ?>
                      
                      <?php if ($r['status'] === 'pending_hod'): ?>
                        <form method="POST" class="d-inline" onsubmit="showLoading('Cancelling request...')">
                          <input type="hidden" name="action" value="cancel">
                          <input type="hidden" name="request_id" value="<?= $r['id'] ?>">
                          <button type="submit" class="btn btn-sm btn-outline-danger py-1.5 px-2" onclick="return confirm('Cancel this request?')" title="Cancel Request"><i class="fa-solid fa-trash"></i></button>
                        </form>
                      <?php endif; ?>
                    </div>
                  </div>
                </div>
              </div>
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
        $('#requestsTable').DataTable({
            order: [],
            pageLength: 10,
            columnDefs: [
                { orderable: false, targets: '_all' }
            ]
        });
    }
});

const statusLabels = <?= json_encode($statusLabels) ?>;

function viewDetail(r) {
    const s = statusLabels[r.status] || { label: r.status, class: 'status-pending-hod', icon: 'fa-circle' };
    const costText = r.cost ? 'RM ' + parseFloat(r.cost).toFixed(2) : 'N/A';
    let html = `
    <div class="table-responsive">
      <table class="table table-bordered mb-0" style="font-size:.88rem; width:100%;">
        <tr><th class="bg-light" style="width:35%;">Request ID</th><td><strong class="text-primary">#${r.id}</strong></td></tr>
        <tr><th class="bg-light">Gift Item</th><td><strong>${r.gift_name}</strong> (${costText})</td></tr>
        <tr><th class="bg-light">Quantity</th><td><strong>${r.quantity} unit(s)</strong></td></tr>
        <tr><th class="bg-light">Event Name</th><td>${r.event_name || 'N/A'}</td></tr>
        <tr><th class="bg-light">Recipient Name</th><td>${r.recipient_name || 'N/A'}</td></tr>
        <tr><th class="bg-light">Purpose</th><td>${r.purpose || 'N/A'}</td></tr>
        <tr><th class="bg-light">Date Submitted</th><td>${r.requested_at}</td></tr>
        <tr><th class="bg-light">Justification File</th><td><a href="<?= SITE_URL ?>/uploads/justifications/${encodeURIComponent(r.justification_file)}" target="_blank" class="btn btn-sm btn-umpsa-blue"><i class="fa-solid fa-file me-1"></i>View Uploaded Document</a></td></tr>
        <tr><th class="bg-light">Current Status</th><td><span class="status-badge ${s.class}"><i class="fa-solid ${s.icon} me-1"></i>${s.label}</span></td></tr>
      </table>
    </div>`;

    if (r.hod_name) {
        html += `<div class="card-premium p-3 mt-3"><strong><i class="fa-solid fa-stamp me-1 text-primary"></i>Level 1 — HOD Review</strong><br>
        <small class="text-muted">By: ${r.hod_name} | ${r.hod_actioned_at ? r.hod_actioned_at : 'N/A'}</small><br>
        ${r.hod_notes ? '<p class="mt-2 mb-0">' + r.hod_notes + '</p>' : '<em class="text-muted">No notes provided.</em>'}</div>`;
    }
    if (r.sbd_name) {
        html += `<div class="card-premium p-3 mt-3"><strong><i class="fa-solid fa-badge-check me-1 text-teal"></i>Level 2 — SBD Review</strong><br>
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
