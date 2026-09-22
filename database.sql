CREATE DATABASE IF NOT EXISTS `umpsa_corpgift`;
USE `umpsa_corpgift`;

-- Users table
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `google_id` VARCHAR(255) DEFAULT NULL,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `picture` VARCHAR(255) DEFAULT NULL,
  `role` ENUM('user', 'hod', 'sbd', 'admin') NOT NULL DEFAULT 'user',
  `department` VARCHAR(100) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Gifts inventory table
CREATE TABLE IF NOT EXISTS `gifts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `category` VARCHAR(100) NOT NULL,
  `stock_count` INT NOT NULL DEFAULT 0,
  `cost` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  `image_url` VARCHAR(255) DEFAULT NULL,
  `status` ENUM('Available', 'Low Stock', 'Out of Stock') NOT NULL DEFAULT 'Available',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Corporate Gift Requests table (2-Level Approval)
CREATE TABLE IF NOT EXISTS `requests` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `gift_id` INT NOT NULL,
  `quantity` INT NOT NULL DEFAULT 1,
  `purpose` TEXT NOT NULL,
  `recipient_name` VARCHAR(255) NOT NULL,
  `event_name` VARCHAR(255) NOT NULL,
  `justification_file` VARCHAR(255) NOT NULL,
  `status` ENUM('pending_hod', 'pending_sbd', 'approved', 'rejected_hod', 'rejected_sbd') NOT NULL DEFAULT 'pending_hod',
  
  -- Level 1 (HOD Approval) details
  `hod_id` INT DEFAULT NULL,
  `hod_notes` TEXT DEFAULT NULL,
  `hod_actioned_at` TIMESTAMP NULL DEFAULT NULL,
  
  -- Level 2 (SBD Approval) details
  `sbd_id` INT DEFAULT NULL,
  `sbd_notes` TEXT DEFAULT NULL,
  `sbd_actioned_at` TIMESTAMP NULL DEFAULT NULL,
  
  `requested_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`gift_id`) REFERENCES `gifts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Login activity logs
CREATE TABLE IF NOT EXISTS `login_logs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `action` VARCHAR(50) NOT NULL DEFAULT 'login',
  `ip_address` VARCHAR(45) DEFAULT NULL,
  `user_agent` VARCHAR(255) DEFAULT NULL,
  `timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dynamic System Settings table
CREATE TABLE IF NOT EXISTS `settings` (
  `key_name` VARCHAR(100) PRIMARY KEY,
  `key_value` TEXT NOT NULL,
  `description` VARCHAR(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed system settings (preset Head of SBD email)
INSERT INTO `settings` (`key_name`, `key_value`, `description`) VALUES
('sbd_email', 'aymansha0533@gmail.com', 'Dynamic Email Address for the Head of Strategic Business Development (SBD) approvals.');

-- Seed corporate gifts
INSERT INTO `gifts` (`name`, `description`, `category`, `stock_count`, `cost`, `image_url`, `status`) VALUES
('Premium Executive Pen Set', 'Elegant lacquer finished writing pen with gold-plated accents, presented in a velvet lined wooden gift box.', 'Executive', 50, 45.00, 'pen_set.jpg', 'Available'),
('UMPSA Holdings Tech Hoodie', 'Comfortable, premium fleece hooded sweatshirt with embroidered corporate logo and zipped security pockets.', 'Apparel', 30, 65.00, 'hoodie.jpg', 'Available'),
('Double Canopy Golf Umbrella', 'Windproof double canopy umbrella in corporate Teal and Dark Blue, featuring fiberglass shaft and automatic opening.', 'Outdoor', 100, 35.00, 'umbrella.jpg', 'Available'),
('Ceramic Matte Coffee Mug', 'Eco-friendly double-walled ceramic mug with bamboo lid, laser engraved with corporate brand elements.', 'Mugs', 150, 15.00, 'mug.jpg', 'Available'),
('Leather Notebook & Keyring Set', 'Genuine leather cover refillable A5 notebook paired with a matching heavy-duty steel keyring.', 'Stationery', 5, 80.00, 'leather_set.jpg', 'Low Stock'),
('Crystal Excellence Plaque', 'Hand-cut optical crystal trophy plaque for distinguished corporate events and key VIP guest presentation.', 'Trophies', 0, 120.00, 'plaque.jpg', 'Out of Stock');

-- Seed initial users for local testing
-- Initial Admin
INSERT INTO `users` (`name`, `email`, `role`, `department`) VALUES
('System Administrator', 'aymanhud26@gmail.com', 'admin', 'IT Support');

-- HOD of IT
INSERT INTO `users` (`name`, `email`, `role`, `department`) VALUES
('Dr. Ahmad Fauzi (HOD IT)', 'hod.it@umpsaholdings.my', 'hod', 'IT');

-- SBD Head
INSERT INTO `users` (`name`, `email`, `role`, `department`) VALUES
('Puan Sarah Kamila (SBD Head)', 'aymansha0533@gmail.com', 'sbd', 'Strategic Business Development');

-- Requester User in IT
INSERT INTO `users` (`name`, `email`, `role`, `department`) VALUES
('Aizad Rahim (IT Officer)', 'requester.it@umpsaholdings.my', 'user', 'IT');
