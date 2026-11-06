<?php
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../includes/db.php';

if (!isLoggedIn() || !hasRole('admin')) {
    header('Location: ' . SITE_URL . '/login.php'); exit;
}

// Handle Settings Update
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'update_setting') {
    $key   = trim($_POST['key_name'] ?? '');
    $value = trim($_POST['key_value'] ?? '');
    if ($key && $value) {
        if (defined('DB_DRIVER') && DB_DRIVER === 'pgsql') {
            $pdo->prepare("INSERT INTO settings (key_name, key_value) VALUES (?, ?) ON CONFLICT (key_name) DO UPDATE SET key_value = EXCLUDED.key_value")->execute([$key, $value]);
        } else {
            $pdo->prepare("INSERT INTO settings (key_name, key_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE key_value = VALUES(key_value)")->execute([$key, $value]);
        }
        logAudit('Settings', 'SETTING_UPDATE', "Admin updated system setting '$key' to '$value'");
        $_SESSION['flash'] = ['type' => 'success', 'title' => 'Settings Updated', 'message' => 'System setting has been saved successfully.'];
    }
    header('Location: ' . SITE_URL . '/admin/index.php'); exit;
}

// Metrics
$total_gifts     = (int)$pdo->query("SELECT COUNT(*) FROM gifts")->fetchColumn();
$low_stock       = (int)$pdo->query("SELECT COUNT(*) FROM gifts WHERE status = 'Low Stock'")->fetchColumn();
$out_of_stock    = (int)$pdo->query("SELECT COUNT(*) FROM gifts WHERE status = 'Out of Stock'")->fetchColumn();
$pending_hod     = (int)$pdo->query("SELECT COUNT(*) FROM requests WHERE status = 'pending_hod'")->fetchColumn();
$pending_sbd     = (int)$pdo->query("SELECT COUNT(*) FROM requests WHERE status = 'pending_sbd'")->fetchColumn();
$total_approved  = (int)$pdo->query("SELECT COUNT(*) FROM requests WHERE status = 'approved'")->fetchColumn();
$rejected_count  = (int)$pdo->query("SELECT COUNT(*) FROM requests WHERE status IN ('rejected_hod', 'rejected_sbd')")->fetchColumn();
$total_users     = (int)$pdo->query("SELECT COUNT(*) FROM users")->fetchColumn();

$pending_count   = $pending_hod + $pending_sbd;
$approved_count  = $total_approved;
$completed_count = $total_approved;

// Recent requests
$recent = $pdo->query("SELECT r.*, g.name AS gift_name, u.name AS requester_name FROM requests r JOIN gifts g ON r.gift_id = g.id JOIN users u ON r.user_id = u.id ORDER BY r.requested_at DESC LIMIT 8")->fetchAll();

// Settings
$sbd_email = getSystemSetting('sbd_email', 'sbd.head@umpsaholdings.my');

require_once __DIR__ . '/../includes/header.php';
?>

<div class="d-flex justify-content-between align-items-start mb-4 flex-wrap gap-3">
  <div>
    <h1 class="page-title"><i class="fa-solid fa-gear me-2 text-primary"></i>Admin Dashboard</h1>
    <p class="page-subtitle">System overview and configuration for the Corporate Gift Management System.</p>
  </div>
</div>

