-- CreateTable
CREATE TABLE "User" (
    "name" TEXT NOT NULL,
    "email" TEXT,
    "bio" TEXT,
    "twitter" TEXT,
    "linkedin" TEXT,
    "github" TEXT,
    "technologies" TEXT[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Projects" (
    "name" TEXT NOT NULL,
    "description" TEXT,
    "technologies_used" TEXT[],
    "github_link" TEXT,
    "live_link" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Articles" (
    "title" TEXT NOT NULL,
    "short_description" TEXT,
    "live_link" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Articles_pkey" PRIMARY KEY ("title")
);

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Articles" ADD CONSTRAINT "Articles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
