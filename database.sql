-- Dumping database structure for urp
CREATE DATABASE IF NOT EXISTS `urp` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `urp`;

-- Dumping structure for table urp.characters
CREATE TABLE IF NOT EXISTS `characters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ssn` varchar(50) NOT NULL,
  `dimension` int DEFAULT NULL,
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
  `inventory` LONGTEXT NULL DEFAULT '[]',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `ssn` (`ssn`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1;

-- Dumping structure for table urp.characters_homes
CREATE TABLE IF NOT EXISTS `characters_homes`(
  `id` int NOT NULL AUTO_INCREMENT,
  `ssn` varchar(255) NOT NULL,
  `name` VARCHAR(100),
  `chest` LONGTEXT NULL DEFAULT '[]' COLLATE 'utf8_general_ci',
  `slot` INTEGER,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `home` (`name`,`slot`) USING BTREE,
  KEY `ssn` (`ssn`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1;

--Dumping structure for table chest
CREATE TABLE `chest` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`cords` VARCHAR(50) NOT NULL DEFAULT '' COLLATE 'utf8_general_ci',
	`chest` LONGTEXT NOT NULL DEFAULT '[]' COLLATE 'utf8_general_ci',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=2
;
-- Data exporting was unselected.

CREATE TABLE IF NOT EXISTS dealership (
  id int NOT NULL AUTO_INCREMENT,
  model varchar(50) DEFAULT NULL,
  category varchar(50) DEFAULT NULL,
  stock int DEFAULT NULL,
  price int DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `chat` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`id_player_one` VARCHAR(50) NOT NULL,
	`id_player_two` VARCHAR(50) NOT NULL,
	`contain_message` INT(10) NULL DEFAULT '0',
	`last_message` VARCHAR(500) NULL DEFAULT '',
	PRIMARY KEY (`id`) USING BTREE
)
ENGINE=InnoDB
AUTO_INCREMENT=1
;

CREATE TABLE IF NOT EXISTS `chat_message` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`type` VARCHAR(50) NULL DEFAULT '',
	`message` VARCHAR(50) NOT NULL DEFAULT '0',
	`ssn` VARCHAR(50) NOT NULL,
	`created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`read` INT(10) NULL DEFAULT '0',
	`deleted` INT(10) NULL DEFAULT '0',
	`chave_id` INT(10) NOT NULL DEFAULT '0',
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `FK_chat_message_chat` (`chave_id`) USING BTREE,
	CONSTRAINT `FK_chat_message_chat` FOREIGN KEY (`chave_id`) REFERENCES `urp`.`chat` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
ENGINE=InnoDB
AUTO_INCREMENT=1
;

CREATE TABLE IF NOT EXISTS `phone_contact` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`ssn` VARCHAR(20) NOT NULL,
	`contact` VARCHAR(1000) NOT NULL,
	PRIMARY KEY (`id`) USING BTREE
)
ENGINE=InnoDB
AUTO_INCREMENT=1
;

CREATE TABLE IF NOT EXISTS `phone_recent` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`ssn` VARCHAR(20) NOT NULL,
	`recent` VARCHAR(4000) NULL,
	PRIMARY KEY (`id`) USING BTREE
)
ENGINE=InnoDB
AUTO_INCREMENT=1
;