<!-- Metric Cards -->
<div class="row g-3 mb-4">
  <div class="col-6 col-md-2">
    <div class="stat-card stat-blue" onclick="location.href='<?= SITE_URL ?>/admin/inventory.php'" title="View Gift Inventory"><div class="stat-icon"><i class="fa-solid fa-gift"></i></div><div class="stat-value"><?= $total_gifts ?></div><div class="stat-label">Total Gifts</div></div>
  </div>
  <div class="col-6 col-md-2">
    <div class="stat-card stat-amber" onclick="location.href='<?= SITE_URL ?>/admin/inventory.php'" title="View Low Stock Items"><div class="stat-icon"><i class="fa-solid fa-triangle-exclamation"></i></div><div class="stat-value"><?= $low_stock ?></div><div class="stat-label">Low Stock</div></div>
  </div>
  <div class="col-6 col-md-2">
    <div class="stat-card stat-red" onclick="location.href='<?= SITE_URL ?>/admin/inventory.php'" title="View Out of Stock Items"><div class="stat-icon"><i class="fa-solid fa-box-open"></i></div><div class="stat-value"><?= $out_of_stock ?></div><div class="stat-label">Out of Stock</div></div>
  </div>
  <div class="col-6 col-md-2">
    <div class="stat-card stat-purple" onclick="document.getElementById('recentTable').scrollIntoView({behavior:'smooth'})" title="View Recent Requests"><div class="stat-icon"><i class="fa-solid fa-hourglass-half"></i></div><div class="stat-value"><?= $pending_count ?></div><div class="stat-label">Pending</div></div>
  </div>
  <div class="col-6 col-md-2">
    <div class="stat-card stat-green" onclick="document.getElementById('recentTable').scrollIntoView({behavior:'smooth'})" title="View Approved Requests"><div class="stat-icon"><i class="fa-solid fa-circle-check"></i></div><div class="stat-value"><?= $approved_count ?></div><div class="stat-label">Approved</div></div>
  </div>
  <div class="col-6 col-md-2">
    <div class="stat-card stat-teal" onclick="location.href='<?= SITE_URL ?>/admin/users.php'" title="Manage Users"><div class="stat-icon"><i class="fa-solid fa-users"></i></div><div class="stat-value"><?= $total_users ?></div><div class="stat-label">Users</div></div>
  </div>
</div>

<!-- Recent Requests (Moved to Top) -->
<div class="card-premium mb-4">
  <div class="card-header-umpsa d-flex justify-content-between align-items-center">
    <span><i class="fa-solid fa-list me-2"></i>Recent Requests</span>
    <a href="<?= SITE_URL ?>/admin/inventory.php" class="btn btn-sm btn-umpsa-teal">Manage Inventory</a>
  </div>
  <div class="p-3">
    <div class="table-responsive">
      <table id="recentTable" class="table table-hover align-middle" style="width:100%;font-size:.875rem;">
        <thead><tr><th>#</th><th>Requester</th><th>Gift</th><th>Qty</th><th>Event</th><th>Status</th><th>Date</th><th></th></tr></thead>
        <tbody>
          <?php
          $sLabels = ['pending_hod'=>['Pending HOD','status-pending-hod'],'pending_sbd'=>['Pending SBD','status-pending-sbd'],'approved'=>['Approved','status-approved'],'rejected_hod'=>['Rejected HOD','status-rejected-hod'],'rejected_sbd'=>['Rejected SBD','status-rejected-sbd']];
          foreach($recent as $r): $sl = $sLabels[$r['status']] ?? [$r['status'],'status-pending-hod']; ?>
          <tr>
            <td><strong>#<?= $r['id'] ?></strong></td>
            <td><?= htmlspecialchars($r['requester_name']) ?></td>
            <td><?= htmlspecialchars($r['gift_name']) ?></td>
            <td><?= $r['quantity'] ?></td>
            <td><?= htmlspecialchars($r['event_name']) ?></td>
            <td><span class="status-badge <?= $sl[1] ?>"><?= $sl[0] ?></span></td>
            <td><?= date('d M Y', strtotime($r['requested_at'])) ?></td>
            <td><?php if ($r['status'] === 'approved'): ?><a href="<?= SITE_URL ?>/print_slip.php?id=<?= $r['id'] ?>" target="_blank" class="btn btn-sm btn-umpsa-blue"><i class="fa-solid fa-print"></i></a><?php endif; ?></td>
          </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>
  </div>
</div>

