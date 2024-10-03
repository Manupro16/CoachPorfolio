/*
  Warnings:

  - You are about to drop the `CoachingCareer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlayerCareer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Story` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CoachingCareer" DROP CONSTRAINT "CoachingCareer_storyId_fkey";

-- DropForeignKey
ALTER TABLE "PlayerCareer" DROP CONSTRAINT "PlayerCareer_storyId_fkey";

-- DropForeignKey
ALTER TABLE "Story" DROP CONSTRAINT "Story_earlyLifeId_fkey";

-- DropTable
DROP TABLE "CoachingCareer";

-- DropTable
DROP TABLE "PlayerCareer";

-- DropTable
DROP TABLE "Story";
