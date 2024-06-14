-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_restaurant_id_restaurant_fkey";

-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_user_id_user_fkey";

-- AlterTable
ALTER TABLE "address" ALTER COLUMN "user_id_user" DROP NOT NULL,
ALTER COLUMN "restaurant_id_restaurant" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_user_id_user_fkey" FOREIGN KEY ("user_id_user") REFERENCES "user"("id_user") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_restaurant_id_restaurant_fkey" FOREIGN KEY ("restaurant_id_restaurant") REFERENCES "restaurant"("id_restaurant") ON DELETE SET NULL ON UPDATE CASCADE;
