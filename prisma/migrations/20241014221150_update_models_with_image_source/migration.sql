/*
  Warnings:

  - You are about to drop the column `dates` on the `CoachingCareer` table. All the data in the column will be lost.
  - You are about to drop the column `dates` on the `PlayerCareer` table. All the data in the column will be lost.
  - Added the required column `date` to the `CoachingCareer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageSource` to the `CoachingCareer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `EarlyLife` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageSource` to the `EarlyLife` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `PlayerCareer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageSource` to the `PlayerCareer` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ImageSource" AS ENUM ('URL', 'UPLOAD');

-- AlterTable
ALTER TABLE "CoachingCareer" DROP COLUMN "dates",
ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "imageData" BYTEA,
ADD COLUMN     "imageSource" "ImageSource" NOT NULL,
ADD COLUMN     "imageType" TEXT,
ALTER COLUMN "image" DROP NOT NULL;

-- AlterTable
ALTER TABLE "EarlyLife" ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "imageSource" "ImageSource" NOT NULL;

-- AlterTable
ALTER TABLE "PlayerCareer" DROP COLUMN "dates",
ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "imageData" BYTEA,
ADD COLUMN     "imageSource" "ImageSource" NOT NULL,
ADD COLUMN     "imageType" TEXT,
ALTER COLUMN "image" DROP NOT NULL;
