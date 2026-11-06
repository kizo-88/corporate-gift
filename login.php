<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/includes/db.php';
require_once __DIR__ . '/vendor/autoload.php';

if (isLoggedIn()) {
    if (hasRole('admin')) { header('Location: ' . SITE_URL . '/admin/index.php'); exit; }
    if (hasRole('hod'))   { header('Location: ' . SITE_URL . '/hod/index.php'); exit; }
    if (hasRole('sbd'))   { header('Location: ' . SITE_URL . '/sbd/index.php'); exit; }
    header('Location: ' . SITE_URL . '/user/index.php'); exit;
}

// Dev Quick Sign In Handler (Local / Demo Testing)
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['dev_login'])) {
    $dev_email = $_POST['dev_email'] ?? '';
    if (!empty($dev_email)) {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$dev_email]);
        $user = $stmt->fetch();

        if ($user) {
            $_SESSION['user_id']    = $user['id'];
            $_SESSION['role']       = $user['role'];
            $_SESSION['name']       = $user['name'];
            $_SESSION['email']      = $user['email'];
            $_SESSION['picture']    = $user['picture'];
            $_SESSION['department'] = $user['department'];
            $_SESSION['last_activity'] = time();

            try {
                $pdo->prepare("INSERT INTO login_logs (user_id, action, ip_address, user_agent) VALUES (?, 'dev_login', ?, ?)")
                    ->execute([$user['id'], $_SERVER['REMOTE_ADDR'] ?? '', $_SERVER['HTTP_USER_AGENT'] ?? '']);
            } catch (Exception $e) {}

            logAudit('Authentication', 'DEV_LOGIN', "User signed in via Quick Login as {$user['name']} (" . strtoupper($user['role']) . ")", $user['id'], $user['id'], $user['name'], $user['role']);

            $role = $user['role'];
            if ($role === 'admin') header('Location: ' . SITE_URL . '/admin/index.php');
            elseif ($role === 'hod') header('Location: ' . SITE_URL . '/hod/index.php');
            elseif ($role === 'sbd') header('Location: ' . SITE_URL . '/sbd/index.php');
            else header('Location: ' . SITE_URL . '/user/index.php');
            exit;
        }
    }
}

$client = new Google\Client();
$client->setClientId(GOOGLE_CLIENT_ID);
$client->setClientSecret(GOOGLE_CLIENT_SECRET);
$client->setRedirectUri(GOOGLE_REDIRECT_URL);
$client->addScope('email');
$client->addScope('profile');
$client->setState('corpgift');
$loginUrl = $client->createAuthUrl();

// Fetch local seed users for Quick Login selector
$seedUsers = [];
try {
    $seedUsers = $pdo->query("SELECT * FROM users ORDER BY id ASC")->fetchAll();
} catch (Exception $e) {}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign In — UMPSA Holdings Corporate Gift System</title>
    <meta name="description" content="Sign in to the UMPSA Holdings Corporate Gift Management System using your Google account.">
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="<?= SITE_URL ?>/assets/images/favicon.png">
    <link rel="shortcut icon" href="<?= SITE_URL ?>/assets/images/favicon.png">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <link href="<?= SITE_URL ?>/assets/css/style.css" rel="stylesheet">
</head>
<body class="login-body">

