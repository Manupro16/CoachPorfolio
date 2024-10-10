-- AlterTable
ALTER TABLE "EarlyLife" ADD COLUMN     "imageData" BYTEA,
ADD COLUMN     "imageType" TEXT,
ALTER COLUMN "image" DROP NOT NULL;
