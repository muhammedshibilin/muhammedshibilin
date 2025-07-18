-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "detailedDescription" TEXT,
    "technologies" TEXT[],
    "features" TEXT[],
    "challenges" TEXT,
    "solutions" TEXT,
    "liveUrl" TEXT,
    "githubUrl" TEXT,
    "imageUrl" TEXT,
    "role" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
