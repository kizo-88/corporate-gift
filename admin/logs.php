<?php
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../includes/db.php';

if (!isLoggedIn() || !hasRole('admin')) {
    header('Location: ' . SITE_URL . '/login.php');
    exit;
}

// Metrics
$total_logs    = (int)$pdo->query("SELECT COUNT(*) FROM login_logs")->fetchColumn();
$logins_today  = (int)$pdo->query("SELECT COUNT(*) FROM login_logs WHERE DATE(timestamp) = CURDATE()")->fetchColumn();
$unique_users  = (int)$pdo->query("SELECT COUNT(DISTINCT user_id) FROM login_logs")->fetchColumn();

// Fetch login logs
$logs_stmt = $pdo->query("
    SELECT l.*, u.name AS user_name, u.email AS user_email, u.role AS user_role, u.picture
    FROM login_logs l
    JOIN users u ON l.user_id = u.id
    ORDER BY l.timestamp DESC
    LIMIT 500
");
$logs = $logs_stmt->fetchAll();

require_once __DIR__ . '/../includes/header.php';
?>

<div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
  <div>
    <h1 class="page-title"><i class="fa-solid fa-shield-halved me-2 text-primary"></i>System Login Logs</h1>
    <p class="page-subtitle">Monitor user authentication events, access timestamps, IP addresses, and client devices.</p>
  </div>
  <a href="<?= SITE_URL ?>/admin/index.php" class="btn btn-umpsa-teal">
    <i class="fa-solid fa-arrow-left me-2"></i>Back to Dashboard
  </a>
</div>

<!-- Stat Cards -->
<div class="row g-3 mb-4">
  <div class="col-md-4">
    <div class="stat-card stat-blue" onclick="document.getElementById('logsTable').scrollIntoView({behavior:'smooth'})" title="Jump to Login Logs">
      <div class="stat-icon"><i class="fa-solid fa-list-check"></i></div>
      <div class="stat-value"><?= $total_logs ?></div>
      <div class="stat-label">Total Login Events</div>
    </div>
  </div>
  <div class="col-md-4">
    <div class="stat-card stat-green" onclick="document.getElementById('logsTable').scrollIntoView({behavior:'smooth'})" title="Jump to Login Logs">
      <div class="stat-icon"><i class="fa-solid fa-calendar-day"></i></div>
      <div class="stat-value"><?= $logins_today ?></div>
      <div class="stat-label">Logins Today</div>
    </div>
  </div>
  <div class="col-md-4">
    <div class="stat-card stat-teal" onclick="document.getElementById('logsTable').scrollIntoView({behavior:'smooth'})" title="Jump to Login Logs">
      <div class="stat-icon"><i class="fa-solid fa-user-clock"></i></div>
      <div class="stat-value"><?= $unique_users ?></div>
      <div class="stat-label">Unique Active Users</div>
    </div>
  </div>
</div>

<div class="card-premium">
  <div class="card-header-umpsa d-flex align-items-center gap-2">
    <i class="fa-solid fa-shield-halved"></i> Authentication Audit Logs
  </div>
  <div class="p-3">
    <div class="table-responsive">
      <table id="logsTable" class="table table-hover align-middle" style="width:100%">
        <thead>
          <tr>
            <th>#ID</th>
            <th>User</th>
            <th>Role</th>
            <th>Action</th>
            <th>IP Address</th>
            <th>Browser / Device</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($logs as $log): ?>
          <tr>
            <td><strong>#<?= $log['id'] ?></strong></td>
            <td>
              <div class="d-flex align-items-center gap-2">
                <?php if (!empty($log['picture'])): ?>
                  <img src="<?= htmlspecialchars($log['picture']) ?>" alt="avatar" class="rounded-circle" style="width:30px;height:30px;object-fit:cover;">
                <?php else: ?>
                  <div class="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style="width:30px;height:30px;background:#005A9C;font-size:0.75rem;">
                    <?= strtoupper(substr($log['user_name'], 0, 1)) ?>
                  </div>
                <?php endif; ?>
                <div>
                  <strong style="font-size:0.88rem;"><?= htmlspecialchars($log['user_name']) ?></strong><br>
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
              <span class="badge bg-success-subtle text-success border border-success-subtle px-2 py-1">
                <i class="fa-solid fa-key me-1"></i><?= htmlspecialchars(ucfirst($log['action'])) ?>
              </span>
            </td>
            <td><code><?= htmlspecialchars($log['ip_address'] ?: '127.0.0.1') ?></code></td>
            <td style="max-width:250px;">
              <small class="text-muted text-truncate d-block" title="<?= htmlspecialchars($log['user_agent'] ?? '') ?>">
                <?= htmlspecialchars(substr($log['user_agent'] ?? 'Unknown Agent', 0, 60)) ?>...
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

<?php require_once __DIR__ . '/../includes/footer.php'; ?>

<script>
$(document).ready(function() {
    if ($('#logsTable').length) {
        $('#logsTable').DataTable({
            order: [[6, 'desc']],
            pageLength: 15
        });
    }
});
</script>
