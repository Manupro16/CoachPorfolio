/*
  Warnings:

  - You are about to drop the column `content` on the `CoachingCareer` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `CoachingCareer` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `CoachingCareer` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `EarlyLife` table. All the data in the column will be lost.
  - You are about to drop the column `storyId` on the `EarlyLife` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `EarlyLife` table. All the data in the column will be lost.
  - You are about to drop the column `closingSection` on the `Story` table. All the data in the column will be lost.
  - You are about to drop the column `introduction` on the `Story` table. All the data in the column will be lost.
  - You are about to drop the `PlayingCareer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Team` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CoachingCareerTeams` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PlayingCareerTeams` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[earlyLifeId]` on the table `Story` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dates` to the `CoachingCareer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `CoachingCareer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `team` to the `CoachingCareer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `EarlyLife` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Story` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EarlyLife" DROP CONSTRAINT "EarlyLife_storyId_fkey";

-- DropForeignKey
ALTER TABLE "PlayingCareer" DROP CONSTRAINT "PlayingCareer_storyId_fkey";

-- DropForeignKey
ALTER TABLE "_CoachingCareerTeams" DROP CONSTRAINT "_CoachingCareerTeams_A_fkey";

-- DropForeignKey
ALTER TABLE "_CoachingCareerTeams" DROP CONSTRAINT "_CoachingCareerTeams_B_fkey";

-- DropForeignKey
ALTER TABLE "_PlayingCareerTeams" DROP CONSTRAINT "_PlayingCareerTeams_A_fkey";

-- DropForeignKey
ALTER TABLE "_PlayingCareerTeams" DROP CONSTRAINT "_PlayingCareerTeams_B_fkey";

-- DropIndex
DROP INDEX "CoachingCareer_storyId_key";

-- DropIndex
DROP INDEX "EarlyLife_storyId_key";

-- AlterTable
ALTER TABLE "CoachingCareer" DROP COLUMN "content",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "dates" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "team" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "EarlyLife" DROP COLUMN "createdAt",
DROP COLUMN "storyId",
DROP COLUMN "updatedAt",
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Story" DROP COLUMN "closingSection",
DROP COLUMN "introduction",
ADD COLUMN     "earlyLifeId" INTEGER,
ADD COLUMN     "title" TEXT NOT NULL;

-- DropTable
DROP TABLE "PlayingCareer";

-- DropTable
DROP TABLE "Team";

-- DropTable
DROP TABLE "_CoachingCareerTeams";

-- DropTable
DROP TABLE "_PlayingCareerTeams";

-- CreateTable
CREATE TABLE "PlayerCareer" (
    "id" SERIAL NOT NULL,
    "team" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "dates" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "storyId" INTEGER NOT NULL,

    CONSTRAINT "PlayerCareer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Story_earlyLifeId_key" ON "Story"("earlyLifeId");

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_earlyLifeId_fkey" FOREIGN KEY ("earlyLifeId") REFERENCES "EarlyLife"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerCareer" ADD CONSTRAINT "PlayerCareer_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
