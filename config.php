<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Dynamically determine SITE_URL to support various ports and encodings
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || ($_SERVER['SERVER_PORT'] ?? 80) == 443) ? "https://" : "http://";
$host = $_SERVER['HTTP_HOST'] ?? 'localhost';
define('SITE_URL', $protocol . $host . '/UMPSAH%20Corpgift');

// Database Configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'umpsa_corpgift');

// Google OAuth 2.0 Configuration
define('GOOGLE_CLIENT_ID', getenv('GOOGLE_CLIENT_ID') ?: 'YOUR_GOOGLE_CLIENT_ID');
define('GOOGLE_CLIENT_SECRET', getenv('GOOGLE_CLIENT_SECRET') ?: 'YOUR_GOOGLE_CLIENT_SECRET');
// Must match the URI registered in Google Cloud Console
define('GOOGLE_REDIRECT_URL', getenv('GOOGLE_REDIRECT_URL') ?: 'http://localhost/UMPSAHStatManager/auth_callback.php');

// SMTP configuration for email notifications
define('ADMIN_EMAIL', getenv('ADMIN_EMAIL') ?: 'admin@example.com');
define('SMTP_HOST', getenv('SMTP_HOST') ?: 'smtp.gmail.com');
define('SMTP_USER', getenv('SMTP_USER') ?: 'user@example.com');
define('SMTP_PASS', getenv('SMTP_PASS') ?: 'YOUR_SMTP_PASSWORD');
define('SMTP_PORT', getenv('SMTP_PORT') ?: 587);

// Cryptographic Secret Salt for Email approval actions
define('ACTION_SALT', 'UMPSAH_SECRET_SALT_2026_!@#');

// Session Timeout Configuration (in seconds - 20 minutes)
define('SESSION_TIMEOUT_SECONDS', 1200);

// Global DB Connection
try {
    $pdo = new PDO("mysql:host=" . DB_HOST . ";charset=utf8mb4", DB_USER, DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    // Auto-select DB if exists
    $db_check = $pdo->query("SHOW DATABASES LIKE '" . DB_NAME . "'");
    if ($db_check->rowCount() > 0) {
        $pdo->exec("USE `" . DB_NAME . "`");
    }
} catch (PDOException $e) {
    die("Critical Error: Database connection failed. " . $e->getMessage());
}

// Retrieve settings dynamically from DB
function getSystemSetting($key_name, $default = '') {
    global $pdo;
    try {
        $stmt = $pdo->prepare("SELECT `key_value` FROM `settings` WHERE `key_name` = ?");
        $stmt->execute([$key_name]);
        $row = $stmt->fetch();
        return $row ? $row['key_value'] : $default;
    } catch (Exception $e) {
        return $default;
    }
}

// Helpers
function isLoggedIn() {
    return isset($_SESSION['user_id']);
}

function hasRole($roles) {
    if (!isLoggedIn()) return false;
    if (is_string($roles)) {
        return $_SESSION['role'] === $roles;
    }
    return in_array($_SESSION['role'], $roles);
}

function generateActionToken($request_id, $role) {
    return hash('sha256', $request_id . $role . ACTION_SALT);
}

function checkSessionTimeout() {
    if (isLoggedIn()) {
        if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity'] > SESSION_TIMEOUT_SECONDS)) {
            // Expired
            session_unset();
            session_destroy();
            header("Location: " . SITE_URL . "/login.php?timeout=1");
            exit;
        }
        $_SESSION['last_activity'] = time();
    }
}

// Check session timeout if user is logged in
checkSessionTimeout();
?>
