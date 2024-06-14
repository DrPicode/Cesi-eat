/*
  Warnings:

  - Made the column `address_id_address` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_address_id_address_fkey";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "address_id_address" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_address_id_address_fkey" FOREIGN KEY ("address_id_address") REFERENCES "address"("id_address") ON DELETE RESTRICT ON UPDATE CASCADE;
