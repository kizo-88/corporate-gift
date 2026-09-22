<?php
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/Mailer.php';

if (!isLoggedIn() || !hasRole('user')) {
    header('Location: ' . SITE_URL . '/login.php'); exit;
}

$user_id = $_SESSION['user_id'];

// Handle gift request form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'submit_request') {
    $gift_id        = (int)$_POST['gift_id'];
    $quantity       = (int)$_POST['quantity'];
    $purpose        = trim($_POST['purpose'] ?? '');
    $recipient_name = trim($_POST['recipient_name'] ?? '');
    $event_name     = trim($_POST['event_name'] ?? '');

    $errors = [];
    if ($quantity < 1)        $errors[] = 'Quantity must be at least 1.';
    if (empty($purpose))      $errors[] = 'Purpose is required.';
    if (empty($recipient_name)) $errors[] = 'Recipient name is required.';
    if (empty($event_name))   $errors[] = 'Event name is required.';

    // Validate uploaded justification file
    $justification_file = '';
    if (!isset($_FILES['justification_file']) || $_FILES['justification_file']['error'] !== UPLOAD_ERR_OK) {
        $errors[] = 'A justification document (letter/invitation) is required.';
    } else {
        $allowed_types = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
        $file_type = mime_content_type($_FILES['justification_file']['tmp_name']);
        $file_size = $_FILES['justification_file']['size'];
        if (!in_array($file_type, $allowed_types)) {
            $errors[] = 'Invalid file type. Please upload PDF, DOC, DOCX, JPG, or PNG.';
        } elseif ($file_size > 5 * 1024 * 1024) {
            $errors[] = 'File size must not exceed 5MB.';
        }
    }

    // Check gift stock
    $gift = null;
    if (empty($errors)) {
        $gstmt = $pdo->prepare("SELECT * FROM gifts WHERE id = ? AND stock_count >= ?");
        $gstmt->execute([$gift_id, $quantity]);
        $gift = $gstmt->fetch();
        if (!$gift) $errors[] = 'Insufficient stock or invalid gift selected.';
    }

    if (empty($errors)) {
        // Save file
        $ext = pathinfo($_FILES['justification_file']['name'], PATHINFO_EXTENSION);
        $filename = 'REQ_' . time() . '_' . $user_id . '.' . strtolower($ext);
        move_uploaded_file($_FILES['justification_file']['tmp_name'], __DIR__ . '/../uploads/justifications/' . $filename);
        $justification_file = $filename;

        // Insert request
        $ins = $pdo->prepare("INSERT INTO requests (user_id, gift_id, quantity, purpose, recipient_name, event_name, justification_file, status) VALUES (?, ?, ?, ?, ?, ?, ?, 'pending_hod')");
        $ins->execute([$user_id, $gift_id, $quantity, $purpose, $recipient_name, $event_name, $justification_file]);
        $request_id = $pdo->lastInsertId();

        $request = ['id' => $request_id, 'quantity' => $quantity, 'purpose' => $purpose, 'recipient_name' => $recipient_name, 'event_name' => $event_name, 'justification_file' => $justification_file, 'requested_at' => date('Y-m-d H:i:s'), 'hod_notes' => null];
        $requester_data = ['name' => $_SESSION['name'], 'email' => $_SESSION['email'], 'department' => $_SESSION['department']];

        // Find HOD of same department
        $hod_email = null; $hod_name = null;
        if (!empty($_SESSION['department'])) {
            $hstmt = $pdo->prepare("SELECT name, email FROM users WHERE role = 'hod' AND department = ? LIMIT 1");
            $hstmt->execute([$_SESSION['department']]);
            $hod = $hstmt->fetch();
            if ($hod) { $hod_email = $hod['email']; $hod_name = $hod['name']; }
        }
        // Fallback: send to admin
        if (!$hod_email) { $hod_email = ADMIN_EMAIL; $hod_name = 'System Administrator'; }

        Mailer::sendSubmissionConfirmation($request, $requester_data, $gift);
        Mailer::sendHodNotification($request, $requester_data, $gift, $hod_email, $hod_name);

        $_SESSION['flash'] = ['type' => 'success', 'title' => 'Request Submitted!', 'message' => 'Your gift request has been submitted and is pending HOD review. Check your email for confirmation.'];
        header('Location: ' . SITE_URL . '/user/history.php'); exit;
    } else {
        $_SESSION['flash'] = ['type' => 'error', 'title' => 'Submission Failed', 'message' => implode(' ', $errors)];
        header('Location: ' . SITE_URL . '/user/index.php'); exit;
    }
}

