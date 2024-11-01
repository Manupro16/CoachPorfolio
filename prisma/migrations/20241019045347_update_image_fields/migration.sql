/*
  Warnings:

  - You are about to drop the column `image` on the `CoachingCareer` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `PlayerCareer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CoachingCareer" DROP COLUMN "image",
ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "PlayerCareer" DROP COLUMN "image",
ADD COLUMN     "imageUrl" TEXT;
