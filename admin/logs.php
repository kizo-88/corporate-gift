<?php
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../includes/db.php';

if (!isLoggedIn() || !hasRole('admin')) {
    header('Location: ' . SITE_URL . '/login.php');
    exit;
}

// Handle CSV Export
if (isset($_GET['export']) && $_GET['export'] === 'csv') {
    $filename = "UMPSAH_Corpgift_Audit_Logs_" . date('Ymd_His') . ".csv";
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename="' . $filename . '"');
    
    $output = fopen('php://output', 'w');
    // Add BOM for Excel UTF-8 compatibility
    fputs($output, "\xEF\xBB\xBF");
    fputcsv($output, ['Log ID', 'Timestamp', 'Actor Name', 'Role', 'Module', 'Action', 'Target ID', 'Description', 'IP Address', 'User Agent']);
    
    $stmt = $pdo->query("SELECT * FROM audit_logs ORDER BY created_at DESC");
    while ($row = $stmt->fetch()) {
        fputcsv($output, [
            $row['id'],
            $row['created_at'],
            $row['user_name'],
            strtoupper($row['user_role']),
            $row['module'],
            $row['action'],
            $row['target_id'] ?: '-',
            $row['description'],
            $row['ip_address'],
            $row['user_agent']
        ]);
    }
    fclose($output);
    exit;
}

// Metrics
$total_audit_events = (int)$pdo->query("SELECT COUNT(*) FROM audit_logs")->fetchColumn();
$events_today       = (int)$pdo->query("SELECT COUNT(*) FROM audit_logs WHERE DATE(created_at) = CURRENT_DATE")->fetchColumn();
$approval_events    = (int)$pdo->query("SELECT COUNT(*) FROM audit_logs WHERE module = 'Approvals'")->fetchColumn();
$total_login_logs   = (int)$pdo->query("SELECT COUNT(*) FROM login_logs")->fetchColumn();

// Fetch Module Counts for Filters
$module_counts = [];
$mc_stmt = $pdo->query("SELECT module, COUNT(*) as cnt FROM audit_logs GROUP BY module");
while ($r = $mc_stmt->fetch()) {
    $module_counts[$r['module']] = (int)$r['cnt'];
}

