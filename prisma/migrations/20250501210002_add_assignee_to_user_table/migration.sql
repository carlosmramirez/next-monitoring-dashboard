-- AlterTable
ALTER TABLE `Issue` ADD COLUMN `assigneeUserID` VARCHAR(250) NULL;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_assigneeUserID_fkey` FOREIGN KEY (`assigneeUserID`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
