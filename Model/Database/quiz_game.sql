-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 23, 2025 at 07:26 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quiz_game`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `created_author` varchar(255) NOT NULL,
  `updated_author` varchar(255) NOT NULL,
  `created_dateTime` datetime DEFAULT current_timestamp(),
  `updated_dateTime` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isActive` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `category_name`, `created_author`, `updated_author`, `created_dateTime`, `updated_dateTime`, `isActive`) VALUES
(1, 'History', 'Admin', 'Admin', '2025-02-20 22:54:35', '2025-02-20 22:56:55', 1),
(2, 'General Knowledge', 'Admin', 'Admin', '2025-02-20 22:54:35', '2025-02-20 22:57:07', 1),
(3, 'Sports', 'Admin', '', '2025-02-21 13:50:42', '2025-02-21 13:57:14', 0);

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `subcategory_id` int(11) NOT NULL,
  `question_text` text NOT NULL,
  `option_a` varchar(255) NOT NULL,
  `option_b` varchar(255) NOT NULL,
  `option_c` varchar(255) NOT NULL,
  `option_d` varchar(255) NOT NULL,
  `correct_option` char(1) NOT NULL CHECK (`correct_option` in ('A','B','C','D')),
  `created_author` varchar(100) DEFAULT NULL,
  `updated_author` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isActive` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `category_id`, `subcategory_id`, `question_text`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_option`, `created_author`, `updated_author`, `created_at`, `updated_at`, `isActive`) VALUES
(16, 1, 1, 'Who built the Great Pyramid of Giza?', 'Khufu', 'Ramses II', 'Cleopatra', 'Tutankhamun', 'A', 'Admin', 'Admin', '2025-02-21 18:13:48', '2025-02-21 18:13:48', 1),
(17, 1, 1, 'Which ancient civilization is known for its cuneiform script?', 'Egyptians', 'Romans', 'Sumerians', 'Greeks', 'C', 'Admin', 'Admin', '2025-02-21 18:13:48', '2025-02-21 18:13:48', 1),
(18, 1, 1, 'The Roman Empire officially ended in which year?', '395 AD', '476 AD', '1453 AD', '1066 AD', 'B', 'Admin', 'Admin', '2025-02-21 18:13:48', '2025-02-21 18:13:48', 1),
(19, 1, 1, 'Who was the first emperor of China?', 'Qin Shi Huang', 'Confucius', 'Wu Zetian', 'Kublai Khan', 'A', 'Admin', 'Admin', '2025-02-21 18:13:48', '2025-02-21 18:13:48', 1),
(20, 1, 1, 'Which ancient civilization built Machu Picchu?', 'Mayans', 'Aztecs', 'Incas', 'Olmecs', 'C', 'Admin', 'Admin', '2025-02-21 18:13:48', '2025-02-21 18:13:48', 1),
(21, 1, 2, 'Who was the first President of the United States?', 'George Washington', 'Abraham Lincoln', 'John Adams', 'Thomas Jefferson', 'A', 'Admin', 'Admin', '2025-02-21 18:13:48', '2025-02-21 18:13:48', 1),
(22, 1, 2, 'When did World War II end?', '1941', '1945', '1950', '1939', 'B', 'Admin', 'Admin', '2025-02-21 18:13:48', '2025-02-21 18:13:48', 1),
(23, 1, 2, 'Who wrote the Declaration of Independence?', 'Benjamin Franklin', 'Thomas Jefferson', 'John Adams', 'Alexander Hamilton', 'B', 'Admin', 'Admin', '2025-02-21 18:13:48', '2025-02-21 18:13:48', 1),
(24, 1, 2, 'Which country was the last to join the Allies in World War II?', 'United States', 'France', 'Soviet Union', 'Italy', 'C', 'Admin', 'Admin', '2025-02-21 18:13:48', '2025-02-21 18:13:48', 1),
(25, 1, 2, 'What was the name of the ship that carried the Pilgrims to America in 1620?', 'Santa Maria', 'Mayflower', 'HMS Victory', 'Endeavour', 'B', 'Admin', 'Admin', '2025-02-21 18:13:48', '2025-02-21 18:13:48', 1),
(26, 2, 2, 'Who invented Computer?', 'Charles Babbage', 'Jackie Chan', 'Alexander Grahambell', 'Mark Zuckerberg', 'A', 'Admin', 'Admin', '2025-02-21 18:54:14', '2025-02-21 18:54:14', 1);

