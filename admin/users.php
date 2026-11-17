<?php
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../includes/db.php';

if (!isLoggedIn() || !hasRole('admin')) {
    header('Location: ' . SITE_URL . '/login.php');
    exit;
}

// Handle User Role & Department Updates
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'update_user') {
    $user_id    = (int)$_POST['user_id'];
    $role       = trim($_POST['role'] ?? 'user');
    $department = trim($_POST['department'] ?? '');

    $allowed_roles = ['user', 'hod', 'sbd', 'admin'];
    if (in_array($role, $allowed_roles) && $user_id > 0) {
        $stmt = $pdo->prepare("UPDATE users SET role = ?, department = ? WHERE id = ?");
        $stmt->execute([$role, $department ?: null, $user_id]);

        $target_user = $pdo->prepare("SELECT name, email FROM users WHERE id = ?");
        $target_user->execute([$user_id]);
        $u_info = $target_user->fetch();
        $target_name = $u_info ? $u_info['name'] : "User #$user_id";

        logAudit('Users', 'USER_ROLE_UPDATE', "Admin updated user '$target_name' to Role: " . strtoupper($role) . ($department ? " | Dept: $department" : ""), $user_id);

        $_SESSION['flash'] = [
            'type' => 'success',
            'title' => 'User Updated',
            'message' => 'User role and department have been updated successfully.'
        ];
    } else {
        $_SESSION['flash'] = [
            'type' => 'error',
            'title' => 'Update Failed',
            'message' => 'Invalid role or user ID.'
        ];
    }
    header('Location: ' . SITE_URL . '/admin/users.php');
    exit;
}

// Fetch user statistics
$total_users = (int)$pdo->query("SELECT COUNT(*) FROM users")->fetchColumn();
$user_count  = (int)$pdo->query("SELECT COUNT(*) FROM users WHERE role = 'user'")->fetchColumn();
$hod_count   = (int)$pdo->query("SELECT COUNT(*) FROM users WHERE role = 'hod'")->fetchColumn();
$sbd_count   = (int)$pdo->query("SELECT COUNT(*) FROM users WHERE role = 'sbd'")->fetchColumn();
$admin_count = (int)$pdo->query("SELECT COUNT(*) FROM users WHERE role = 'admin'")->fetchColumn();

// Fetch all users
$users_stmt = $pdo->query("SELECT * FROM users ORDER BY created_at DESC");
$users = $users_stmt->fetchAll();

require_once __DIR__ . '/../includes/header.php';
?>

<div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
  <div>
    <h1 class="page-title"><i class="fa-solid fa-users me-2 text-primary"></i>User Management</h1>
    <p class="page-subtitle">View system users, assign role access levels, and set department affiliations.</p>
  </div>
  <a href="<?= SITE_URL ?>/admin/index.php" class="btn btn-secondary">
    <i class="fa-solid fa-arrow-left me-1"></i>Back to Dashboard
  </a>
</div>

<!-- Stat Cards -->
<div class="row g-3 mb-4">
  <div class="col-6 col-md-3">
    <div class="stat-card stat-blue" onclick="filterUserRole('')" title="Show All Users">
      <div class="stat-icon"><i class="fa-solid fa-users"></i></div>
      <div class="stat-value"><?= $total_users ?></div>
      <div class="stat-label">Total Users</div>
    </div>
  </div>
  <div class="col-6 col-md-3">
    <div class="stat-card stat-teal" onclick="filterUserRole('USER')" title="Filter Requesters">
      <div class="stat-icon"><i class="fa-solid fa-user-check"></i></div>
      <div class="stat-value"><?= $user_count ?></div>
      <div class="stat-label">Requesters</div>
    </div>
  </div>
  <div class="col-6 col-md-3">
    <div class="stat-card stat-amber" onclick="filterUserRole('HOD')" title="Filter HOD Approvers">
      <div class="stat-icon"><i class="fa-solid fa-user-tie"></i></div>
      <div class="stat-value"><?= $hod_count ?></div>
      <div class="stat-label">HOD Approvers</div>
    </div>
  </div>
  <div class="col-6 col-md-3">
    <div class="stat-card stat-purple" onclick="filterUserRole('SBD|ADMIN')" title="Filter SBD & Admins">
      <div class="stat-icon"><i class="fa-solid fa-user-shield"></i></div>
      <div class="stat-value"><?= $sbd_count + $admin_count ?></div>
      <div class="stat-label">SBD & Admins</div>
    </div>
  </div>