// Fetch all available gifts
$gifts_stmt = $pdo->query("SELECT * FROM gifts ORDER BY status ASC, name ASC");
$gifts = $gifts_stmt->fetchAll();

// User metrics
$metrics = $pdo->prepare("SELECT
    COUNT(*) AS total,
    SUM(CASE WHEN status='approved' THEN 1 ELSE 0 END) AS approved,
    SUM(CASE WHEN status IN ('pending_hod','pending_sbd') THEN 1 ELSE 0 END) AS pending,
    SUM(CASE WHEN status IN ('rejected_hod','rejected_sbd') THEN 1 ELSE 0 END) AS rejected
    FROM requests WHERE user_id = ?");
$metrics->execute([$user_id]);
$stats = $metrics->fetch();

require_once __DIR__ . '/../includes/header.php';
?>

<div class="d-flex justify-content-between align-items-start mb-4 flex-wrap gap-3">
  <div>
    <h1 class="page-title"><i class="fa-solid fa-gift me-2 text-primary"></i>Gift Catalog</h1>
    <p class="page-subtitle">Welcome back, <strong><?= htmlspecialchars($_SESSION['name'] ?? '') ?></strong>! Browse and request corporate gifts below.</p>
  </div>
  <a href="<?= SITE_URL ?>/user/history.php" class="btn btn-umpsa-teal"><i class="fa-solid fa-clock-rotate-left me-2"></i>My Requests</a>
</div>

<!-- Metric Cards -->
<div class="row g-3 mb-4">
  <div class="col-6 col-md-3">
    <div class="stat-card stat-blue" onclick="location.href='<?= SITE_URL ?>/user/history.php'" title="View All Request History"><div class="stat-icon"><i class="fa-solid fa-paper-plane"></i></div><div class="stat-value"><?= $stats['total'] ?? 0 ?></div><div class="stat-label">Total Requests</div></div>
  </div>
  <div class="col-6 col-md-3">
    <div class="stat-card stat-amber" onclick="location.href='<?= SITE_URL ?>/user/history.php'" title="View Pending Requests"><div class="stat-icon"><i class="fa-solid fa-hourglass-half"></i></div><div class="stat-value"><?= $stats['pending'] ?? 0 ?></div><div class="stat-label">Pending</div></div>
  </div>
  <div class="col-6 col-md-3">
    <div class="stat-card stat-green" onclick="location.href='<?= SITE_URL ?>/user/history.php'" title="View Approved Requests"><div class="stat-icon"><i class="fa-solid fa-circle-check"></i></div><div class="stat-value"><?= $stats['approved'] ?? 0 ?></div><div class="stat-label">Approved</div></div>
  </div>
  <div class="col-6 col-md-3">
    <div class="stat-card stat-red" onclick="location.href='<?= SITE_URL ?>/user/history.php'" title="View Rejected Requests"><div class="stat-icon"><i class="fa-solid fa-circle-xmark"></i></div><div class="stat-value"><?= $stats['rejected'] ?? 0 ?></div><div class="stat-label">Rejected</div></div>
  </div>
</div>

<!-- Catalog Search Bar -->
<div class="card-premium p-3 mb-4 d-flex align-items-center gap-3">
  <i class="fa-solid fa-magnifying-glass text-teal"></i>
  <input type="text" id="catalogSearch" class="form-control border-0 shadow-none" placeholder="Search gifts by name or category..." style="font-size:.93rem;">
</div>

<!-- Gift Catalog Grid -->
<div class="gift-catalog" id="giftCatalogGrid">
  <?php foreach ($gifts as $gift): ?>
  <?php
    $stockClass = 'stock-available';
    $outOfStock = false;
    if ($gift['status'] === 'Low Stock')     { $stockClass = 'stock-low'; }
    if ($gift['status'] === 'Out of Stock')  { $stockClass = 'stock-out'; $outOfStock = true; }
    $maxQty = max(0, (int)$gift['stock_count']);
    $imgSrc = !empty($gift['image_url']) && file_exists(__DIR__ . '/../uploads/gifts/' . $gift['image_url'])
              ? SITE_URL . '/uploads/gifts/' . rawurlencode($gift['image_url'])
              : '';
    $jsonGift = htmlspecialchars(json_encode([
        'id'          => $gift['id'],
        'name'        => $gift['name'],
        'category'    => $gift['category'],
        'description' => $gift['description'] ?? '',
        'status'      => $gift['status'],
        'stock_count' => $gift['stock_count'],
        'max_qty'     => $maxQty,
        'img_src'     => $imgSrc,
        'stock_class' => $stockClass
    ]), ENT_QUOTES, 'UTF-8');
  ?>
  <div class="gift-card" data-name="<?= htmlspecialchars(strtolower($gift['name'])) ?>" data-category="<?= htmlspecialchars(strtolower($gift['category'])) ?>" style="height:100%;">
    <div class="overflow-hidden" style="height:200px;border-radius:12px 12px 0 0;cursor:pointer;" onclick="openRequestModal(<?= $jsonGift ?>)">
      <?php if ($imgSrc): ?>
        <img src="<?= $imgSrc ?>" alt="<?= htmlspecialchars($gift['name']) ?>" class="gift-card-img" style="width:100%;height:200px;object-fit:cover;">
      <?php else: ?>
        <div class="gift-card-img" style="height:200px;">
          <i class="fa-solid fa-gift"></i>
        </div>
      <?php endif; ?>
    </div>
    <div class="gift-card-body d-flex flex-column justify-content-between p-3" style="flex:1;">
      <div>
        <div class="d-flex justify-content-between align-items-start mb-2">
          <div>
            <div class="gift-card-title fw-700" style="font-size:1.02rem;cursor:pointer;" onclick="openRequestModal(<?= $jsonGift ?>)"><?= htmlspecialchars($gift['name']) ?></div>
            <div class="gift-card-category" style="font-size:.76rem;color:#0284c7;font-weight:700;text-transform:uppercase;"><?= htmlspecialchars($gift['category']) ?></div>
          </div>
          <span class="stock-badge <?= $stockClass ?>" style="margin-top:2px;"><?= htmlspecialchars($gift['status']) ?></span>
        </div>
        <div class="gift-card-stock text-muted" style="font-size:.82rem;"><i class="fa-solid fa-boxes-stacked me-1"></i><?= $gift['stock_count'] ?> in stock</div>
      </div>

      <div>
        <!-- Quantity Control -->
        <div class="qty-control mt-3">
          <button class="qty-btn qty-minus" data-id="<?= $gift['id'] ?>" <?= $outOfStock ? 'disabled' : '' ?>>−</button>
          <input type="number" class="qty-input" id="qty_<?= $gift['id'] ?>" value="1" min="1" max="<?= $maxQty ?>" <?= $outOfStock ? 'disabled' : '' ?>>
          <button class="qty-btn qty-plus" data-id="<?= $gift['id'] ?>" data-max="<?= $maxQty ?>" <?= $outOfStock ? 'disabled' : '' ?>">+</button>
        </div>

        <button class="btn-request mt-2"
                <?= $outOfStock ? 'disabled' : '' ?>
                onclick="openRequestModal(<?= $jsonGift ?>)">
          View Item &amp; Request
        </button>
      </div>
    </div>
  </div>
  <?php endforeach; ?>
  <?php if (empty($gifts)): ?>
    <div class="col-12 text-center py-5 text-muted"><i class="fa-solid fa-gift fa-3x mb-3 d-block" style="color:#e2e8f0;"></i>No corporate gifts available at this time.</div>
  <?php endif; ?>
</div>

<!-- Request Gift Modal (Enlarged Detail & Request Form) -->
<div class="modal fade" id="requestModal" tabindex="-1">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header modal-header-umpsa">
        <h5 class="modal-title"><i class="fa-solid fa-gift me-2"></i>Item Details & Request</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <form method="POST" enctype="multipart/form-data" id="requestForm">
        <input type="hidden" name="action" value="submit_request">
        <input type="hidden" name="gift_id" id="modal_gift_id">
        <div class="modal-body p-4">
          
          <!-- Enlarged Item Detail Banner -->
          <div class="card p-3 mb-4 border-0" style="background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0!important;">
            <div class="row g-3 align-items-center">
              <div class="col-md-5 text-center">
                <div id="modal_img_container" style="height:210px;border-radius:10px;overflow:hidden;background:#f1f5f9;" class="d-flex align-items-center justify-content-center shadow-sm">
                  <img id="modal_gift_img" src="" alt="Gift Image" style="width:100%;height:210px;object-fit:cover;display:none;">
                  <div id="modal_gift_icon" style="font-size:4.5rem;color:#0d9488;"><i class="fa-solid fa-gift"></i></div>
                </div>
              </div>
              <div class="col-md-7">
                <div class="d-flex align-items-center gap-2 mb-2 flex-wrap">
                  <span class="badge bg-primary px-2.5 py-1" id="modal_gift_category" style="font-size:.78rem;text-transform:uppercase;letter-spacing:0.5px;">Category</span>
                  <span class="stock-badge" id="modal_stock_badge">Status</span>
                </div>
                <h4 id="modal_gift_name" class="fw-800 text-dark mb-2" style="font-weight:800;font-size:1.3rem;">Gift Name</h4>
                <div class="p-2.5 px-3 rounded-3 mb-3" style="background:#fff;border:1px solid #e2e8f0;">
                  <div class="text-xs text-muted fw-700 uppercase mb-1" style="font-size:.72rem;letter-spacing:0.5px;color:#64748b;"><i class="fa-solid fa-circle-info me-1 text-teal"></i>DESCRIPTION</div>
                  <p id="modal_gift_desc" class="mb-0 text-secondary" style="font-size:.88rem;line-height:1.6;white-space:pre-line;">Full Description...</p>
                </div>
                <div class="small text-secondary fw-600"><i class="fa-solid fa-boxes-stacked me-1 text-teal"></i>Stock Available: <span id="modal_stock_info" class="fw-700 text-dark"></span></div>
              </div>
            </div>
          </div>

          <!-- Out of Stock Warning Banner -->
          <div id="modal_out_of_stock_alert" class="alert alert-danger d-none mb-3"><i class="fa-solid fa-triangle-exclamation me-2"></i>This item is currently out of stock and cannot be requested.</div>

          <!-- Request Form Section -->
          <h5 class="fw-700 mb-3 text-dark" style="font-size:1rem;border-bottom:2px solid #e2e8f0;padding-bottom:6px;"><i class="fa-solid fa-paper-plane me-2 text-teal"></i>Submit Request Information</h5>
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label"><i class="fa-solid fa-hashtag me-1"></i>Quantity Requested <span class="text-danger">*</span></label>
              <input type="number" class="form-control" name="quantity" id="modal_qty" min="1" required>
            </div>
            <div class="col-md-6">
              <label class="form-label"><i class="fa-solid fa-user me-1"></i>Recipient Name <span class="text-danger">*</span></label>
              <input type="text" class="form-control" name="recipient_name" placeholder="e.g. YB Dato' Ahmad Razali" required>
            </div>
            <div class="col-12">
              <label class="form-label"><i class="fa-solid fa-calendar-star me-1"></i>Event Name <span class="text-danger">*</span></label>
              <input type="text" class="form-control" name="event_name" placeholder="e.g. UMPSA Annual Dinner 2026" required>
            </div>
            <div class="col-12">
              <label class="form-label"><i class="fa-solid fa-align-left me-1"></i>Purpose / Justification <span class="text-danger">*</span></label>
              <textarea class="form-control" name="purpose" rows="3" placeholder="Briefly explain why this corporate gift is required for this event..." required></textarea>
            </div>
            <div class="col-12">
              <label class="form-label"><i class="fa-solid fa-paperclip me-1"></i>Justification Document <span class="text-danger">*</span></label>
              <div class="upload-zone" onclick="document.getElementById('justificationFileInput').click();">
                <i class="fa-solid fa-cloud-arrow-up fa-2x mb-2 text-teal"></i>
                <p class="mb-1 fw-600" style="font-weight:600;">Click to upload invitation letter or justification</p>
                <p class="text-muted" style="font-size:.8rem;">PDF, DOCX, JPG, PNG — Max 5MB</p>
                <span id="fileNameDisplay" class="text-teal" style="font-size:.83rem;font-weight:600;"></span>
              </div>
              <input type="file" id="justificationFileInput" name="justification_file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" required>
            </div>
          </div>
        </div>
        <div class="modal-footer border-0">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancel</button>
          <button type="submit" class="btn btn-umpsa-teal px-4" id="submitBtn" onclick="showLoading('Submitting request and sending notifications...')">
            <i class="fa-solid fa-paper-plane me-2"></i>Submit Request
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

<script>
// Quantity +/- buttons
document.querySelectorAll('.qty-plus').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const id = this.dataset.id, max = parseInt(this.dataset.max);
        const inp = document.getElementById('qty_' + id);
        if (parseInt(inp.value) < max) inp.value = parseInt(inp.value) + 1;
    });
});
document.querySelectorAll('.qty-minus').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const id = this.dataset.id;
        const inp = document.getElementById('qty_' + id);
        if (parseInt(inp.value) > 1) inp.value = parseInt(inp.value) - 1;
    });
});
document.querySelectorAll('.qty-input').forEach(inp => {
    inp.addEventListener('click', function(e) { e.stopPropagation(); });
});

