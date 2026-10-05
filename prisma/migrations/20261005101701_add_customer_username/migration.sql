/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Customer_email_key` ON `Customer`(`email`);
ALTER TABLE `Customer` ADD COLUMN `username` VARCHAR(191) NULL;
UPDATE `Customer` SET `username` = CONCAT('customer', `id`) WHERE `username` IS NULL;
ALTER TABLE `Customer` MODIFY `username` VARCHAR(191) NOT NULL;