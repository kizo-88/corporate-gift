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
            
            logAudit('Approvals', 'HOD_APPROVE', "HOD (" . $_SESSION['name'] . ") approved Request #$req_id (" . $request['gift_name'] . " x" . $request['quantity'] . ") for requester " . $request['requester_name'] . (!empty($notes) ? ". Notes: " . $notes : ""), $req_id);

            $gift = ['name' => $request['gift_name']];
            $requester = ['name' => $request['requester_name'], 'email' => $request['requester_email'], 'department' => $request['requester_dept']];
            $hod_data = ['name' => $_SESSION['name']];
            $request['hod_notes'] = $notes;
            Mailer::sendSbdNotification($request, $requester, $gift, $hod_data);
            $_SESSION['flash'] = ['type' => 'success', 'title' => 'Approved!', 'message' => "Request #$req_id has been approved and forwarded to SBD."];
        } elseif ($action === 'reject') {
            $pdo->prepare("UPDATE requests SET status='rejected_hod', hod_id=?, hod_notes=?, hod_actioned_at=NOW() WHERE id=?")
                ->execute([$hod_id, $notes, $req_id]);
            
            logAudit('Approvals', 'HOD_REJECT', "HOD (" . $_SESSION['name'] . ") rejected Request #$req_id (" . $request['gift_name'] . ") for requester " . $request['requester_name'] . (!empty($notes) ? ". Reason: " . $notes : ""), $req_id);

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
    SELECT r.*, g.name AS gift_name, g.image_url, g.cost, u.name AS requester_name, u.email AS requester_email, u.department AS requester_dept
    FROM requests r
    JOIN gifts g ON r.gift_id = g.id
    JOIN users u ON r.user_id = u.id
    WHERE r.status = 'pending_hod' AND u.department = ?
    ORDER BY r.requested_at ASC
");
$requests_stmt->execute([$dept]);
$pending_requests = $requests_stmt->fetchAll();

$all_stmt = $pdo->prepare("
    SELECT r.*, g.name AS gift_name, g.image_url, g.cost, u.name AS requester_name, u.email AS requester_email, u.department AS requester_dept
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
      <table id="hodTable" class="table table-hover align-middle single-column-list-table" style="width:100%">
        <thead>
          <tr>
            <th class="py-2">Department Gift Requests</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($all_requests as $r): ?>
          <?php
            $s = $statusLabels[$r['status']] ?? ['label' => $r['status'], 'class' => 'status-pending-hod'];
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
                        <span>By: <strong class="text-secondary"><?= htmlspecialchars($r['requester_name']) ?></strong></span>
                        <span class="d-none d-sm-inline">&bull; <?= date('d M Y', strtotime($r['requested_at'])) ?></span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Right: Status (Visible first!) & Actions -->
                <div class="col-12 col-md-4">
                  <div class="d-flex align-items-center justify-content-between justify-content-md-end gap-2 pt-2 pt-md-0 border-top border-md-0">
                    <!-- Status ALWAYS visible before button click -->
                    <span class="status-badge <?= $s['class'] ?> m-0 py-1.5 px-3"><?= $s['label'] ?></span>

                    <div class="d-flex align-items-center gap-1">
                      <!-- 1 Main Button to see ALL information -->
                      <button class="btn btn-sm btn-umpsa-blue px-3 py-1.5 text-nowrap" onclick="viewHodDetail(<?= htmlspecialchars(json_encode($r)) ?>)" title="View Full Information">
                        <i class="fa-solid fa-eye me-1"></i><span>View Details</span>
                      </button>
                      <?php if ($r['status'] === 'pending_hod'): ?>
                        <button class="btn btn-sm btn-success py-1.5 px-2" onclick="openAction(<?= $r['id'] ?>, 'approve', '<?= htmlspecialchars(addslashes($r['requester_name'])) ?>')" title="Approve Request"><i class="fa-solid fa-check"></i></button>
                        <button class="btn btn-sm btn-danger py-1.5 px-2" onclick="openAction(<?= $r['id'] ?>, 'reject', '<?= htmlspecialchars(addslashes($r['requester_name'])) ?>')" title="Reject Request"><i class="fa-solid fa-times"></i></button>
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

<!-- Info Modal -->
<div class="modal fade" id="hodDetailModal" tabindex="-1">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header modal-header-umpsa">
        <h5 class="modal-title"><i class="fa-solid fa-circle-info me-2"></i>Department Request Details</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body p-4" id="hodDetailBody"></div>
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
            order: [],
            pageLength: 10,
            columnDefs: [
                { orderable: false, targets: '_all' }
            ],
            language: {
                emptyTable: "<div class='py-3 text-muted'><i class='fa-solid fa-folder-open me-2 text-primary'></i>No department requests found.</div>"
            }
        });
    }
});

const statusLabels = <?= json_encode($statusLabels) ?>;

function viewHodDetail(r) {
    const s = statusLabels[r.status] || { label: r.status, class: 'status-pending-hod' };
    const costText = r.cost ? 'RM ' + parseFloat(r.cost).toFixed(2) : 'N/A';
    let html = `
    <table class="table table-bordered mb-3" style="font-size:.88rem;">
      <tr><th width="35%">Request ID</th><td><strong>#${r.id}</strong></td></tr>
      <tr><th>Gift Item</th><td><strong>${r.gift_name}</strong> (${costText})</td></tr>
      <tr><th>Quantity</th><td><strong>${r.quantity} unit(s)</strong></td></tr>
      <tr><th>Requester</th><td>${r.requester_name} &lt;${r.requester_email || 'N/A'}&gt;</td></tr>
      <tr><th>Department</th><td>${r.requester_dept || 'N/A'}</td></tr>
      <tr><th>Event Name</th><td>${r.event_name || 'N/A'}</td></tr>
      <tr><th>Recipient</th><td>${r.recipient_name || 'N/A'}</td></tr>
      <tr><th>Purpose</th><td>${r.purpose || 'N/A'}</td></tr>
      <tr><th>Date Submitted</th><td>${r.requested_at}</td></tr>
      <tr><th>Justification Document</th><td><a href="<?= SITE_URL ?>/uploads/justifications/${encodeURIComponent(r.justification_file)}" target="_blank" class="btn btn-sm btn-umpsa-blue"><i class="fa-solid fa-file me-1"></i>View Uploaded File</a></td></tr>
      <tr><th>Current Status</th><td><span class="status-badge ${s.class}">${s.label}</span></td></tr>
    </table>`;

    if (r.hod_notes) {
        html += `<div class="card-premium p-3 mb-2"><strong>HOD Notes:</strong><p class="mb-0 mt-1 small text-muted">${r.hod_notes}</p></div>`;
    }
    document.getElementById('hodDetailBody').innerHTML = html;
    new bootstrap.Modal(document.getElementById('hodDetailModal')).show();
}

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
