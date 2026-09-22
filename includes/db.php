<?php
require_once __DIR__ . '/../config.php';

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
} catch (PDOException $e) {
    die("Critical Error: Database connection or self-installation failed. " . $e->getMessage());
}
?>
