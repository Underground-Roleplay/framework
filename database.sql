-- Dumping database structure for urp
CREATE DATABASE IF NOT EXISTS `urp` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `urp`;

-- Dumping structure for table urp.characters
CREATE TABLE IF NOT EXISTS `characters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ssn` varchar(50) NOT NULL,
  `cid` int DEFAULT NULL,
  `socialID` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `money` text NOT NULL,
  `charinfo` text NOT NULL,
  `job` mediumtext NOT NULL,
  `gang` text DEFAULT NULL,
  `position` mediumtext NOT NULL,
  `metadata` mediumtext NOT NULL,
  `inventory` longtext DEFAULT NULL,
  `last_updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ssn`),
  KEY `id` (`id`),
  KEY `last_updated` (`last_updated`),
  KEY `socialID` (`socialID`)
) ENGINE=InnoDB AUTO_INCREMENT=1;

-- Data exporting was unselected.

-- Dumping structure for table urp.characters_customs
CREATE TABLE IF NOT EXISTS `characters_customs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ssn` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `customizations` text NOT NULL,
  `cloakroom` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`ssn`) USING BTREE,
  KEY `ssn` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1;

-- Data exporting was unselected.

-- Dumping structure for table urp.permissions
CREATE TABLE IF NOT EXISTS `permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `socialID` varchar(255) NOT NULL,
  `permission` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `socialID` (`socialID`)
) ENGINE=InnoDB AUTO_INCREMENT=1;

-- Data exporting was unselected.

-- Dumping structure for table urp.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `identifier` char(255) NOT NULL DEFAULT '',
  `banned` int DEFAULT NULL,
  `whitelisted` int DEFAULT NULL,
  `socialID` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1;

-- Data exporting was unselected.

-- Dumping structure for table urp.characters_vehicles
CREATE TABLE IF NOT EXISTS `characters_vehicles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ssn` varchar(255) NOT NULL NOT NULL,
  `model` varchar(255) NOT NULL NOT NULL,
  `position` varchar(255) NOT NULL NOT NULL,
  `plate` varchar(50) NOT NULL NOT NULL,
  `status` longtext NOT NULL NOT NULL,
  `metadata` longtext NOT NULL NOT NULL,
  `customizations` longtext NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `ssn` (`ssn`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1;

-- Dumping structure for table urp.characters_homes
CREATE TABLE IF NOT EXISTS `characters_homes`(
  `id` int NOT NULL AUTO_INCREMENT,
  `ssn` varchar(255) NOT NULL,
  `home` VARCHAR(100),
  `number` INTEGER,
  UNIQUE(home,number),
  PRIMARY KEY (`id`) USING BTREE,
  KEY `ssn` (`ssn`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1;

-- Data exporting was unselected.

CREATE TABLE IF NOT EXISTS dealership (
  id int NOT NULL AUTO_INCREMENT,
  model varchar(50) DEFAULT NULL,
  category varchar(50) DEFAULT NULL,
  stock int DEFAULT NULL,
  price int DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=1;