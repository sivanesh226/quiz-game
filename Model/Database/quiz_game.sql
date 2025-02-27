-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 27, 2025 at 02:46 PM
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
(3, 'Sports', 'Admin', '', '2025-02-21 13:50:42', '2025-02-25 23:40:35', 0),
(4, 'sdfsdfsd', 'Admin', '', '2025-02-24 21:44:52', '2025-02-25 23:40:36', 0),
(5, 'asdfasd', 'Admin', '', '2025-02-24 21:45:27', '2025-02-25 23:41:39', 0),
(6, 'sdfgsdfgsdf', 'Admin', '', '2025-02-24 21:46:00', '2025-02-25 23:41:54', 0),
(7, 'Sports', 'Admin', '', '2025-02-26 02:13:25', '2025-02-26 02:13:25', 1);

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
(26, 2, 5, 'Who invented Computer?', 'Charles Babbage', 'Jackie Chan', 'Alexander Grahambell', 'Mark Zuckerberg', 'A', 'Admin', 'Admin', '2025-02-21 18:54:14', '2025-02-25 21:18:37', 0),
(33, 7, 14, 'In 2011, Which country won the world cup trophy?', 'India', 'SriLanka', 'England', 'Australia', 'A', 'Admin', 'Admin', '2025-02-25 20:51:03', '2025-02-25 20:51:22', 1);

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
(2, 1, 1, 1, 5, 4, 1, 80, 'Pass', '01:30:00', '2025-02-22 19:53:21'),
(3, 8, 1, 2, 0, 0, 0, 0, 'Fail', '00:04:57', '2025-02-24 14:19:26'),
(4, 8, 1, 2, 1, 1, 0, 20, 'Fail', '00:04:47', '2025-02-24 14:20:34'),
(5, 8, 1, 1, 1, 0, 1, 0, 'Fail', '00:04:58', '2025-02-24 15:54:52'),
(6, 8, 1, 1, 4, 1, 3, 20, 'Fail', '00:04:17', '2025-02-24 15:56:05'),
(7, 8, 1, 2, 4, 1, 3, 20, 'Fail', '00:00:00', '2025-02-24 16:41:32'),
(8, 8, 1, 2, 0, 0, 0, 0, 'In-Complete', '00:04:53', '2025-02-24 16:45:03'),
(9, 8, 1, 1, 5, 5, 0, 100, 'Pass', '00:04:21', '2025-02-24 16:58:31'),
(10, 8, 1, 1, 5, 5, 0, 100, 'Pass', '00:04:27', '2025-02-24 17:04:20');

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
(6, 2, 'Important Events', 'Admin', 'Admin', '2025-02-20 22:59:05', '2025-02-20 22:59:05', 1),
(7, 4, 'sfgsdfg', 'Admin', '', '2025-02-24 21:45:11', '2025-02-25 23:40:36', 0),
(8, 4, 'asdfsadfsad', 'Admin', '', '2025-02-24 21:45:16', '2025-02-25 23:40:36', 0),
(9, 5, 'sdfasdf', 'Admin', '', '2025-02-24 21:45:38', '2025-02-25 23:41:39', 0),
(10, 5, 'asdfsdfgsd', 'Admin', '', '2025-02-24 21:45:43', '2025-02-25 23:41:39', 0),
(11, 5, 'wedgefge', 'Admin', '', '2025-02-24 21:45:48', '2025-02-25 23:41:39', 0),
(12, 6, 'sdgsd', 'Admin', '', '2025-02-24 21:47:28', '2025-02-25 23:41:54', 0),
(13, 6, 'asdfsdfasd', 'Admin', '', '2025-02-24 21:47:32', '2025-02-25 23:41:54', 0),
(14, 7, 'Cricket', 'Admin', '', '2025-02-26 02:13:34', '2025-02-26 02:13:34', 1);

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
  `role` varchar(45) NOT NULL DEFAULT 'user',
  `isActive` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `mob_no`, `password`, `role`, `isActive`) VALUES
(1, 'Smart', 'smartsiva226@gmail.com', NULL, '2d31e9749fd22541a0f63c728a9832fd0e0255856cf17a792876300b', 'admin', 1),
(4, '112137282236794547250', 'sivanesh@dsrt.in', NULL, NULL, 'user', 0),
(7, 'Admin', 'admin@admin.com', NULL, '58acb7acccce58ffa8b953b12b5a7702bd42dae441c1ad85057fa70b', 'admin', 1),
(8, 'Ramya Mariappan', 'ramyamariappan101@gmail.com', NULL, NULL, 'user', 0),
(9, 'Ramya', 'ramyarahini10@gmail.com', NULL, '$2y$10$JIeHy1ElUvuLZlf21hXlEeffNCWfnppPQf1EH.egUha/MoZThB.r.', 'user', 1),
(10, 'Sivanesh123', 'smatsiva226@gmail.com', NULL, '$2y$10$7aph3OuS4pEcnQC4yzwJFeZXmVKOgGjfQ/5U6iaFYsKA8DAI.bwyC', 'admin', 0),
(11, 'Sarath', 'sarath@gmail.com', NULL, '$2y$10$LAD3S.d.O9wVeWulLwz03uSYrLragvpxZmZHiwUOKx8J/mrNS76py', 'user', 0),
(12, 'Kaanu', 'Kanu@gmail.com', NULL, '$2y$10$.F.Oa6io/3zYOGvqK.FKyOEHDTk23ynvXY5XzC6A0KflTRQ.20r/.', 'user', 0),
(13, 'bbb', 'ccc@df.vdfd', NULL, '$2y$10$.906Ot7fozkJaPNsUwVL6OkjuPrRkrZlPV9trn4t184EOF5chqlrG', 'user', 0),
(14, 'Rahini', 'ramyasathy@yahoo.com', NULL, '$2y$10$7yJk2cTFgffpOEfJkoVd4OxzLxnIdpzMkYGuZx4AQMsbnD9uTb9Mq', 'user', 1);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `results`
--
ALTER TABLE `results`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `subcategory`
--
ALTER TABLE `subcategory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

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
