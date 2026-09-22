-- Seed Dummy Data for UMPSA Holdings Corporate Gift System
USE `umpsa_corpgift`;

-- 1. Reset / Insert Dummy Users (if not exists)
INSERT IGNORE INTO `users` (`id`, `name`, `email`, `role`, `department`) VALUES
(1, 'System Administrator', 'aymanhud26@gmail.com', 'admin', 'IT Support'),
(2, 'Dr. Ahmad Fauzi (HOD IT)', 'hod.it@umpsaholdings.my', 'hod', 'IT'),
(3, 'Puan Sarah Kamila (SBD Head)', 'aymansha0533@gmail.com', 'sbd', 'Strategic Business Development'),
(4, 'Aizad Rahim (IT Officer)', 'requester.it@umpsaholdings.my', 'user', 'IT'),
(5, 'Siti Nurhaliza (Marketing Exec)', 'siti.marketing@umpsaholdings.my', 'user', 'Marketing'),
(6, 'En. Razak Mansor (HOD Marketing)', 'hod.marketing@umpsaholdings.my', 'hod', 'Marketing');

-- 2. Insert Dummy Requests for Testing Approval Flow
INSERT INTO `requests` 
  (`user_id`, `gift_id`, `quantity`, `purpose`, `recipient_name`, `event_name`, `justification_file`, `status`, `requested_at`) 
VALUES
  (4, 1, 2, 'Cenderamata VIP untuk penceramah jemputan', 'Prof. Dr. Azman Ismail', 'Majlis Anugerah Perkhidmatan Cemerlang 2026', 'sample_justification.pdf', 'pending_hod', NOW() - INTERVAL 2 DAY),
  (4, 2, 5, 'Hadiah saguhati untuk ahli jawatankuasa bengkel', 'AJK Bengkel Digitalisasi', 'Bengkel Transformasi Digital UMPSA', 'sample_justification.pdf', 'pending_hod', NOW() - INTERVAL 1 DAY),
  (4, 3, 10, 'Cenderamata khas pelawat kementerian', 'Delegasi KPT', 'Lawatan Kerja KPT ke UMPSA Holdings', 'sample_justification.pdf', 'pending_sbd', NOW() - INTERVAL 3 DAY),
  (4, 4, 15, 'Saguhati jemputan Mesyuarat Lembaga Pengarah', 'Ahli Board of Directors', 'Mesyuarat BOD Bil. 3/2026', 'sample_justification.pdf', 'approved', NOW() - INTERVAL 5 DAY),
  (4, 5, 2, 'Hadiah persaraan staf senior IT', 'En. Osman Hashim', 'Majlis Sanjungan Budi 2026', 'sample_justification.pdf', 'rejected_hod', NOW() - INTERVAL 6 DAY),
  (5, 1, 3, 'Gift set pelancaran produk baru', 'VIP Clients', 'Pelancaran Produk Korporat 2026', 'sample_justification.pdf', 'pending_hod', NOW() - INTERVAL 4 HOUR);
