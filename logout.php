<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/includes/db.php';

if (isLoggedIn()) {
    logAudit('Authentication', 'LOGOUT', "User " . ($_SESSION['name'] ?? 'User') . " signed out of the system", $_SESSION['user_id']);
    // Log the logout action
    try {
        $pdo->prepare("INSERT INTO login_logs (user_id, action, ip_address, user_agent) VALUES (?, 'logout', ?, ?)")
            ->execute([$_SESSION['user_id'], $_SERVER['REMOTE_ADDR'] ?? '', $_SERVER['HTTP_USER_AGENT'] ?? '']);
    } catch (Exception $e) { /* non-critical */ }
}

session_unset();
session_destroy();
header('Location: ' . SITE_URL . '/login.php');
exit;
?>
