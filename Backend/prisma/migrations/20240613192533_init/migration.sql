/*
  Warnings:

  - Added the required column `thumbnail` to the `restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "restaurant" ADD COLUMN     "thumbnail" TEXT NOT NULL;
