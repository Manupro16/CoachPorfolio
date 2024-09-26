-- CreateTable
CREATE TABLE "Story" (
    "id" SERIAL NOT NULL,
    "introduction" TEXT NOT NULL,
    "closingSection" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Story_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EarlyLife" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "storyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EarlyLife_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayingCareer" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "storyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlayingCareer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoachingCareer" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "storyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoachingCareer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "dates" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PlayingCareerTeams" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CoachingCareerTeams" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "EarlyLife_storyId_key" ON "EarlyLife"("storyId");

-- CreateIndex
CREATE UNIQUE INDEX "PlayingCareer_storyId_key" ON "PlayingCareer"("storyId");

-- CreateIndex
CREATE UNIQUE INDEX "CoachingCareer_storyId_key" ON "CoachingCareer"("storyId");

-- CreateIndex
CREATE UNIQUE INDEX "Team_name_key" ON "Team"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_PlayingCareerTeams_AB_unique" ON "_PlayingCareerTeams"("A", "B");

-- CreateIndex
CREATE INDEX "_PlayingCareerTeams_B_index" ON "_PlayingCareerTeams"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CoachingCareerTeams_AB_unique" ON "_CoachingCareerTeams"("A", "B");

-- CreateIndex
CREATE INDEX "_CoachingCareerTeams_B_index" ON "_CoachingCareerTeams"("B");

-- AddForeignKey
ALTER TABLE "EarlyLife" ADD CONSTRAINT "EarlyLife_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayingCareer" ADD CONSTRAINT "PlayingCareer_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoachingCareer" ADD CONSTRAINT "CoachingCareer_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayingCareerTeams" ADD CONSTRAINT "_PlayingCareerTeams_A_fkey" FOREIGN KEY ("A") REFERENCES "PlayingCareer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayingCareerTeams" ADD CONSTRAINT "_PlayingCareerTeams_B_fkey" FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoachingCareerTeams" ADD CONSTRAINT "_CoachingCareerTeams_A_fkey" FOREIGN KEY ("A") REFERENCES "CoachingCareer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoachingCareerTeams" ADD CONSTRAINT "_CoachingCareerTeams_B_fkey" FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