</div>

<div class="card-premium">
  <div class="card-header-umpsa d-flex align-items-center gap-2">
    <i class="fa-solid fa-id-card"></i> Registered Users Directory
  </div>
  <div class="p-3">
    <div class="table-responsive">
      <table id="usersTable" class="table table-hover align-middle single-column-list-table" style="width:100%">
        <thead>
          <tr>
            <th class="py-2">User Profiles Directory</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($users as $u): ?>
          <tr>
            <td class="p-3">
              <div class="row g-2 align-items-center">
                <!-- Left: Avatar & Info -->
                <div class="col-12 col-md-8">
                  <div class="d-flex align-items-center gap-3">
                    <?php if (!empty($u['picture'])): ?>
                      <img src="<?= htmlspecialchars($u['picture']) ?>" alt="avatar" class="rounded-circle border flex-shrink-0" style="width:50px;height:50px;object-fit:cover;">
                    <?php else: ?>
                      <div class="rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center text-white fw-bold shadow-sm" style="width:50px;height:50px;background:linear-gradient(135deg, #005A9C 0%, #00A3A1 100%);font-size:1.3rem;">
                        <?= strtoupper(substr($u['name'], 0, 1)) ?>
                      </div>
                    <?php endif; ?>
                    
                    <div class="overflow-hidden">
                      <h6 class="mb-1 fw-bold text-dark text-truncate" style="font-size:1rem;"><?= htmlspecialchars($u['name']) ?></h6>
                      <div class="d-flex flex-wrap align-items-center gap-2 small text-muted">
                        <span><i class="fa-regular fa-envelope me-1"></i><?= htmlspecialchars($u['email']) ?></span>
                        <?php if (!empty($u['department'])): ?>
                          &bull; <span class="badge bg-light text-dark border"><?= htmlspecialchars($u['department']) ?></span>
                        <?php endif; ?>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Right: Role Status (Visible first!) & Actions -->
                <div class="col-12 col-md-4">
                  <div class="d-flex align-items-center justify-content-between justify-content-md-end gap-2 pt-2 pt-md-0 border-top border-md-0">
                    <!-- Role ALWAYS visible before button click -->
                    <span class="role-badge badge-<?= htmlspecialchars($u['role']) ?> m-0 py-1.5 px-3">
                      <?= strtoupper($u['role']) ?>
                    </span>

                    <div class="d-flex align-items-center gap-1">
                      <!-- 1 Main Button to see ALL information -->
                      <button class="btn btn-sm btn-umpsa-blue px-3 py-1.5 text-nowrap" onclick="viewUserDetail(<?= htmlspecialchars(json_encode($u)) ?>)" title="View Information">
                        <i class="fa-solid fa-eye me-1"></i><span>View Details</span>
                      </button>
                      <button class="btn btn-sm btn-outline-primary py-1.5 px-2" onclick="openEditUser(<?= htmlspecialchars(json_encode($u)) ?>)" title="Edit User">
                        <i class="fa-solid fa-user-pen"></i>
                      </button>
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

<!-- View User Detail Modal -->
<div class="modal fade" id="userDetailModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header modal-header-umpsa">
        <h5 class="modal-title"><i class="fa-solid fa-circle-info me-2"></i>User Profile Information</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body p-4" id="userDetailBody"></div>
    </div>
  </div>
</div>

