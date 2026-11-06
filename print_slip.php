<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/includes/db.php';

$request_id = (int)($_GET['id'] ?? 0);

// Allow access if logged in OR via direct (unsigned) URL for marketing team
if (!$request_id) {
    die("Invalid request.");
}

$stmt = $pdo->prepare("
    SELECT r.*, g.name AS gift_name, g.description AS gift_description, g.category, g.cost,
           u.name AS requester_name, u.email AS requester_email, u.department,
           hu.name AS hod_name, hu.email AS hod_email,
           su.name AS sbd_name, su.email AS sbd_email
    FROM requests r
    JOIN gifts g ON r.gift_id = g.id
    JOIN users u ON r.user_id = u.id
    LEFT JOIN users hu ON r.hod_id = hu.id
    LEFT JOIN users su ON r.sbd_id = su.id
    WHERE r.id = ? AND r.status = 'approved'
");
$stmt->execute([$request_id]);
$request = $stmt->fetch();

if (!$request) {
    die("Request not found, or it has not been fully approved yet.");
}

$generated_at = date('d F Y, h:i A');
$ref_no = 'UMPSAH-CG-' . str_pad($request_id, 5, '0', STR_PAD_LEFT);
logAudit('Requests', 'PRINT_SLIP', "Generated/Viewed Gift Issuance Slip for Request #$request_id ($ref_no - " . $request['gift_name'] . ")", $request_id);
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Gift Issuance Slip — <?= $ref_no ?></title>
<!-- Favicon -->
<link rel="icon" type="image/png" href="<?= SITE_URL ?>/assets/images/favicon.png">
<link rel="shortcut icon" href="<?= SITE_URL ?>/assets/images/favicon.png">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
  body { font-family: 'Plus Jakarta Sans', Arial, sans-serif; background:#f4f7fc; color:#1e293b; margin:0; padding:20px; }
  .slip { background:#fff; max-width:800px; margin:0 auto; border-radius:12px; overflow:hidden; box-shadow:0 8px 32px rgba(0,0,0,0.08); }
  .slip-header { background:linear-gradient(135deg,#005A9C 0%,#00A3A1 100%); color:#fff; padding:28px 36px; display:flex; align-items:center; justify-content:space-between; }
  .slip-header .org { font-size:1.25rem; font-weight:800; }
  .slip-header .doc-ref { text-align:right; font-size:.85rem; opacity:.9; }
  .slip-title { background:#f8fafc; border-bottom:2px solid #e2e8f0; padding:18px 36px; text-align:center; }
  .slip-title h2 { font-size:1.1rem; font-weight:800; color:#005A9C; margin:0; letter-spacing:0.5px; text-transform:uppercase; }
  .slip-body { padding:28px 36px; }
  .info-table { width:100%; border-collapse:collapse; margin-bottom:20px; }
  .info-table th, .info-table td { padding:9px 12px; border:1px solid #e2e8f0; font-size:.875rem; }
  .info-table th { background:#f1f5f9; font-weight:700; color:#005A9C; width:35%; }
  .items-table { width:100%; border-collapse:collapse; margin:16px 0; }
  .items-table th { background:#005A9C; color:#fff; padding:10px 12px; font-size:.85rem; font-weight:700; text-align:left; }
  .items-table td { padding:10px 12px; border-bottom:1px solid #e2e8f0; font-size:.875rem; }
  .items-table tr:nth-child(even) td { background:#f8fafc; }
  .approval-section { background:#f0fdf4; border:1px solid #bbf7d0; border-radius:8px; padding:16px 20px; margin:20px 0; }
  .approval-section h4 { color:#065f46; font-size:.9rem; font-weight:800; margin-bottom:12px; }
  .approval-row { display:flex; gap:24px; }
  .approval-box { flex:1; }
  .approval-box .label { font-size:.75rem; color:#64748b; font-weight:600; text-transform:uppercase; letter-spacing:0.5px; }
  .approval-box .value { font-size:.875rem; font-weight:700; color:#1e293b; margin-top:2px; }
  .sig-section { margin-top:40px; display:flex; justify-content:space-between; gap:24px; }
  .sig-box { flex:1; }
  .sig-line { border-bottom:1.5px solid #000; margin-top:48px; margin-bottom:6px; }
  .sig-label { font-size:.75rem; color:#64748b; }
  .no-print { display:flex; gap:12px; justify-content:center; margin:24px 0; }
  @media print {
    body { background:#fff; padding:0; }
    .no-print { display:none !important; }
    .slip { box-shadow:none; border-radius:0; }
    .slip-header { -webkit-print-color-adjust:exact; print-color-adjust:exact; }
  }
  .badge-approved { background:#d1fae5; color:#065f46; padding:4px 12px; border-radius:20px; font-weight:700; font-size:.8rem; }
</style>
</head>
<body onload="window.print()">

<div class="no-print">
  <button onclick="window.print()" class="btn btn-primary px-4"><i class="fa-solid fa-print me-2"></i>Print This Slip</button>
  <button onclick="window.close()" class="btn btn-secondary px-4"><i class="fa-solid fa-xmark me-2"></i>Close</button>
</div>

<div class="slip">
  <!-- Header -->
  <div class="slip-header">
    <div>
      <div class="org"><i class="fa-solid fa-gift me-2 text-white"></i>UMPSA Holdings Sdn Bhd</div>
      <div style="font-size:.82rem;opacity:.85;margin-top:4px;">Corporate Gift Issuance & Approval Slip</div>
    </div>
    <div class="doc-ref">
      <div style="font-size:.95rem;font-weight:800;"><?= $ref_no ?></div>
      <div>Generated: <?= $generated_at ?></div>
      <div><span class="badge-approved"><i class="fa-solid fa-circle-check me-1"></i>FULLY APPROVED</span></div>
    </div>
  </div>

  <!-- Title -->
  <div class="slip-title">
    <h2>Corporate Gift Issuance & Delivery Authorization</h2>
  </div>

  <div class="slip-body">

    <!-- Request Details -->
    <h3 style="font-size:.95rem;color:#005A9C;font-weight:800;margin-bottom:12px;border-bottom:2px solid #00A3A1;padding-bottom:6px;">A. REQUEST DETAILS</h3>
    <table class="info-table">
      <tr><th>Reference No.</th><td><strong><?= $ref_no ?></strong></td></tr>
      <tr><th>Requester Name</th><td><?= htmlspecialchars($request['requester_name']) ?></td></tr>
      <tr><th>Department</th><td><?= htmlspecialchars($request['department'] ?? 'N/A') ?></td></tr>
      <tr><th>Contact Email</th><td><?= htmlspecialchars($request['requester_email']) ?></td></tr>
      <tr><th>Event Name</th><td><?= htmlspecialchars($request['event_name']) ?></td></tr>
      <tr><th>Recipient</th><td><?= htmlspecialchars($request['recipient_name']) ?></td></tr>
      <tr><th>Purpose</th><td><?= htmlspecialchars($request['purpose']) ?></td></tr>
      <tr><th>Date Submitted</th><td><?= date('d F Y, h:i A', strtotime($request['requested_at'])) ?></td></tr>
    </table>

    <!-- Gift Items -->
    <h3 style="font-size:.95rem;color:#005A9C;font-weight:800;margin:20px 0 12px;border-bottom:2px solid #00A3A1;padding-bottom:6px;">B. GIFT ITEM(S)</h3>
    <table class="items-table">
      <thead>
        <tr><th>No.</th><th>Item Name</th><th>Category</th><th>Quantity</th><th>Unit Cost (RM)</th><th>Total (RM)</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td><?= htmlspecialchars($request['gift_name']) ?></td>
          <td><?= htmlspecialchars($request['category']) ?></td>
          <td style="text-align:center;"><?= $request['quantity'] ?></td>
          <td style="text-align:right;"><?= number_format($request['cost'], 2) ?></td>
          <td style="text-align:right;font-weight:700;">RM <?= number_format($request['cost'] * $request['quantity'], 2) ?></td>
        </tr>
        <tr>
          <td colspan="5" style="text-align:right;font-weight:800;background:#f1f5f9;">TOTAL VALUE:</td>
          <td style="text-align:right;font-weight:800;background:#f1f5f9;">RM <?= number_format($request['cost'] * $request['quantity'], 2) ?></td>
        </tr>
      </tbody>
    </table>

    <!-- Justification -->
    <h3 style="font-size:.95rem;color:#005A9C;font-weight:800;margin:20px 0 12px;border-bottom:2px solid #00A3A1;padding-bottom:6px;">C. JUSTIFICATION DOCUMENT</h3>
    <table class="info-table">
      <tr><th>Uploaded File</th><td><a href="<?= SITE_URL ?>/uploads/justifications/<?= urlencode($request['justification_file']) ?>" target="_blank"><?= htmlspecialchars($request['justification_file']) ?></a></td></tr>
    </table>

    <!-- Approval Trail -->
    <h3 style="font-size:.95rem;color:#005A9C;font-weight:800;margin:20px 0 12px;border-bottom:2px solid #00A3A1;padding-bottom:6px;">D. APPROVAL TRAIL</h3>
    <div class="approval-section">
      <h4><i class="fa-solid fa-circle-check me-2 text-success"></i>Level 1 — Head of Department (HOD)</h4>
      <div class="approval-row">
        <div class="approval-box"><div class="label">Approved By</div><div class="value"><?= htmlspecialchars($request['hod_name'] ?? 'N/A') ?></div></div>
        <div class="approval-box"><div class="label">Email</div><div class="value"><?= htmlspecialchars($request['hod_email'] ?? 'N/A') ?></div></div>
        <div class="approval-box"><div class="label">Date & Time</div><div class="value"><?= $request['hod_actioned_at'] ? date('d M Y, h:i A', strtotime($request['hod_actioned_at'])) : 'N/A' ?></div></div>
      </div>
      <?php if ($request['hod_notes']): ?>
        <p style="margin-top:10px;font-size:.85rem;"><strong>Notes:</strong> <?= htmlspecialchars($request['hod_notes']) ?></p>
      <?php endif; ?>
    </div>
    <div class="approval-section" style="border-color:#a7f3d0;">
      <h4><i class="fa-solid fa-circle-check me-2 text-success"></i>Level 2 — Head of Strategic Business Development (SBD)</h4>
      <div class="approval-row">
        <div class="approval-box"><div class="label">Approved By</div><div class="value"><?= htmlspecialchars($request['sbd_name'] ?? 'N/A') ?></div></div>
        <div class="approval-box"><div class="label">Email</div><div class="value"><?= htmlspecialchars($request['sbd_email'] ?? 'N/A') ?></div></div>
        <div class="approval-box"><div class="label">Date & Time</div><div class="value"><?= $request['sbd_actioned_at'] ? date('d M Y, h:i A', strtotime($request['sbd_actioned_at'])) : 'N/A' ?></div></div>
      </div>
      <?php if ($request['sbd_notes']): ?>
        <p style="margin-top:10px;font-size:.85rem;"><strong>Notes:</strong> <?= htmlspecialchars($request['sbd_notes']) ?></p>
      <?php endif; ?>
    </div>

    <!-- Signatures -->
    <h3 style="font-size:.95rem;color:#005A9C;font-weight:800;margin:24px 0 16px;border-bottom:2px solid #00A3A1;padding-bottom:6px;">E. ISSUANCE ACKNOWLEDGEMENT</h3>
    <p style="font-size:.82rem;color:#64748b;margin-bottom:20px;">This section is to be signed upon collection of the corporate gift(s) by the requester and witnessed by the Marketing/Administration team.</p>
    <div class="sig-section">
      <div class="sig-box">
        <div class="sig-line"></div>
        <div style="font-weight:700;font-size:.875rem;"><?= htmlspecialchars($request['requester_name']) ?></div>
        <div class="sig-label">Requester — <?= htmlspecialchars($request['department'] ?? '') ?></div>
        <div class="sig-label mt-1">Date: _________________________</div>
      </div>
      <div class="sig-box">
        <div class="sig-line"></div>
        <div style="font-weight:700;font-size:.875rem;">Authorized Officer</div>
        <div class="sig-label">Marketing / Administration Team</div>
        <div class="sig-label mt-1">Date: _________________________</div>
      </div>
      <div class="sig-box">
        <div class="sig-line"></div>
        <div style="font-weight:700;font-size:.875rem;">Official Stamp</div>
        <div class="sig-label">UMPSA Holdings Sdn Bhd</div>
      </div>
    </div>

    <hr style="margin-top:32px;border-color:#e2e8f0;">
    <p style="text-align:center;font-size:.75rem;color:#94a3b8;margin:0;">
      This document is computer-generated and is valid without a handwritten signature of the approver. Generated on <?= $generated_at ?>.
    </p>
  </div>
</div>
</body>
</html>
