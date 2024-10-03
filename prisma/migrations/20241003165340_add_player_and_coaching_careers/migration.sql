-- CreateTable
CREATE TABLE "PlayerCareer" (
    "id" SERIAL NOT NULL,
    "team" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "dates" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "PlayerCareer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoachingCareer" (
    "id" SERIAL NOT NULL,
    "team" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "dates" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "CoachingCareer_pkey" PRIMARY KEY ("id")
);