<div class="auth-wrapper">
  <div class="auth-card">

    <!-- === BRAND PANEL (Left) === -->
    <div class="auth-brand">
      <div class="logo-circle">
        <img src="<?= SITE_URL ?>/assets/images/logo.png"
             alt="UMPSA Holdings Logo"
             style="width:100%;height:100%;object-fit:contain;border-radius:50%;"
             onerror="this.style.display='none';this.parentElement.innerHTML='<i class=\'fa-solid fa-building-columns\' style=\'font-size:2.8rem;color:#005A9C;\'></i>'">
      </div>
      <h1>UMPSA Holdings</h1>
      <p>Corporate Gift Management System</p>
      <div class="brand-tagline">Sustainability Through Innovation</div>
      <div class="subsidiaries">
        UMPSA Holdings Sdn Bhd<br>
        UMPSA Services Sdn Bhd<br>
        UMPSA Technology Sdn Bhd<br>
        UMPSA Consultancy Sdn Bhd<br>
        Synbion Sdn Bhd<br>
        UMP Green Technology Sdn Bhd
      </div>
    </div>

    <!-- === FORM PANEL (Right) === -->
    <div class="auth-form-wrap">
      <h2>Welcome Back</h2>
      <p class="sub">Sign in to access the Corporate Gift portal</p>

      <?php if (isset($_GET['error'])): ?>
        <div class="alert alert-danger d-flex align-items-center gap-2 py-2 mb-4" role="alert">
          <i class="fa-solid fa-circle-exclamation"></i>
          <div>Authentication failed. Please check Google OAuth settings.</div>
        </div>
      <?php endif; ?>

      <?php if (isset($_GET['timeout'])): ?>
        <div class="alert alert-warning d-flex align-items-center gap-2 py-2 mb-4" role="alert">
          <i class="fa-solid fa-clock"></i>
          <div>Your session has expired due to inactivity. Please sign in again.</div>
        </div>
      <?php endif; ?>

      <!-- Google OAuth Sign In Button -->
      <a href="<?= htmlspecialchars($loginUrl) ?>" class="btn-google mb-4" id="googleSignInBtn">
        <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google Logo">
        <span>Sign in with Google</span>
      </a>

      <!-- Local Quick Login for Development/Testing -->
      <?php if (!empty($seedUsers)): ?>
      <div class="border rounded-3 p-3 bg-light mb-4" style="font-size:0.85rem;">
        <div class="fw-bold mb-2 text-dark d-flex align-items-center gap-2">
          <i class="fa-solid fa-flask-vial text-primary"></i> Development / Local Quick Login
        </div>
        <p class="text-muted small mb-2">Select a preset role account to sign in directly without Google OAuth:</p>
        <div class="d-flex flex-wrap gap-2">
          <?php foreach ($seedUsers as $su): ?>
            <form method="POST" class="d-inline">
              <input type="hidden" name="dev_login" value="1">
              <input type="hidden" name="dev_email" value="<?= htmlspecialchars($su['email']) ?>">
              <button type="submit" class="btn btn-sm btn-outline-secondary text-start py-1 px-2" style="font-size:0.78rem;">
                <i class="fa-solid fa-user me-1"></i><strong><?= strtoupper($su['role']) ?></strong> (<?= htmlspecialchars($su['name']) ?>)
              </button>
            </form>
          <?php endforeach; ?>
        </div>
      </div>
      <?php endif; ?>

      <hr style="border-color:#e2e8f0; margin: 20px 0;">

      <!-- Google Redirect URI Config Info for Developer -->
      <div class="accordion mb-3" id="oauthHelpAccordion">
        <div class="accordion-item border-0 bg-transparent">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed py-1 px-0 bg-transparent text-muted small shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#oauthHelp">
              <i class="fa-solid fa-circle-question me-1 text-info"></i> Google OAuth Redirect URI Info
            </button>
          </h2>
          <div id="oauthHelp" class="accordion-collapse collapse" data-bs-parent="#oauthHelpAccordion">
            <div class="accordion-body p-2 bg-light rounded border small" style="font-size:0.75rem;">
              <div><strong>Your Active Redirect URI:</strong></div>
              <code class="d-block text-break my-1 select-all" style="background:#fff;padding:4px;border:1px solid #cbd5e1;border-radius:4px;"><?= htmlspecialchars(GOOGLE_REDIRECT_URL) ?></code>
              <span class="text-muted">If you see <code>redirect_uri_mismatch</code>, copy the exact URI above and paste it into <a href="https://console.cloud.google.com/apis/credentials" target="_blank">Google Cloud Console</a> &rarr; Credentials &rarr; Authorized redirect URIs.</span>
            </div>
          </div>
        </div>
      </div>

      <div style="font-size:.78rem;color:#94a3b8;line-height:1.7;text-align:center;">
        <i class="fa-solid fa-shield-check me-1" style="color:#00A3A1;"></i>
        <strong>Authorized Access Only.</strong> This system is restricted to UMPSA Holdings personnel. All login activities are monitored and recorded.
      </div>
    </div>

  </div>
</div>

<script>
  document.getElementById('googleSignInBtn').addEventListener('click', function(e) {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
      document.getElementById('loadingText').textContent = 'Redirecting to Google...';
      overlay.classList.add('active');
    }
  });
</script>
<!-- Loading overlay (minimal for login page) -->
<div id="loadingOverlay">
  <div class="loading-spinner"></div>
  <div class="loading-text" id="loadingText">Redirecting to Google...</div>
</div>
</body>
</html>