function openRequestModal(gift) {
    document.getElementById('modal_gift_id').value = gift.id;
    document.getElementById('modal_gift_name').textContent = gift.name;
    document.getElementById('modal_gift_category').textContent = gift.category;
    document.getElementById('modal_gift_desc').textContent = gift.description || 'No detailed description available for this corporate gift.';
    document.getElementById('modal_stock_info').textContent = gift.stock_count + ' units';
    
    // Stock badge
    const badge = document.getElementById('modal_stock_badge');
    badge.textContent = gift.status;
    badge.className = 'stock-badge ' + gift.stock_class;

    // Image preview
    const imgEl = document.getElementById('modal_gift_img');
    const iconEl = document.getElementById('modal_gift_icon');
    if (gift.img_src) {
        imgEl.src = gift.img_src;
        imgEl.style.display = 'block';
        iconEl.style.display = 'none';
    } else {
        imgEl.style.display = 'none';
        iconEl.style.display = 'block';
    }

    const qtyInp = document.getElementById('qty_' + gift.id);
    const qty = qtyInp ? qtyInp.value : 1;
    document.getElementById('modal_qty').value = qty;
    document.getElementById('modal_qty').max = gift.max_qty;
    document.getElementById('fileNameDisplay').textContent = '';

    // Handle Out of Stock disable state
    const isOutOfStock = (gift.status === 'Out of Stock') || (parseInt(gift.stock_count) <= 0);
    const submitBtn = document.getElementById('submitBtn');
    const alertEl = document.getElementById('modal_out_of_stock_alert');
    const formFields = document.querySelectorAll('#requestForm input:not([type="hidden"]), #requestForm textarea');

    if (isOutOfStock) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-ban me-2"></i>Out of Stock';
        submitBtn.classList.remove('btn-umpsa-teal');
        submitBtn.classList.add('btn-secondary');
        if (alertEl) alertEl.classList.remove('d-none');
        formFields.forEach(field => field.disabled = true);
    } else {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane me-2"></i>Submit Request';
        submitBtn.classList.add('btn-umpsa-teal');
        submitBtn.classList.remove('btn-secondary');
        if (alertEl) alertEl.classList.add('d-none');
        formFields.forEach(field => field.disabled = false);
    }

    new bootstrap.Modal(document.getElementById('requestModal')).show();
}

// File name display
document.getElementById('justificationFileInput').addEventListener('change', function() {
    const fn = this.files[0] ? this.files[0].name : '';
    document.getElementById('fileNameDisplay').innerHTML = fn ? '<i class="fa-solid fa-paperclip me-1"></i>' + fn : '';
});

// Catalog search filter
document.getElementById('catalogSearch').addEventListener('input', function() {
    const q = this.value.toLowerCase().trim();
    document.querySelectorAll('.gift-card').forEach(card => {
        const match = card.dataset.name.includes(q) || card.dataset.category.includes(q);
        card.style.display = match ? '' : 'none';
    });
});
</script>

<?php require_once __DIR__ . '/../includes/footer.php'; ?>
