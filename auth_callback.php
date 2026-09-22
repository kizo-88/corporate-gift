<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/includes/db.php';
require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/includes/Mailer.php';

$client = new Google\Client();
$client->setClientId(GOOGLE_CLIENT_ID);
$client->setClientSecret(GOOGLE_CLIENT_SECRET);
// IMPORTANT: Must match the URI registered in Google Cloud Console,
// which is the UMPSAHStatManager callback (our shared registered URI).
$client->setRedirectUri(GOOGLE_REDIRECT_URL);

if (isset($_GET['code'])) {
    try {
        $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);
        if (!isset($token['error'])) {
            $client->setAccessToken($token['access_token']);
            $google_oauth = new Google\Service\Oauth2($client);
            $google_account_info = $google_oauth->userinfo->get();

            $google_id = $google_account_info->id;
            $email     = $google_account_info->email;
            $name      = $google_account_info->name;
            $picture   = $google_account_info->picture;

            // Check if user already exists
            $stmt = $pdo->prepare("SELECT * FROM users WHERE google_id = :gid OR email = :email");
            $stmt->execute(['gid' => $google_id, 'email' => $email]);
            $user = $stmt->fetch();

            if ($user) {
                // Update google_id and picture if changed
                $pdo->prepare("UPDATE users SET google_id = ?, picture = ?, name = ? WHERE id = ?")
                    ->execute([$google_id, $picture, $name, $user['id']]);
                $_SESSION['user_id']   = $user['id'];
                $_SESSION['role']      = $user['role'];
                $_SESSION['name']      = $name;
                $_SESSION['email']     = $email;
                $_SESSION['picture']   = $picture;
                $_SESSION['department'] = $user['department'];
            } else {
                // New user: determine role by email
                $role = ($email === ADMIN_EMAIL) ? 'admin' : 'user';
                $pdo->prepare("INSERT INTO users (google_id, name, email, picture, role) VALUES (?, ?, ?, ?, ?)")
                    ->execute([$google_id, $name, $email, $picture, $role]);
                $newId = $pdo->lastInsertId();
                $_SESSION['user_id']    = $newId;
                $_SESSION['role']       = $role;
                $_SESSION['name']       = $name;
                $_SESSION['email']      = $email;
                $_SESSION['picture']    = $picture;
                $_SESSION['department'] = null;
            }

            $_SESSION['last_activity'] = time();

            // Log login activity
            try {
                $pdo->prepare("INSERT INTO login_logs (user_id, action, ip_address, user_agent) VALUES (?, 'login', ?, ?)")
                    ->execute([$_SESSION['user_id'], $_SERVER['REMOTE_ADDR'] ?? '', $_SERVER['HTTP_USER_AGENT'] ?? '']);
            } catch (Exception $e) { /* non-critical */ }

            // Role-based redirect
            $role = $_SESSION['role'];
            if ($role === 'admin') header('Location: ' . SITE_URL . '/admin/index.php');
            elseif ($role === 'hod') header('Location: ' . SITE_URL . '/hod/index.php');
            elseif ($role === 'sbd') header('Location: ' . SITE_URL . '/sbd/index.php');
            else header('Location: ' . SITE_URL . '/user/index.php');
            exit;

        } else {
            header('Location: ' . SITE_URL . '/login.php?error=token'); exit;
        }
    } catch (Exception $e) {
        error_log("OAuth Error: " . $e->getMessage());
        header('Location: ' . SITE_URL . '/login.php?error=exception'); exit;
    }
} else {
    header('Location: ' . SITE_URL . '/login.php'); exit;
}
?>
