-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_address_id_address_fkey";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "address_id_address" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_address_id_address_fkey" FOREIGN KEY ("address_id_address") REFERENCES "address"("id_address") ON DELETE SET NULL ON UPDATE CASCADE;
