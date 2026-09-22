<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/vendor/autoload.php';

if (isLoggedIn()) {
    if (hasRole('admin')) { header('Location: ' . SITE_URL . '/admin/index.php'); }
    elseif (hasRole('hod')) { header('Location: ' . SITE_URL . '/hod/index.php'); }
    elseif (hasRole('sbd')) { header('Location: ' . SITE_URL . '/sbd/index.php'); }
    else { header('Location: ' . SITE_URL . '/user/index.php'); }
    exit;
}

header('Location: ' . SITE_URL . '/login.php');
exit;
?>
