<?php require_once __DIR__ . '/../config.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UMPSA Holdings — Corporate Gift Management</title>
    <meta name="description" content="UMPSA Holdings Corporate Gift Management System — Streamlined gift requests with 2-level approval workflow.">
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="<?= SITE_URL ?>/assets/images/favicon.png">
    <link rel="shortcut icon" href="<?= SITE_URL ?>/assets/images/favicon.png">
    <!-- Bootstrap 5 -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <!-- DataTables -->
    <link href="https://cdn.datatables.net/1.13.7/css/dataTables.bootstrap5.min.css" rel="stylesheet">
    <!-- SweetAlert2 -->
    <link href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css" rel="stylesheet">
    <!-- Custom CSS -->
    <link href="<?= SITE_URL ?>/assets/css/style.css" rel="stylesheet">
</head>
<body>

<!-- Loading Overlay -->
<div id="loadingOverlay">
    <div class="loading-spinner"></div>
    <div class="loading-text" id="loadingText">Processing, please wait...</div>
</div>

<?php if (isLoggedIn()): ?>
<nav class="navbar navbar-expand-lg navbar-umpsa sticky-top py-2">
  <div class="container-fluid px-4">
    <a class="navbar-brand d-flex align-items-center py-0" style="margin-right:40px!important;transition:transform 0.25s ease;" href="<?= SITE_URL ?>/">
      <img src="<?= SITE_URL ?>/assets/images/logo.png?v=5" alt="UMPSA Logo" class="header-inline-logo" style="margin-right:6px!important;height:29px!important;width:29px!important;max-height:29px!important;max-width:29px!important;object-fit:contain;border-radius:50%;background:#ffffff;padding:2px;flex-shrink:0;display:inline-block;vertical-align:middle;">
      <span class="brand-title" style="font-weight:800;font-size:20px;color:#ffffff;transition:all 0.25s ease;">CorpGift</span>
      <span class="brand-sub" style="margin-left:5px;transform:translateY(4px);display:inline-block;opacity:.75;font-weight:600;font-size:11px;color:#ffffff;letter-spacing:0.5px;transition:all 0.25s ease;">UMPSAH</span>
    </a>
    <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" style="color:#fff;">
      <i class="fa-solid fa-bars"></i>
    </button>
    <div class="collapse navbar-collapse" id="mainNav">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <?php if (hasRole('user')): ?>
          <li class="nav-item"><a class="nav-link <?= basename($_SERVER['PHP_SELF']) === 'index.php' ? 'active' : '' ?>" href="<?= SITE_URL ?>/user/index.php"><i class="fa-solid fa-grid-2 me-1"></i>Gift Catalog</a></li>
          <li class="nav-item"><a class="nav-link <?= basename($_SERVER['PHP_SELF']) === 'history.php' ? 'active' : '' ?>" href="<?= SITE_URL ?>/user/history.php"><i class="fa-solid fa-clock-rotate-left me-1"></i>My Requests</a></li>
        <?php endif; ?>
        <?php if (hasRole('hod')): ?>
          <li class="nav-item"><a class="nav-link <?= basename($_SERVER['PHP_SELF']) === 'index.php' && strpos($_SERVER['PHP_SELF'], '/hod/') !== false ? 'active' : '' ?>" href="<?= SITE_URL ?>/hod/index.php"><i class="fa-solid fa-check-circle me-1"></i>Dept. Approvals</a></li>
        <?php endif; ?>
        <?php if (hasRole('sbd')): ?>
          <li class="nav-item"><a class="nav-link <?= basename($_SERVER['PHP_SELF']) === 'index.php' && strpos($_SERVER['PHP_SELF'], '/sbd/') !== false ? 'active' : '' ?>" href="<?= SITE_URL ?>/sbd/index.php"><i class="fa-solid fa-badge-check me-1"></i>SBD Approvals</a></li>
        <?php endif; ?>
        <?php if (hasRole('admin')): ?>
          <li class="nav-item"><a class="nav-link" href="<?= SITE_URL ?>/admin/index.php"><i class="fa-solid fa-gauge-high me-1"></i>Dashboard</a></li>
          <li class="nav-item"><a class="nav-link" href="<?= SITE_URL ?>/admin/inventory.php"><i class="fa-solid fa-boxes-stacked me-1"></i>Inventory</a></li>
          <li class="nav-item"><a class="nav-link" href="<?= SITE_URL ?>/admin/users.php"><i class="fa-solid fa-users me-1"></i>Users</a></li>
          <li class="nav-item"><a class="nav-link" href="<?= SITE_URL ?>/admin/logs.php"><i class="fa-solid fa-shield-halved me-1"></i>Logs</a></li>
        <?php endif; ?>
      </ul>
      <ul class="navbar-nav ms-auto align-items-center gap-2">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle user-badge text-white" href="#" data-bs-toggle="dropdown">
            <?php if (!empty($_SESSION['picture'])): ?>
              <img src="<?= htmlspecialchars($_SESSION['picture']) ?>" alt="avatar" class="user-avatar">
            <?php else: ?>
              <div class="user-avatar d-flex align-items-center justify-content-center" style="background:rgba(255,255,255,0.2);font-weight:700;">
                <?= strtoupper(substr($_SESSION['name'] ?? 'U', 0, 1)) ?>
              </div>
            <?php endif; ?>
            <div class="d-none d-md-block">
              <div style="font-size:.85rem;font-weight:600;color:#fff;"><?= htmlspecialchars($_SESSION['name'] ?? 'User') ?></div>
              <div><span class="role-badge badge-<?= $_SESSION['role'] ?? 'user' ?>"><?= strtoupper($_SESSION['role'] ?? 'user') ?></span></div>
            </div>
          </a>
          <ul class="dropdown-menu dropdown-menu-end shadow border-0" style="border-radius:12px;min-width:180px;">
            <li><span class="dropdown-item-text text-muted" style="font-size:.78rem;"><?= htmlspecialchars($_SESSION['email'] ?? '') ?></span></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item text-danger" href="<?= SITE_URL ?>/logout.php"><i class="fa-solid fa-right-from-bracket me-2"></i>Sign Out</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
<div class="main-wrapper">
<?php else: ?>
<?php endif; ?>