<div class="row g-4">
  <!-- Request Overview / Executive Request Analytics Chart -->
  <div class="col-lg-8">
    <div class="card-premium h-100 d-flex flex-column" style="border: 1px solid rgba(0, 90, 156, 0.12); border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.04);">
      <div class="card-header-umpsa d-flex justify-content-between align-items-center flex-wrap gap-2 py-3 px-4 flex-shrink-0" style="background: linear-gradient(135deg, #005A9C 0%, #00A3A1 100%); color: #ffffff; border-radius: 12px 12px 0 0;">
        <div>
          <h5 class="m-0 fw-bold fs-6 d-flex align-items-center"><i class="fa-solid fa-chart-line me-2"></i>Executive Request Analytics</h5>
          <small style="opacity: 0.85; font-size: 0.78rem;">Real-time workflow performance & status distribution</small>
        </div>
        <span class="badge bg-white text-dark fw-bold px-3 py-2" style="font-size: 0.78rem; border-radius: 20px; color: #005A9C!important; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
          <i class="fa-solid fa-building me-1"></i>UMPSA Corporate Insights
        </span>
      </div>
      
      <div class="p-4 d-flex flex-column flex-grow-1">
        <!-- Corporate Metrics Ribbon -->
        <div class="row g-3 mb-4 text-center flex-shrink-0">
          <div class="col-6 col-md-3">
            <div class="p-3 rounded-3" style="background: #f8fafc; border: 1px solid #e2e8f0;">
              <div class="text-muted small fw-semibold mb-1" style="font-size:.75rem; text-transform: uppercase; letter-spacing: 0.5px;">Pending Action</div>
              <div class="fs-4 fw-bold" style="color: #d97706;"><?= $pending_count ?></div>
              <div class="progress mt-2" style="height: 4px; background: #fef3c7;">
                <div class="progress-bar" style="width: <?= round(($pending_count / max(1, $pending_count + $approved_count + $rejected_count)) * 100) ?>%; background: #d97706;"></div>
              </div>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="p-3 rounded-3" style="background: #f8fafc; border: 1px solid #e2e8f0;">
              <div class="text-muted small fw-semibold mb-1" style="font-size:.75rem; text-transform: uppercase; letter-spacing: 0.5px;">Approved</div>
              <div class="fs-4 fw-bold" style="color: #059669;"><?= $approved_count ?></div>
              <div class="progress mt-2" style="height: 4px; background: #d1fae5;">
                <div class="progress-bar" style="width: <?= round(($approved_count / max(1, $pending_count + $approved_count + $rejected_count)) * 100) ?>%; background: #059669;"></div>
              </div>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="p-3 rounded-3" style="background: #f8fafc; border: 1px solid #e2e8f0;">
              <div class="text-muted small fw-semibold mb-1" style="font-size:.75rem; text-transform: uppercase; letter-spacing: 0.5px;">Rejected</div>
              <div class="fs-4 fw-bold" style="color: #dc2626;"><?= $rejected_count ?></div>
              <div class="progress mt-2" style="height: 4px; background: #fee2e2;">
                <div class="progress-bar" style="width: <?= round(($rejected_count / max(1, $pending_count + $approved_count + $rejected_count)) * 100) ?>%; background: #dc2626;"></div>
              </div>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="p-3 rounded-3" style="background: #f8fafc; border: 1px solid #e2e8f0;">
              <div class="text-muted small fw-semibold mb-1" style="font-size:.75rem; text-transform: uppercase; letter-spacing: 0.5px;">Fulfilled</div>
              <div class="fs-4 fw-bold" style="color: #00A3A1;"><?= $completed_count ?></div>
              <div class="progress mt-2" style="height: 4px; background: #ccfbf1;">
                <div class="progress-bar" style="width: <?= round(($completed_count / max(1, $pending_count + $approved_count + $rejected_count)) * 100) ?>%; background: #00A3A1;"></div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Corporate Chart Canvas Container -->
        <div class="flex-grow-1" style="position: relative; width: 100%; min-height: 280px;">
          <canvas id="requestOverviewChart"></canvas>
        </div>
      </div>
    </div>
  </div>

  <!-- System Settings -->
  <div class="col-lg-4">
    <div class="card-premium mb-4">
      <div class="card-header-umpsa"><i class="fa-solid fa-cog me-2"></i>System Settings</div>
      <div class="p-4">
        <form method="POST" onsubmit="showLoading('Saving settings...')">
          <input type="hidden" name="action" value="update_setting">
          <input type="hidden" name="key_name" value="sbd_email">
          <label class="form-label">Head of SBD Email</label>
          <small class="text-muted d-block mb-2">Level 2 approval notifications will be sent to this email.</small>
          <div class="input-group">
            <span class="input-group-text bg-white"><i class="fa-solid fa-envelope text-teal"></i></span>
            <input type="email" class="form-control" name="key_value" value="<?= htmlspecialchars($sbd_email) ?>" required>
          </div>
          <button type="submit" class="btn btn-umpsa-blue mt-3 w-100"><i class="fa-solid fa-save me-2"></i>Save Setting</button>
        </form>
      </div>
    </div>

    <!-- Quick Links -->
    <div class="card-premium">
      <div class="card-header-umpsa"><i class="fa-solid fa-link me-2"></i>Quick Navigation</div>
      <div class="list-group list-group-flush">
        <a href="<?= SITE_URL ?>/admin/inventory.php" class="list-group-item list-group-item-action d-flex align-items-center gap-3"><i class="fa-solid fa-boxes-stacked text-blue"></i><div><strong>Inventory</strong><br><small class="text-muted">Manage gift catalog</small></div></a>
        <a href="<?= SITE_URL ?>/admin/users.php"     class="list-group-item list-group-item-action d-flex align-items-center gap-3"><i class="fa-solid fa-users text-blue"></i><div><strong>User Management</strong><br><small class="text-muted">Assign roles & departments</small></div></a>
        <a href="<?= SITE_URL ?>/admin/logs.php"      class="list-group-item list-group-item-action d-flex align-items-center gap-3"><i class="fa-solid fa-shield-halved text-blue"></i><div><strong>Audit Logs</strong><br><small class="text-muted">System activity & security trail</small></div></a>
      </div>
    </div>
  </div>
