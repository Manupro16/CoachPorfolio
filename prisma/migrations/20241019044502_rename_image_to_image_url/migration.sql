/*
  Warnings:

  - You are about to drop the column `image` on the `EarlyLife` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EarlyLife" DROP COLUMN "image",
ADD COLUMN     "imageUrl" TEXT;
