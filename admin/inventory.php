<?php
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../includes/db.php';

if (!isLoggedIn() || !hasRole('admin')) {
    header('Location: ' . SITE_URL . '/login.php'); exit;
}

$UPLOAD_DIR = __DIR__ . '/../uploads/gifts/';

// Add Gift
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['action'] === 'add') {
    $name        = trim($_POST['name']);
    $description = trim($_POST['description'] ?? '');
    $category    = trim($_POST['category']);
    $stock_count = (int)$_POST['stock_count'];
    $cost        = (float)$_POST['cost'];
    $image_url   = '';

    if (!empty($_FILES['image_file']['name']) && $_FILES['image_file']['error'] === UPLOAD_ERR_OK) {
        $ext  = strtolower(pathinfo($_FILES['image_file']['name'], PATHINFO_EXTENSION));
        $safe = 'gift_' . time() . '_' . rand(100, 999) . '.' . $ext;
        move_uploaded_file($_FILES['image_file']['tmp_name'], $UPLOAD_DIR . $safe);
        $image_url = $safe;
    }

    $status = $stock_count > 5 ? 'Available' : ($stock_count > 0 ? 'Low Stock' : 'Out of Stock');
    $pdo->prepare("INSERT INTO gifts (name, description, category, stock_count, cost, image_url, status) VALUES (?,?,?,?,?,?,?)")
        ->execute([$name, $description, $category, $stock_count, $cost, $image_url, $status]);
    $_SESSION['flash'] = ['type' => 'success', 'title' => 'Gift Added', 'message' => "$name has been added to the catalog."];
    header('Location: ' . SITE_URL . '/admin/inventory.php'); exit;
}

// Edit Gift
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['action'] === 'edit') {
    $id          = (int)$_POST['gift_id'];
    $name        = trim($_POST['name']);
    $description = trim($_POST['description'] ?? '');
    $category    = trim($_POST['category']);
    $stock_count = (int)$_POST['stock_count'];
    $cost        = (float)$_POST['cost'];
    $image_url   = trim($_POST['current_image'] ?? '');

    if (!empty($_FILES['image_file']['name']) && $_FILES['image_file']['error'] === UPLOAD_ERR_OK) {
        $ext  = strtolower(pathinfo($_FILES['image_file']['name'], PATHINFO_EXTENSION));
        $safe = 'gift_' . time() . '_' . rand(100, 999) . '.' . $ext;
        move_uploaded_file($_FILES['image_file']['tmp_name'], $UPLOAD_DIR . $safe);
        $image_url = $safe;
    }

    $status = $stock_count > 5 ? 'Available' : ($stock_count > 0 ? 'Low Stock' : 'Out of Stock');
    $pdo->prepare("UPDATE gifts SET name=?, description=?, category=?, stock_count=?, cost=?, image_url=?, status=? WHERE id=?")
        ->execute([$name, $description, $category, $stock_count, $cost, $image_url, $status, $id]);
    $_SESSION['flash'] = ['type' => 'success', 'title' => 'Updated', 'message' => "$name has been updated."];
    header('Location: ' . SITE_URL . '/admin/inventory.php'); exit;
}

// Delete Gift
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['action'] === 'delete') {
    $id = (int)$_POST['gift_id'];
    // Check no pending requests
    $chk = $pdo->prepare("SELECT COUNT(*) FROM requests WHERE gift_id = ? AND status IN ('pending_hod','pending_sbd')");
    $chk->execute([$id]);
    if ((int)$chk->fetchColumn() > 0) {
        $_SESSION['flash'] = ['type' => 'error', 'title' => 'Cannot Delete', 'message' => 'This gift has pending requests and cannot be deleted.'];
    } else {
        $pdo->prepare("DELETE FROM gifts WHERE id=?")->execute([$id]);
        $_SESSION['flash'] = ['type' => 'success', 'title' => 'Deleted', 'message' => 'Gift has been removed from the catalog.'];
    }
    header('Location: ' . SITE_URL . '/admin/inventory.php'); exit;
}

$gifts = $pdo->query("SELECT * FROM gifts ORDER BY created_at DESC")->fetchAll();
require_once __DIR__ . '/../includes/header.php';
?>

<div class="d-flex justify-content-between align-items-start mb-4 flex-wrap gap-3">
  <div>
    <h1 class="page-title"><i class="fa-solid fa-boxes-stacked me-2 text-primary"></i>Inventory Management</h1>
    <p class="page-subtitle">Manage the corporate gift catalog, stock levels, and item images.</p>
  </div>
  <button class="btn btn-umpsa-teal" data-bs-toggle="modal" data-bs-target="#addGiftModal"><i class="fa-solid fa-plus me-2"></i>Add New Gift</button>
</div>

