/*
  Warnings:

  - You are about to drop the column `user_id_user` on the `address` table. All the data in the column will be lost.
  - Added the required column `address_id_address` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `delivery_code` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `delivery_hour` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_id_address` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_user_id_user_fkey";

-- AlterTable
ALTER TABLE "address" DROP COLUMN "user_id_user";

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "address_id_address" INTEGER NOT NULL,
ADD COLUMN     "delivery_code" INTEGER NOT NULL,
ADD COLUMN     "delivery_fees" DOUBLE PRECISION,
ADD COLUMN     "delivery_hour" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "service_fees" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "address_id_address" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_address_id_address_fkey" FOREIGN KEY ("address_id_address") REFERENCES "address"("id_address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_address_id_address_fkey" FOREIGN KEY ("address_id_address") REFERENCES "address"("id_address") ON DELETE RESTRICT ON UPDATE CASCADE;
