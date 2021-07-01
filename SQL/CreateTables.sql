SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `Donators` CASCADE;

DROP TABLE IF EXISTS `Notes` CASCADE;

CREATE TABLE `Donators`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL,
	`email` VARCHAR(255) NOT NULL,
	`noteId` INT NULL DEFAULT NULL,
	`donationAmount` INT NOT NULL,
	`donationText` TEXT NULL DEFAULT NULL,
	`isAnonymous` BOOL NOT NULL DEFAULT 0,
	CONSTRAINT `PK_Donators` PRIMARY KEY (`id` ASC),
	CONSTRAINT `Donators_Notes_id_fk` FOREIGN KEY (`noteId`) REFERENCES `Notes` (`id`) ON DELETE Restrict ON UPDATE No Action
)
ENGINE=InnoDB
DEFAULT CHARSET utf8mb4
COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE `Notes`
(
	`id` INT NOT NULL AUTO_INCREMENT,
	`displayNote` VARCHAR(255) NOT NULL,
	`playNote` VARCHAR(255) NOT NULL,
	`totalPrice` INT NULL DEFAULT 200,
	`currentPrice` INT NULL DEFAULT 0,
	`keybind` VARCHAR(255) NULL,
	`shiftModifier` BOOL NULL,
	CONSTRAINT `PK_Notes` PRIMARY KEY (`id` ASC)
)
ENGINE=InnoDB
DEFAULT CHARSET utf8mb4
COLLATE utf8mb4_0900_ai_ci;

CREATE TRIGGER `updateNotesPrice`
    BEFORE INSERT ON `Donators`
    FOR EACH ROW
UPDATE `Notes`
    SET Notes.currentPrice = Notes.currentPrice + NEW.donationAmount
    WHERE id = NEW.noteId;


SET FOREIGN_KEY_CHECKS=1;