// Fetch System Audit Logs
$selected_module = trim($_GET['module'] ?? '');
if ($selected_module && in_array($selected_module, ['Requests', 'Approvals', 'Inventory', 'Users', 'Settings', 'Authentication'])) {
    $audit_stmt = $pdo->prepare("
        SELECT a.*, u.picture
        FROM audit_logs a
        LEFT JOIN users u ON a.user_id = u.id
        WHERE a.module = ?
        ORDER BY a.created_at DESC
        LIMIT 1000
    ");
    $audit_stmt->execute([$selected_module]);
} else {
    $audit_stmt = $pdo->query("
        SELECT a.*, u.picture
        FROM audit_logs a
        LEFT JOIN users u ON a.user_id = u.id
        ORDER BY a.created_at DESC
        LIMIT 1000
    ");
}
$audit_logs = $audit_stmt->fetchAll();

// Fetch Login Activity Logs
$login_logs_stmt = $pdo->query("
    SELECT l.*, u.name AS user_name, u.email AS user_email, u.role AS user_role, u.picture
    FROM login_logs l
    JOIN users u ON l.user_id = u.id
    ORDER BY l.timestamp DESC
    LIMIT 500
");
$login_logs = $login_logs_stmt->fetchAll();

require_once __DIR__ . '/../includes/header.php';

// Helper for module badge styling
function getModuleBadge($module) {
    switch ($module) {
        case 'Requests':
            return '<span class="badge bg-primary-subtle text-primary border border-primary-subtle px-2 py-1"><i class="fa-solid fa-gift me-1"></i>Requests</span>';
        case 'Approvals':
            return '<span class="badge bg-success-subtle text-success border border-success-subtle px-2 py-1"><i class="fa-solid fa-signature me-1"></i>Approvals</span>';
        case 'Inventory':
            return '<span class="badge bg-warning-subtle text-dark border border-warning-subtle px-2 py-1"><i class="fa-solid fa-boxes-stacked me-1"></i>Inventory</span>';
        case 'Users':
            return '<span class="badge bg-info-subtle text-dark border border-info-subtle px-2 py-1"><i class="fa-solid fa-users-gear me-1"></i>Users</span>';
        case 'Settings':
            return '<span class="badge bg-secondary-subtle text-secondary border border-secondary-subtle px-2 py-1"><i class="fa-solid fa-gear me-1"></i>Settings</span>';
        case 'Authentication':
            return '<span class="badge bg-dark-subtle text-dark border border-dark-subtle px-2 py-1"><i class="fa-solid fa-key me-1"></i>Auth</span>';
        default:
            return '<span class="badge bg-light text-dark border px-2 py-1">' . htmlspecialchars($module) . '</span>';
    }
}

// Helper for action badge styling
function getActionBadge($action) {
    if (strpos($action, 'APPROVE') !== false) {
        return '<span class="badge bg-success text-white px-2 py-1"><i class="fa-solid fa-check me-1"></i>' . htmlspecialchars($action) . '</span>';
    } elseif (strpos($action, 'REJECT') !== false || strpos($action, 'DELETE') !== false) {
        return '<span class="badge bg-danger text-white px-2 py-1"><i class="fa-solid fa-xmark me-1"></i>' . htmlspecialchars($action) . '</span>';
    } elseif (strpos($action, 'SUBMIT') !== false || strpos($action, 'CREATE') !== false) {
        return '<span class="badge bg-primary text-white px-2 py-1"><i class="fa-solid fa-plus me-1"></i>' . htmlspecialchars($action) . '</span>';
    } elseif (strpos($action, 'UPDATE') !== false) {
        return '<span class="badge bg-warning text-dark px-2 py-1"><i class="fa-solid fa-pen me-1"></i>' . htmlspecialchars($action) . '</span>';
    } elseif (strpos($action, 'PRINT') !== false) {
        return '<span class="badge bg-info text-dark px-2 py-1"><i class="fa-solid fa-print me-1"></i>' . htmlspecialchars($action) . '</span>';
    } else {
        return '<span class="badge bg-secondary text-white px-2 py-1">' . htmlspecialchars($action) . '</span>';
    }
}
?>

<div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
  <div>
    <h1 class="page-title"><i class="fa-solid fa-shield-halved me-2 text-primary"></i>Audit Logs & Security Trail</h1>
    <p class="page-subtitle">Real-time system audit logs tracking requests, two-level approvals, inventory adjustments, and security authentications.</p>
  </div>
  <div class="d-flex gap-2">
    <a href="<?= SITE_URL ?>/admin/logs.php?export=csv" class="btn btn-outline-primary bg-white shadow-sm" title="Download Audit Trail as CSV">
      <i class="fa-solid fa-file-csv me-1 text-success"></i>Export CSV
    </a>
    <a href="<?= SITE_URL ?>/admin/index.php" class="btn btn-umpsa-teal">
      <i class="fa-solid fa-arrow-left me-2"></i>Dashboard
    </a>
  </div>
</div>

<!-- Stat Cards -->
<div class="row g-3 mb-4">
  <div class="col-6 col-md-3">
    <div class="stat-card stat-blue" onclick="switchTab('audit-tab')" role="button" title="View System Audit Trail">
      <div class="stat-icon"><i class="fa-solid fa-clipboard-list"></i></div>
      <div class="stat-value"><?= number_format($total_audit_events) ?></div>
      <div class="stat-label">Total System Activities</div>
    </div>
  </div>
  <div class="col-6 col-md-3">
    <div class="stat-card stat-green" onclick="switchTab('audit-tab')" role="button" title="View Approval Events">
      <div class="stat-icon"><i class="fa-solid fa-signature"></i></div>
      <div class="stat-value"><?= number_format($approval_events) ?></div>
      <div class="stat-label">Approval Decisions</div>
    </div>
  </div>
  <div class="col-6 col-md-3">
    <div class="stat-card stat-amber" onclick="switchTab('audit-tab')" role="button" title="View Activities Today">
      <div class="stat-icon"><i class="fa-solid fa-calendar-day"></i></div>
      <div class="stat-value"><?= number_format($events_today) ?></div>
      <div class="stat-label">Activities Today</div>
    </div>
  </div>
  <div class="col-6 col-md-3">
    <div class="stat-card stat-teal" onclick="switchTab('login-tab')" role="button" title="View Login Sessions">
      <div class="stat-icon"><i class="fa-solid fa-user-shield"></i></div>
      <div class="stat-value"><?= number_format($total_login_logs) ?></div>
      <div class="stat-label">Login & Session Logs</div>
    </div>
  </div>
</div>

<!-- Navigation Tabs -->
<ul class="nav nav-pills mb-3 gap-2" id="logsTab" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active px-4 py-2 fw-semibold shadow-sm" id="audit-tab" data-bs-toggle="pill" data-bs-target="#audit-content" type="button" role="tab">
      <i class="fa-solid fa-list-check me-2"></i>System Activity Audit Trail
      <span class="badge bg-white text-primary ms-2 rounded-pill"><?= number_format($total_audit_events) ?></span>
    </button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link px-4 py-2 fw-semibold shadow-sm" id="login-tab" data-bs-toggle="pill" data-bs-target="#login-content" type="button" role="tab">
      <i class="fa-solid fa-shield-halved me-2"></i>Authentication & Login Logs
      <span class="badge bg-secondary text-white ms-2 rounded-pill"><?= number_format($total_login_logs) ?></span>
    </button>
  </li>
</ul>

<div class="tab-content" id="logsTabContent">
  
  <!-- TAB 1: SYSTEM AUDIT TRAIL -->
  <div class="tab-pane fade show active" id="audit-content" role="tabpanel">
    
    <!-- Module Filter Buttons -->
    <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3 bg-white p-3 rounded-3 shadow-sm border">
      <div class="d-flex flex-wrap align-items-center gap-2">
        <span class="text-muted small fw-bold me-2"><i class="fa-solid fa-filter me-1 text-primary"></i>Filter Module:</span>
        <a href="<?= SITE_URL ?>/admin/logs.php" class="btn btn-sm <?= empty($selected_module) ? 'btn-primary' : 'btn-outline-secondary' ?>">
          All Modules <span class="badge bg-light text-dark ms-1"><?= $total_audit_events ?></span>
        </a>
        <a href="<?= SITE_URL ?>/admin/logs.php?module=Requests" class="btn btn-sm <?= $selected_module === 'Requests' ? 'btn-primary' : 'btn-outline-secondary' ?>">
          Requests <span class="badge bg-light text-dark ms-1"><?= $module_counts['Requests'] ?? 0 ?></span>
        </a>
        <a href="<?= SITE_URL ?>/admin/logs.php?module=Approvals" class="btn btn-sm <?= $selected_module === 'Approvals' ? 'btn-primary' : 'btn-outline-secondary' ?>">
          Approvals <span class="badge bg-light text-dark ms-1"><?= $module_counts['Approvals'] ?? 0 ?></span>
        </a>
        <a href="<?= SITE_URL ?>/admin/logs.php?module=Inventory" class="btn btn-sm <?= $selected_module === 'Inventory' ? 'btn-primary' : 'btn-outline-secondary' ?>">
          Inventory <span class="badge bg-light text-dark ms-1"><?= $module_counts['Inventory'] ?? 0 ?></span>
        </a>
        <a href="<?= SITE_URL ?>/admin/logs.php?module=Users" class="btn btn-sm <?= $selected_module === 'Users' ? 'btn-primary' : 'btn-outline-secondary' ?>">
          Users <span class="badge bg-light text-dark ms-1"><?= $module_counts['Users'] ?? 0 ?></span>
        </a>
        <a href="<?= SITE_URL ?>/admin/logs.php?module=Settings" class="btn btn-sm <?= $selected_module === 'Settings' ? 'btn-primary' : 'btn-outline-secondary' ?>">
          Settings <span class="badge bg-light text-dark ms-1"><?= $module_counts['Settings'] ?? 0 ?></span>
        </a>
        <a href="<?= SITE_URL ?>/admin/logs.php?module=Authentication" class="btn btn-sm <?= $selected_module === 'Authentication' ? 'btn-primary' : 'btn-outline-secondary' ?>">
          Auth <span class="badge bg-light text-dark ms-1"><?= $module_counts['Authentication'] ?? 0 ?></span>
        </a>
      </div>
      <div class="text-muted small">
        Showing <strong><?= count($audit_logs) ?></strong> events
      </div>
    </div>

    <div class="card-premium">
      <div class="card-header-umpsa d-flex justify-content-between align-items-center">
        <span><i class="fa-solid fa-clipboard-list me-2"></i>Comprehensive Audit Trail Records</span>
        <span class="badge bg-white text-primary fw-bold px-3 py-1" style="font-size:0.75rem;">
          <i class="fa-solid fa-lock me-1"></i>Immutable Audit Trail
        </span>
      </div>
      <div class="p-3">
        <div class="table-responsive">
          <table id="auditTable" class="table table-hover align-middle" style="width:100%;font-size:0.875rem;">
            <thead>
              <tr>
                <th style="width:70px;">#ID</th>
                <th style="width:160px;">Timestamp</th>
                <th style="width:200px;">Actor</th>
                <th style="width:110px;">Module</th>
                <th style="width:150px;">Action</th>
                <th>Activity Description</th>
                <th style="width:140px;">IP / Host</th>
              </tr>
            </thead>
            <tbody>
              <?php foreach ($audit_logs as $a): ?>
              <tr>
                <td><strong>#<?= $a['id'] ?></strong></td>
                <td>
                  <span class="d-block fw-semibold text-dark"><?= date('d M Y', strtotime($a['created_at'])) ?></span>
                  <small class="text-muted"><?= date('h:i:s A', strtotime($a['created_at'])) ?></small>
                </td>
                <td>
                  <div class="d-flex align-items-center gap-2">
                    <?php if (!empty($a['picture'])): ?>
                      <img src="<?= htmlspecialchars($a['picture']) ?>" alt="avatar" class="rounded-circle" style="width:28px;height:28px;object-fit:cover;">
                    <?php else: ?>
                      <div class="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style="width:28px;height:28px;background:#005A9C;font-size:0.7rem;">
                        <?= strtoupper(substr($a['user_name'], 0, 1)) ?>
                      </div>
                    <?php endif; ?>
                    <div>
                      <div class="fw-bold text-dark" style="font-size:0.84rem;"><?= htmlspecialchars($a['user_name']) ?></div>
                      <span class="role-badge badge-<?= htmlspecialchars(strtolower($a['user_role'])) ?>" style="font-size:0.68rem;padding:2px 6px;">
                        <?= strtoupper($a['user_role']) ?>
                      </span>
                    </div>
                  </div>
                </td>
                <td><?= getModuleBadge($a['module']) ?></td>
                <td><?= getActionBadge($a['action']) ?></td>
                <td>
                  <div class="text-dark" style="line-height:1.45;">
                    <?= htmlspecialchars($a['description']) ?>
                  </div>
                  <?php if (!empty($a['target_id'])): ?>
                    <small class="text-muted"><i class="fa-solid fa-hashtag me-1"></i>Target ID: <?= (int)$a['target_id'] ?></small>
                  <?php endif; ?>
                </td>
                <td>
                  <code style="font-size:0.8rem;"><?= htmlspecialchars($a['ip_address'] ?: '127.0.0.1') ?></code>
                  <small class="text-muted d-block text-truncate" style="max-width:130px;" title="<?= htmlspecialchars($a['user_agent'] ?? '') ?>">
                    <?= htmlspecialchars(substr($a['user_agent'] ?? 'System', 0, 30)) ?>
                  </small>
                </td>
              </tr>
              <?php endforeach; ?>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- TAB 2: AUTHENTICATION & LOGIN LOGS -->
  <div class="tab-pane fade" id="login-content" role="tabpanel">
    <div class="card-premium">
      <div class="card-header-umpsa d-flex justify-content-between align-items-center">
        <span><i class="fa-solid fa-key me-2"></i>User Authentication & Session Events</span>
        <span class="badge bg-white text-primary fw-bold px-3 py-1" style="font-size:0.75rem;">
          <i class="fa-solid fa-user-shield me-1"></i>Access Security
        </span>
      </div>
      <div class="p-3">
        <div class="table-responsive">
          <table id="loginLogsTable" class="table table-hover align-middle" style="width:100%;font-size:0.875rem;">
            <thead>
              <tr>
                <th style="width:70px;">#ID</th>
                <th>User Account</th>
                <th>Role</th>
                <th>Action</th>
                <th>IP Address</th>
                <th>Browser / Device</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              <?php foreach ($login_logs as $log): ?>
              <tr>
                <td><strong>#<?= $log['id'] ?></strong></td>
                <td>
                  <div class="d-flex align-items-center gap-2">
                    <?php if (!empty($log['picture'])): ?>
                      <img src="<?= htmlspecialchars($log['picture']) ?>" alt="avatar" class="rounded-circle" style="width:28px;height:28px;object-fit:cover;">
                    <?php else: ?>
                      <div class="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style="width:28px;height:28px;background:#005A9C;font-size:0.7rem;">
                        <?= strtoupper(substr($log['user_name'], 0, 1)) ?>
                      </div>
                    <?php endif; ?>
                    <div>
                      <strong style="font-size:0.85rem;"><?= htmlspecialchars($log['user_name']) ?></strong><br>
                      <small class="text-muted" style="font-size:0.78rem;"><?= htmlspecialchars($log['user_email']) ?></small>
                    </div>
                  </div>
                </td>
                <td>
                  <span class="role-badge badge-<?= htmlspecialchars($log['user_role']) ?>">
                    <?= strtoupper($log['user_role']) ?>
                  </span>
                </td>
                <td>
                  <?php if ($log['action'] === 'logout'): ?>
                    <span class="badge bg-secondary-subtle text-secondary border px-2 py-1">
                      <i class="fa-solid fa-right-from-bracket me-1"></i>Logout
                    </span>
                  <?php else: ?>
                    <span class="badge bg-success-subtle text-success border border-success-subtle px-2 py-1">
                      <i class="fa-solid fa-key me-1"></i><?= htmlspecialchars(ucfirst($log['action'])) ?>
                    </span>
                  <?php endif; ?>
                </td>
                <td><code><?= htmlspecialchars($log['ip_address'] ?: '127.0.0.1') ?></code></td>
                <td style="max-width:220px;">
                  <small class="text-muted text-truncate d-block" title="<?= htmlspecialchars($log['user_agent'] ?? '') ?>">
                    <?= htmlspecialchars(substr($log['user_agent'] ?? 'Unknown Agent', 0, 50)) ?>...
                  </small>
                </td>
                <td><?= date('d M Y, h:i A', strtotime($log['timestamp'])) ?></td>
              </tr>
              <?php endforeach; ?>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

</div>

<?php require_once __DIR__ . '/../includes/footer.php'; ?>

<script>
function switchTab(tabId) {
    var triggerEl = document.getElementById(tabId);
    if (triggerEl) {
        var tab = new bootstrap.Tab(triggerEl);
        tab.show();
        triggerEl.scrollIntoView({behavior: 'smooth'});
    }
}

$(document).ready(function() {
    if ($('#auditTable').length) {
        $('#auditTable').DataTable({
            order: [[0, 'desc']],
            pageLength: 20,
            language: {
                search: "_INPUT_",
                searchPlaceholder: "Search audit logs..."
            }
        });
    }

    if ($('#loginLogsTable').length) {
        $('#loginLogsTable').DataTable({
            order: [[0, 'desc']],
            pageLength: 20,
            language: {
                search: "_INPUT_",
                searchPlaceholder: "Search login events..."
            }
        });
    }
});
</script>
