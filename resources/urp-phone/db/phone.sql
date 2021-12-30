CREATE TABLE `chat` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`id_player_one` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`id_player_two` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`contain_message` INT(10) NULL DEFAULT '0',
	`last_message` VARCHAR(500) NULL DEFAULT '' COLLATE 'utf8_general_ci',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=52
;

CREATE TABLE `chat_message` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`type` VARCHAR(50) NULL DEFAULT '' COLLATE 'utf8_general_ci',
	`message` VARCHAR(50) NOT NULL DEFAULT '0' COLLATE 'utf8_general_ci',
	`ssn` VARCHAR(50) NOT NULL DEFAULT '0' COLLATE 'utf8_general_ci',
	`created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`read` INT(10) NULL DEFAULT '0',
	`deleted` INT(10) NULL DEFAULT '0',
	`chave_id` INT(10) NOT NULL DEFAULT '0',
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `FK_chat_message_chat` (`chave_id`) USING BTREE,
	CONSTRAINT `FK_chat_message_chat` FOREIGN KEY (`chave_id`) REFERENCES `urp`.`chat` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=85
;

CREATE TABLE `phone_contact` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`ssn` VARCHAR(20) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`contact` VARCHAR(1000) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=12
;
CREATE TABLE `phone_recent` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`ssn` VARCHAR(20) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	`recent` VARCHAR(4000) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=7
;