<div class="card-premium">
  <div class="card-header-umpsa"><i class="fa-solid fa-boxes-stacked me-2"></i>Gift Catalog</div>
  <div class="p-3">
    <div class="table-responsive">
      <table id="inventoryTable" class="table table-hover align-middle" style="width:100%">
        <thead><tr><th>Image</th><th>Name</th><th>Category</th><th class="text-center">Stock</th><th>Cost (RM)</th><th class="text-center">Status</th><th>Actions</th></tr></thead>
        <tbody>
          <?php foreach ($gifts as $g): ?>
          <?php
            $sc = $g['status'] === 'Available' ? 'stock-available' : ($g['status'] === 'Low Stock' ? 'stock-low' : 'stock-out');
            $imgUrl = !empty($g['image_url']) && file_exists(__DIR__ . '/../uploads/gifts/' . $g['image_url'])
                      ? SITE_URL . '/uploads/gifts/' . rawurlencode($g['image_url']) : null;
          ?>
          <tr>
            <td>
              <?php if ($imgUrl): ?>
                <img src="<?= $imgUrl ?>" style="width:56px;height:44px;object-fit:cover;border-radius:6px;border:1px solid #e2e8f0;">
              <?php else: ?>
                <div style="width:56px;height:44px;border-radius:6px;background:#f1f5f9;display:flex;align-items:center;justify-content:center;color:#94a3b8;"><i class="fa-solid fa-image"></i></div>
              <?php endif; ?>
            </td>
            <td><strong><?= htmlspecialchars($g['name']) ?></strong><br><small class="text-muted"><?= htmlspecialchars(substr($g['description'] ?? '', 0, 50)) ?>...</small></td>
            <td><?= htmlspecialchars($g['category']) ?></td>
            <td class="text-center"><strong><?= $g['stock_count'] ?></strong></td>
            <td>RM <?= number_format($g['cost'], 2) ?></td>
            <td class="text-center"><span class="stock-badge <?= $sc ?>"><?= $g['status'] ?></span></td>
            <td>
              <button class="btn btn-sm btn-umpsa-blue me-1" onclick='editGift(<?= json_encode($g) ?>)'><i class="fa-solid fa-edit"></i></button>
              <form method="POST" class="d-inline" onsubmit="showLoading('Deleting...')">
                <input type="hidden" name="action" value="delete">
                <input type="hidden" name="gift_id" value="<?= $g['id'] ?>">
                <button type="submit" class="btn btn-sm btn-danger" onclick="return confirm('Delete \'<?= htmlspecialchars(addslashes($g['name'])) ?>\'?')"><i class="fa-solid fa-trash"></i></button>
              </form>
            </td>
          </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>
  </div>
</div>

<!-- Add Modal -->
<div class="modal fade" id="addGiftModal" tabindex="-1">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header modal-header-umpsa"><h5 class="modal-title"><i class="fa-solid fa-plus me-2"></i>Add New Gift</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <form method="POST" enctype="multipart/form-data" onsubmit="showLoading('Adding gift...')">
        <input type="hidden" name="action" value="add">
        <div class="modal-body p-4">
          <?php include __DIR__ . '/partials/gift_form.php'; ?>
        </div>
        <div class="modal-footer border-0">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancel</button>
          <button type="submit" class="btn btn-umpsa-teal"><i class="fa-solid fa-save me-2"></i>Save Gift</button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- Edit Modal -->
<div class="modal fade" id="editGiftModal" tabindex="-1">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header modal-header-umpsa"><h5 class="modal-title"><i class="fa-solid fa-edit me-2"></i>Edit Gift</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <form method="POST" enctype="multipart/form-data" id="editGiftForm" onsubmit="showLoading('Updating...')">
        <input type="hidden" name="action" value="edit">
        <input type="hidden" name="gift_id" id="edit_gift_id">
        <input type="hidden" name="current_image" id="edit_current_image">
        <div class="modal-body p-4">
          <div id="editFormContent"></div>
        </div>
        <div class="modal-footer border-0">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancel</button>
          <button type="submit" class="btn btn-umpsa-blue"><i class="fa-solid fa-save me-2"></i>Update Gift</button>
        </div>
      </form>
    </div>
  </div>
</div>

<?php require_once __DIR__ . '/../includes/footer.php'; ?>

<script>
$(document).ready(function() {
    if ($('#inventoryTable').length) {
        $('#inventoryTable').DataTable({ order: [[0, 'desc']] });
    }
});

function editGift(g) {
    document.getElementById('edit_gift_id').value = g.id;
    document.getElementById('edit_current_image').value = g.image_url || '';
    document.getElementById('editFormContent').innerHTML = `
        <div class="row g-3">
            <div class="col-12"><label class="form-label">Gift Name *</label><input type="text" class="form-control" name="name" value="${g.name}" required></div>
            <div class="col-md-6"><label class="form-label">Category *</label><input type="text" class="form-control" name="category" value="${g.category}" required></div>
            <div class="col-md-3"><label class="form-label">Stock Count *</label><input type="number" class="form-control" name="stock_count" value="${g.stock_count}" min="0" required></div>
            <div class="col-md-3"><label class="form-label">Cost (RM) *</label><input type="number" class="form-control" name="cost" value="${g.cost}" step="0.01" min="0" required></div>
            <div class="col-12"><label class="form-label">Description</label><textarea class="form-control" name="description" rows="2">${g.description || ''}</textarea></div>
            <div class="col-12"><label class="form-label">Replace Image (leave blank to keep current)</label><input type="file" class="form-control" name="image_file" accept="image/*"></div>
        </div>`;
    new bootstrap.Modal(document.getElementById('editGiftModal')).show();
}
</script>
