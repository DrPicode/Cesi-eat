/*
  Warnings:

  - You are about to drop the column `cart_id_cart` on the `article` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "article" DROP CONSTRAINT "article_cart_id_cart_fkey";

-- AlterTable
ALTER TABLE "article" DROP COLUMN "cart_id_cart";

-- CreateTable
CREATE TABLE "CartArticle" (
    "cartId" INTEGER NOT NULL,
    "articleId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "CartArticle_pkey" PRIMARY KEY ("cartId","articleId")
);

-- AddForeignKey
ALTER TABLE "CartArticle" ADD CONSTRAINT "CartArticle_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "cart"("id_cart") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartArticle" ADD CONSTRAINT "CartArticle_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "article"("id_article") ON DELETE RESTRICT ON UPDATE CASCADE;
