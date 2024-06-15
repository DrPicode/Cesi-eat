-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('Client', 'Cooker', 'DeliveryMan');

-- CreateEnum
CREATE TYPE "RestaurantType" AS ENUM ('Restaurant', 'FastFood', 'FoodTruck', 'Asian', 'Poke', 'Salad');

-- CreateEnum
CREATE TYPE "ArticleType" AS ENUM ('Entry', 'MainCourse', 'SideDish', 'Dessert', 'Drink');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('Paid', 'Preparing', 'Delivering', 'Delivered', 'Cancelled');

-- CreateTable
CREATE TABLE "user" (
    "id_user" SERIAL NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT,
    "email" TEXT,
    "firstName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "type" "UserType" NOT NULL DEFAULT 'Client',
    "address_id_address" INTEGER NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "restaurant" (
    "id_restaurant" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
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

    CONSTRAINT "article_pkey" PRIMARY KEY ("id_article")
);

-- CreateTable
CREATE TABLE "address" (
    "id_address" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "is_deleted" BOOLEAN NOT NULL,
    "restaurant_id_restaurant" INTEGER,

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
CREATE TABLE "CartArticle" (
    "cartId" INTEGER NOT NULL,
    "articleId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "CartArticle_pkey" PRIMARY KEY ("cartId","articleId")
);

-- CreateTable
CREATE TABLE "order" (
    "id_order" SERIAL NOT NULL,
    "is_deleted" BOOLEAN NOT NULL,
    "delivery_hour" TIMESTAMP(3) NOT NULL,
    "delivery_code" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "delivery_fees" DOUBLE PRECISION,
    "service_fees" DOUBLE PRECISION,
    "address_id_address" INTEGER NOT NULL,
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
ALTER TABLE "user" ADD CONSTRAINT "user_address_id_address_fkey" FOREIGN KEY ("address_id_address") REFERENCES "address"("id_address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurant" ADD CONSTRAINT "restaurant_user_id_user_fkey" FOREIGN KEY ("user_id_user") REFERENCES "user"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article" ADD CONSTRAINT "article_restaurant_id_restaurant_fkey" FOREIGN KEY ("restaurant_id_restaurant") REFERENCES "restaurant"("id_restaurant") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_restaurant_id_restaurant_fkey" FOREIGN KEY ("restaurant_id_restaurant") REFERENCES "restaurant"("id_restaurant") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_user_id_user_fkey" FOREIGN KEY ("user_id_user") REFERENCES "user"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_order_id_order_fkey" FOREIGN KEY ("order_id_order") REFERENCES "order"("id_order") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartArticle" ADD CONSTRAINT "CartArticle_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "cart"("id_cart") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartArticle" ADD CONSTRAINT "CartArticle_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "article"("id_article") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_address_id_address_fkey" FOREIGN KEY ("address_id_address") REFERENCES "address"("id_address") ON DELETE RESTRICT ON UPDATE CASCADE;