<!-- Edit User Modal -->
<div class="modal fade" id="editUserModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header modal-header-umpsa">
        <h5 class="modal-title"><i class="fa-solid fa-user-pen me-2"></i>Edit User Role & Department</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <form method="POST" onsubmit="showLoading('Updating user details...')">
        <input type="hidden" name="action" value="update_user">
        <input type="hidden" name="user_id" id="edit_user_id">
        <div class="modal-body p-4">
          <div class="mb-3">
            <label class="form-label fw-bold">Full Name</label>
            <input type="text" class="form-control bg-light" id="edit_user_name" readonly>
          </div>
          <div class="mb-3">
            <label class="form-label fw-bold">Email Address</label>
            <input type="email" class="form-control bg-light" id="edit_user_email" readonly>
          </div>
          <div class="mb-3">
            <label class="form-label fw-bold">System Role <span class="text-danger">*</span></label>
            <select class="form-select" name="role" id="edit_user_role" required>
              <option value="user">User / Requester (Staff)</option>
              <option value="hod">Head of Department (HOD - Level 1 Approval)</option>
              <option value="sbd">Head of SBD (Level 2 Approval)</option>
              <option value="admin">System Administrator</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label fw-bold">Department</label>
            <input type="text" class="form-control" name="department" id="edit_user_department" placeholder="e.g. IT, Finance, Marketing, HR">
            <small class="text-muted">Required for HODs and Users to align Level 1 approval routing.</small>
          </div>
        </div>
        <div class="modal-footer border-0">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancel</button>
          <button type="submit" class="btn btn-umpsa-teal">
            <i class="fa-solid fa-save me-2"></i>Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

<?php require_once __DIR__ . '/../includes/footer.php'; ?>

<script>
$(document).ready(function() {
    if ($('#usersTable').length) {
        $('#usersTable').DataTable({
            order: [],
            pageLength: 10,
            columnDefs: [
                { orderable: false, targets: '_all' }
            ]
        });
    }
});

function viewUserDetail(u) {
    let pic = u.picture 
        ? `<div class="text-center mb-3"><img src="${u.picture}" class="rounded-circle border shadow-sm" style="width:72px;height:72px;object-fit:cover;"></div>` 
        : `<div class="text-center mb-3"><div class="rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold shadow-sm" style="width:72px;height:72px;background:linear-gradient(135deg, #005A9C 0%, #00A3A1 100%);font-size:1.8rem;">${(u.name || 'U').charAt(0).toUpperCase()}</div></div>`;
    
    let html = `
    ${pic}
    <table class="table table-bordered mb-0" style="font-size:.88rem;">
      <tr><th width="35%">User ID</th><td>#${u.id}</td></tr>
      <tr><th>Full Name</th><td><strong>${u.name}</strong></td></tr>
      <tr><th>Email Address</th><td>${u.email}</td></tr>
      <tr><th>System Role</th><td><span class="role-badge badge-${u.role}">${u.role.toUpperCase()}</span></td></tr>
      <tr><th>Department</th><td>${u.department ? `<span class="badge bg-light text-dark border">${u.department}</span>` : '<em class="text-muted">Not assigned</em>'}</td></tr>
      <tr><th>Registered Date</th><td>${u.created_at || 'N/A'}</td></tr>
    </table>`;
    
    document.getElementById('userDetailBody').innerHTML = html;
    new bootstrap.Modal(document.getElementById('userDetailModal')).show();
}

function openEditUser(u) {
    document.getElementById('edit_user_id').value = u.id;
    document.getElementById('edit_user_name').value = u.name;
    document.getElementById('edit_user_email').value = u.email;
    document.getElementById('edit_user_role').value = u.role;
    document.getElementById('edit_user_department').value = u.department || '';
    new bootstrap.Modal(document.getElementById('editUserModal')).show();
}

function filterUserRole(rolePattern) {
    const table = $('#usersTable').DataTable();
    table.column(2).search(rolePattern, true, false).draw();
    document.getElementById('usersTable').scrollIntoView({ behavior: 'smooth' });
}
</script>
