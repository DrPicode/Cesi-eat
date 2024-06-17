-- DropForeignKey
ALTER TABLE "cart" DROP CONSTRAINT "cart_order_id_order_fkey";

-- AlterTable
ALTER TABLE "cart" ALTER COLUMN "order_id_order" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_order_id_order_fkey" FOREIGN KEY ("order_id_order") REFERENCES "order"("id_order") ON DELETE SET NULL ON UPDATE CASCADE;
