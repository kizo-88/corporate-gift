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
    SELECT r.*, g.name AS gift_name, g.image_url, g.cost, u.name AS requester_name, u.email AS requester_email, u.department,
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
      <table id="sbdTable" class="table table-hover align-middle single-column-list-table" style="width:100%">
        <thead>
          <tr>
            <th class="py-2">Requests Awaiting SBD Decision</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($requests as $r): ?>
          <?php
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
                        <span>Dept: <strong class="text-secondary"><?= htmlspecialchars($r['department'] ?? 'N/A') ?></strong></span> &bull;
                        <span>By: <?= htmlspecialchars($r['requester_name']) ?></span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Right: Status (Visible first!) & Actions -->
                <div class="col-12 col-md-4">
                  <div class="d-flex align-items-center justify-content-between justify-content-md-end gap-2 pt-2 pt-md-0 border-top border-md-0">
                    <!-- Status ALWAYS visible before button click -->
                    <span class="status-badge status-pending-sbd m-0 py-1.5 px-3">
                      <i class="fa-solid fa-clock me-1"></i>Pending SBD
                    </span>

                    <div class="d-flex align-items-center gap-1">
                      <!-- 1 Main Button to see ALL information -->
                      <button class="btn btn-sm btn-umpsa-blue px-3 py-1.5 text-nowrap" onclick="viewSbdDetail(<?= htmlspecialchars(json_encode($r)) ?>)" title="View Full Information">
                        <i class="fa-solid fa-eye me-1"></i><span>View Details</span>
                      </button>
                      <button class="btn btn-sm btn-success py-1.5 px-2" onclick="openAction(<?= $r['id'] ?>, 'approve', '<?= htmlspecialchars(addslashes($r['requester_name'])) ?>', '<?= htmlspecialchars(addslashes($r['gift_name'])) ?>')" title="Authorize Issuance"><i class="fa-solid fa-check"></i></button>
                      <button class="btn btn-sm btn-danger py-1.5 px-2" onclick="openAction(<?= $r['id'] ?>, 'reject', '<?= htmlspecialchars(addslashes($r['requester_name'])) ?>', '<?= htmlspecialchars(addslashes($r['gift_name'])) ?>')" title="Reject Request"><i class="fa-solid fa-times"></i></button>
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
<div class="modal fade" id="sbdDetailModal" tabindex="-1">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header modal-header-umpsa">
        <h5 class="modal-title"><i class="fa-solid fa-circle-info me-2"></i>SBD Request Details</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body p-4" id="sbdDetailBody"></div>
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
            order: [],
            pageLength: 10,
            columnDefs: [
                { orderable: false, targets: '_all' }
            ],
            language: {
                emptyTable: "<div class='py-3 text-muted'><i class='fa-solid fa-circle-check me-2 text-success'></i>No pending requests. All clear!</div>"
            }
        });
    }
});

function viewSbdDetail(r) {
    const costText = r.cost ? 'RM ' + parseFloat(r.cost).toFixed(2) : 'N/A';
    let html = `
    <table class="table table-bordered mb-3" style="font-size:.88rem;">
      <tr><th width="35%">Request ID</th><td><strong>#${r.id}</strong></td></tr>
      <tr><th>Gift Item</th><td><strong>${r.gift_name}</strong> (${costText})</td></tr>
      <tr><th>Quantity</th><td><strong>${r.quantity} unit(s)</strong></td></tr>
      <tr><th>Requester</th><td>${r.requester_name} &lt;${r.requester_email || 'N/A'}&gt;</td></tr>
      <tr><th>Department</th><td><span class="badge bg-secondary">${r.department || 'N/A'}</span></td></tr>
      <tr><th>Event Name</th><td>${r.event_name || 'N/A'}</td></tr>
      <tr><th>Recipient</th><td>${r.recipient_name || 'N/A'}</td></tr>
      <tr><th>Purpose</th><td>${r.purpose || 'N/A'}</td></tr>
      <tr><th>HOD Endorsed By</th><td>${r.hod_name || 'N/A'}</td></tr>
      <tr><th>HOD Notes</th><td>${r.hod_notes || '<em class="text-muted">None</em>'}</td></tr>
      <tr><th>Date Submitted</th><td>${r.requested_at}</td></tr>
      <tr><th>Justification Document</th><td><a href="<?= SITE_URL ?>/uploads/justifications/${encodeURIComponent(r.justification_file)}" target="_blank" class="btn btn-sm btn-umpsa-blue"><i class="fa-solid fa-file me-1"></i>View Uploaded File</a></td></tr>
      <tr><th>Status</th><td><span class="status-badge status-pending-sbd"><i class="fa-solid fa-clock me-1"></i>Pending SBD</span></td></tr>
    </table>`;

    document.getElementById('sbdDetailBody').innerHTML = html;
    new bootstrap.Modal(document.getElementById('sbdDetailModal')).show();
}

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
