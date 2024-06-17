-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_address_id_address_fkey";

-- AlterTable
ALTER TABLE "order" ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "address_id_address" DROP NOT NULL,
ALTER COLUMN "delivery_code" DROP NOT NULL,
ALTER COLUMN "delivery_hour" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_address_id_address_fkey" FOREIGN KEY ("address_id_address") REFERENCES "address"("id_address") ON DELETE SET NULL ON UPDATE CASCADE;