</div>

<?php require_once __DIR__ . '/../includes/footer.php'; ?>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
$(document).ready(function() {
  if ($('#recentTable').length) {
    $('#recentTable').DataTable({ paging: false, searching: false, info: false, order: [[6,'desc']] });
  }

  const canvas = document.getElementById('requestOverviewChart');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    
    // Custom Plugin to Draw Data Labels above each bar
    const corporateDataLabelsPlugin = {
      id: 'corporateDataLabels',
      afterDatasetsDraw(chart) {
        const { ctx } = chart;
        chart.data.datasets.forEach((dataset, i) => {
          const meta = chart.getDatasetMeta(i);
          meta.data.forEach((bar, index) => {
            const value = dataset.data[index];
            ctx.save();
            ctx.font = 'bold 12px "Segoe UI", Arial, sans-serif';
            ctx.fillStyle = '#1e293b';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.fillText(value, bar.x, bar.y - 6);
            ctx.restore();
          });
        });
      }
    };

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Pending', 'Approved', 'Rejected', 'Completed'],
        datasets: [{
          label: 'Requests Count',
          data: [<?= $pending_count ?>, <?= $approved_count ?>, <?= $rejected_count ?>, <?= $completed_count ?>],
          backgroundColor: [
            '#f59e0b', // Solid Amber
            '#10b981', // Solid Green
            '#ef4444', // Solid Red
            '#00a3a1'  // Solid Teal
          ],
          borderColor: [
            '#d97706',
            '#059669',
            '#dc2626',
            '#00807e'
          ],
          borderWidth: 1.5,
          borderRadius: 6,
          borderSkipped: false,
          barThickness: 46
        }]
      },
      plugins: [corporateDataLabelsPlugin],
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 25,
            bottom: 10
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0f172a',
            titleFont: { family: "'Segoe UI', sans-serif", size: 13, weight: '700' },
            bodyFont: { family: "'Segoe UI', sans-serif", size: 12 },
            padding: 12,
            cornerRadius: 8,
            displayColors: false,
            callbacks: {
              label: function(context) {
                return ' Total Requests: ' + context.parsed.y;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0,
              stepSize: 1,
              font: { family: "'Segoe UI', sans-serif", size: 11, weight: '500' },
              color: '#64748b'
            },
            grid: {
              color: 'rgba(226, 232, 240, 0.6)',
              borderDash: [4, 4]
            }
          },
          x: {
            ticks: {
              font: { family: "'Segoe UI', sans-serif", size: 12, weight: '600' },
              color: '#334155'
            },
            grid: { display: false }
          }
        }
      }
    });
  }
});
</script>

