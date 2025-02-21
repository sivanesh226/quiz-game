-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 21, 2025 at 04:40 PM
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
  `delFlag` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subcategory`
--

INSERT INTO `subcategory` (`id`, `category_id`, `sub_category_name`, `created_author`, `updated_author`, `created_dateTime`, `updated_dateTime`, `delFlag`) VALUES
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
(5, '104135638712430956438', 'ramyamariappan101@gmail.com', NULL, NULL, 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT for table `subcategory`
--
ALTER TABLE `subcategory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `subcategory`
--
ALTER TABLE `subcategory`
  ADD CONSTRAINT `subcategory_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
