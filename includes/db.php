<?php
require_once __DIR__ . '/../config.php';

// If using Supabase PostgreSQL, schema is already provisioned
if (defined('DB_DRIVER') && DB_DRIVER === 'pgsql') {
    return;
}

try {
    // Check if we can select the database
    $stmt = $pdo->query("SHOW DATABASES LIKE '" . DB_NAME . "'");
    if ($stmt->rowCount() === 0) {
        // Database does not exist, trigger self-installation
        $sql_file = __DIR__ . '/../database.sql';
        if (file_exists($sql_file)) {
            $sql = file_get_contents($sql_file);
            // Split SQL into individual statements
            // A simple query execution can run multiple statements if PDO allows,
            // but running the raw SQL file directly in a single exec call is generally supported for InnoDB dumps.
            $pdo->exec($sql);
            
            // Confirm database is selected
            $pdo->exec("USE `" . DB_NAME . "`");
        } else {
            die("Critical Error: Database '" . DB_NAME . "' does not exist, and the SQL schema installer 'database.sql' was not found.");
        }
    } else {
        $pdo->exec("USE `" . DB_NAME . "`");
    }

    // Ensure audit_logs table exists
    $pdo->exec("CREATE TABLE IF NOT EXISTS `audit_logs` (
      `id` INT AUTO_INCREMENT PRIMARY KEY,
      `user_id` INT NULL,
      `user_name` VARCHAR(255) NOT NULL DEFAULT 'System',
      `user_role` VARCHAR(50) NOT NULL DEFAULT 'system',
      `module` VARCHAR(50) NOT NULL,
      `action` VARCHAR(50) NOT NULL,
      `target_id` INT NULL,
      `description` TEXT NOT NULL,
      `ip_address` VARCHAR(45) DEFAULT NULL,
      `user_agent` VARCHAR(255) DEFAULT NULL,
      `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX (`module`),
      INDEX (`action`),
      INDEX (`user_id`),
      INDEX (`created_at`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
} catch (PDOException $e) {
    die("Critical Error: Database connection or self-installation failed. " . $e->getMessage());
}
?>
