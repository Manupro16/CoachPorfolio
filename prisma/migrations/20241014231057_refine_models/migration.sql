/*
  Warnings:

  - You are about to drop the column `description` on the `CoachingCareer` table. All the data in the column will be lost.
  - You are about to drop the column `team` on the `CoachingCareer` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `PlayerCareer` table. All the data in the column will be lost.
  - You are about to drop the column `team` on the `PlayerCareer` table. All the data in the column will be lost.
  - Added the required column `content` to the `CoachingCareer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `CoachingCareer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `PlayerCareer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `PlayerCareer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CoachingCareer" DROP COLUMN "description",
DROP COLUMN "team",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PlayerCareer" DROP COLUMN "description",
DROP COLUMN "team",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