-- --------------------------------------------------------

--
-- Table structure for table `results`
--

CREATE TABLE `results` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `subcategory_id` int(11) NOT NULL,
  `no_attempt_quest` int(11) NOT NULL DEFAULT 0,
  `no_right_answer` int(11) NOT NULL DEFAULT 0,
  `no_wrong_answer` int(11) NOT NULL DEFAULT 0,
  `total_marks` int(11) NOT NULL DEFAULT 0,
  `result_status` varchar(50) NOT NULL,
  `time_duration` time NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `results`
--

INSERT INTO `results` (`id`, `user_id`, `category_id`, `subcategory_id`, `no_attempt_quest`, `no_right_answer`, `no_wrong_answer`, `total_marks`, `result_status`, `time_duration`, `created_at`) VALUES
(1, 1, 1, 1, 5, 3, 2, 70, 'Pass', '00:01:25', '2025-02-22 19:39:46'),
(2, 1, 1, 1, 5, 4, 1, 80, 'Pass', '01:30:00', '2025-02-22 19:53:21');

-- --------------------------------------------------------

--
-- Table structure for table `subcategory`
--

CREATE TABLE `subcategory` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `sub_category_name` varchar(255) NOT NULL,
  `created_author` varchar(255) NOT NULL,
  `updated_author` varchar(255) NOT NULL,
  `created_dateTime` datetime DEFAULT current_timestamp(),
  `updated_dateTime` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isActive` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subcategory`
--

INSERT INTO `subcategory` (`id`, `category_id`, `sub_category_name`, `created_author`, `updated_author`, `created_dateTime`, `updated_dateTime`, `isActive`) VALUES
(1, 1, 'Ancient History', 'Admin', 'Admin', '2025-02-20 22:59:05', '2025-02-20 22:59:05', 1),
(2, 1, 'Modern History', 'Admin', 'Admin', '2025-02-20 22:59:05', '2025-02-20 22:59:05', 1),
(3, 1, 'World War History', 'Admin', 'Admin', '2025-02-20 22:59:05', '2025-02-20 22:59:05', 1),
(4, 2, 'Current Affairs', 'Admin', 'Admin', '2025-02-20 22:59:05', '2025-02-20 22:59:05', 1),
(5, 2, 'Famous Personalities', 'Admin', 'Admin', '2025-02-20 22:59:05', '2025-02-20 22:59:05', 1),
(6, 2, 'Important Events', 'Admin', 'Admin', '2025-02-20 22:59:05', '2025-02-20 22:59:05', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(45) NOT NULL,
  `mob_no` int(11) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `role` varchar(45) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `mob_no`, `password`, `role`) VALUES
(1, 'Smart', 'smartsiva226@gmail.com', NULL, '2d31e9749fd22541a0f63c728a9832fd0e0255856cf17a792876300b', 'admin'),
(4, '112137282236794547250', 'sivanesh@dsrt.in', NULL, NULL, 'user'),
(5, '104135638712430956438', 'ramyamariappan101@gmail.com', NULL, NULL, 'user'),
(7, 'Admin', 'admin@admin.com', NULL, '58acb7acccce58ffa8b953b12b5a7702bd42dae441c1ad85057fa70b', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `subcategory_id` (`subcategory_id`);

--
-- Indexes for table `results`
--
ALTER TABLE `results`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_results_user` (`user_id`),
  ADD KEY `fk_results_category` (`category_id`),
  ADD KEY `fk_results_subcategory` (`subcategory_id`);

--
-- Indexes for table `subcategory`
--
ALTER TABLE `subcategory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `results`
--
ALTER TABLE `results`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `subcategory`
--
ALTER TABLE `subcategory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  ADD CONSTRAINT `questions_ibfk_2` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategory` (`id`);

--
-- Constraints for table `results`
--
ALTER TABLE `results`
  ADD CONSTRAINT `fk_results_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_results_subcategory` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategory` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_results_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `subcategory`
--
ALTER TABLE `subcategory`
  ADD CONSTRAINT `subcategory_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
