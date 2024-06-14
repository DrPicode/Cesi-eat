/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Is_At` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Lives_At` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order_Status` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Restaurant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Restaurant_Type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User_` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `delivery` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('Client', 'Cooker', 'DeliveryMan');

-- CreateEnum
CREATE TYPE "RestaurantType" AS ENUM ('Restaurant', 'FastFood', 'FoodTruck', 'Asian', 'Poke', 'Salad');

-- CreateEnum
CREATE TYPE "ArticleType" AS ENUM ('Entry', 'MainCourse', 'SideDish', 'Dessert', 'Drink');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('Paid', 'Preparing', 'Delivering', 'Delivered', 'Cancelled');

-- DropForeignKey
ALTER TABLE "Is_At" DROP CONSTRAINT "Is_At_Id_Address_fkey";

-- DropForeignKey
ALTER TABLE "Is_At" DROP CONSTRAINT "Is_At_Id_Restaurant_fkey";

-- DropForeignKey
ALTER TABLE "Lives_At" DROP CONSTRAINT "Lives_At_Id_Address_fkey";

-- DropForeignKey
ALTER TABLE "Lives_At" DROP CONSTRAINT "Lives_At_Id_User_fkey";

-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_Id_Address_fkey";

-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_Id_Order_Status_fkey";

-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_Id_Restaurant_fkey";

-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_Id_User_fkey";

-- DropForeignKey
ALTER TABLE "Restaurant" DROP CONSTRAINT "Restaurant_Id_Type_fkey";

-- DropForeignKey
ALTER TABLE "Restaurant" DROP CONSTRAINT "Restaurant_Id_User_fkey";

-- DropForeignKey
ALTER TABLE "delivery" DROP CONSTRAINT "delivery_Id_User_fkey";

-- DropForeignKey
ALTER TABLE "delivery" DROP CONSTRAINT "delivery_Order_ID_fkey";

-- DropTable
DROP TABLE "Address";

-- DropTable
DROP TABLE "Is_At";

-- DropTable
DROP TABLE "Lives_At";

-- DropTable
DROP TABLE "Order_Status";

-- DropTable
DROP TABLE "Orders";

-- DropTable
DROP TABLE "Restaurant";

-- DropTable
DROP TABLE "Restaurant_Type";

-- DropTable
DROP TABLE "User_";

-- DropTable
DROP TABLE "delivery";

-- CreateTable
CREATE TABLE "user" (
    "id_user" SERIAL NOT NULL,
    "lastname" TEXT NOT NULL,
    "password" TEXT,
    "email" TEXT,
    "firstname" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "status" TEXT,
    "is_deleted" BOOLEAN NOT NULL,
    "type" "UserType" NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "restaurant" (
    "id_restaurant" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "is_deleted" BOOLEAN NOT NULL,
    "type" "RestaurantType" NOT NULL,
    "user_id_user" INTEGER NOT NULL,

    CONSTRAINT "restaurant_pkey" PRIMARY KEY ("id_restaurant")
);

-- CreateTable
CREATE TABLE "article" (
    "id_article" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "is_deleted" BOOLEAN NOT NULL,
    "type" "ArticleType" NOT NULL,
    "restaurant_id_restaurant" INTEGER NOT NULL,
    "cart_id_cart" INTEGER NOT NULL,

    CONSTRAINT "article_pkey" PRIMARY KEY ("id_article")
);

-- CreateTable
CREATE TABLE "address" (
    "id_address" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "is_deleted" BOOLEAN NOT NULL,
    "user_id_user" INTEGER NOT NULL,
    "restaurant_id_restaurant" INTEGER NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id_address")
);

-- CreateTable
CREATE TABLE "cart" (
    "id_cart" SERIAL NOT NULL,
    "is_deleted" BOOLEAN NOT NULL,
    "user_id_user" INTEGER NOT NULL,
    "order_id_order" INTEGER NOT NULL,

    CONSTRAINT "cart_pkey" PRIMARY KEY ("id_cart")
);

-- CreateTable
CREATE TABLE "order" (
    "id_order" SERIAL NOT NULL,
    "is_deleted" BOOLEAN NOT NULL,
    "status" "OrderStatus" NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id_order")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "restaurant_user_id_user_key" ON "restaurant"("user_id_user");

-- CreateIndex
CREATE UNIQUE INDEX "address_restaurant_id_restaurant_key" ON "address"("restaurant_id_restaurant");

-- CreateIndex
CREATE UNIQUE INDEX "cart_order_id_order_key" ON "cart"("order_id_order");

-- AddForeignKey
ALTER TABLE "restaurant" ADD CONSTRAINT "restaurant_user_id_user_fkey" FOREIGN KEY ("user_id_user") REFERENCES "user"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article" ADD CONSTRAINT "article_restaurant_id_restaurant_fkey" FOREIGN KEY ("restaurant_id_restaurant") REFERENCES "restaurant"("id_restaurant") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article" ADD CONSTRAINT "article_cart_id_cart_fkey" FOREIGN KEY ("cart_id_cart") REFERENCES "cart"("id_cart") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_user_id_user_fkey" FOREIGN KEY ("user_id_user") REFERENCES "user"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_restaurant_id_restaurant_fkey" FOREIGN KEY ("restaurant_id_restaurant") REFERENCES "restaurant"("id_restaurant") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_user_id_user_fkey" FOREIGN KEY ("user_id_user") REFERENCES "user"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_order_id_order_fkey" FOREIGN KEY ("order_id_order") REFERENCES "order"("id_order") ON DELETE RESTRICT ON UPDATE CASCADE;
