/*
  Warnings:

  - You are about to drop the column `bandId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `venueId` on the `Booking` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Booking` DROP FOREIGN KEY `Booking_bandId_fkey`;

-- DropForeignKey
ALTER TABLE `Booking` DROP FOREIGN KEY `Booking_venueId_fkey`;

-- DropIndex
DROP INDEX `Booking_bandId_fkey` ON `Booking`;

-- DropIndex
DROP INDEX `Booking_venueId_fkey` ON `Booking`;

-- AlterTable
ALTER TABLE `Booking` DROP COLUMN `bandId`,
    DROP COLUMN `date`,
    DROP COLUMN `price`,
    DROP COLUMN `venueId`,
    ADD COLUMN `ticketId` INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE `Ticket` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `eventId` INTEGER NOT NULL,
    `category` ENUM('standing', 'sitting') NOT NULL,
    `price` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Event` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bandId` INTEGER NOT NULL,
    `venueId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `Ticket`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_venueId_fkey` FOREIGN KEY (`venueId`) REFERENCES `Venue`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_bandId_fkey` FOREIGN KEY (`bandId`) REFERENCES `Band`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
