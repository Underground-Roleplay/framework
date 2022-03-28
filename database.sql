/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE IF NOT EXISTS `urp` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `urp`;

CREATE TABLE IF NOT EXISTS `characters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ssn` varchar(50) NOT NULL,
  `dimension` int DEFAULT NULL,
  `socialID` varchar(255) NOT NULL,
  `metadata` mediumtext CHARACTER SET utf8 NOT NULL,
  `name` varchar(255) NOT NULL,
  `money` text NOT NULL,
  `charinfo` text NOT NULL,
  `job` mediumtext NOT NULL,
  `gang` text,
  `position` mediumtext NOT NULL,
  `inventory` longtext NOT NULL,
  `last_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ssn`),
  KEY `id` (`id`),
  KEY `last_updated` (`last_updated`),
  KEY `socialID` (`socialID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `characters_customs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ssn` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `customizations` text NOT NULL,
  `cloakroom` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`ssn`) USING BTREE,
  KEY `ssn` (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `characters_homes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ssn` varchar(255) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `chest` longtext,
  `slot` int DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `home` (`name`,`slot`) USING BTREE,
  KEY `ssn` (`ssn`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `characters_vehicles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ssn` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `plate` varchar(50) NOT NULL,
  `status` longtext NOT NULL,
  `metadata` longtext NOT NULL,
  `customizations` longtext NOT NULL,
  `inventory` longtext,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `ssn` (`ssn`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `chat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_player_one` varchar(50) NOT NULL,
  `id_player_two` varchar(50) NOT NULL,
  `contain_message` int DEFAULT '0',
  `last_message` varchar(500) DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `chat_message` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(50) DEFAULT '',
  `message` varchar(50) NOT NULL DEFAULT '0',
  `ssn` varchar(50) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `read` int DEFAULT '0',
  `deleted` int DEFAULT '0',
  `chave_id` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_chat_message_chat` (`chave_id`) USING BTREE,
  CONSTRAINT `FK_chat_message_chat` FOREIGN KEY (`chave_id`) REFERENCES `chat` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `dealership` (
  `id` int NOT NULL AUTO_INCREMENT,
  `model` varchar(50) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `price` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `socialID` varchar(255) NOT NULL,
  `permission` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `socialID` (`socialID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `phone_contact` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ssn` varchar(20) NOT NULL,
  `contact` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `phone_recent` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ssn` varchar(20) NOT NULL,
  `recent` varchar(4000) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `storages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ssn` varchar(50) CHARACTER SET utf8 NOT NULL,
  `data` longtext CHARACTER SET utf8 NOT NULL,
  `name` varchar(250) CHARACTER SET utf8 NOT NULL,
  `perm` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `last_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `ssn` (`ssn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `identifier` char(255) NOT NULL DEFAULT '',
  `banned` int DEFAULT NULL,
  `whitelisted` int DEFAULT NULL,
  `socialID` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
