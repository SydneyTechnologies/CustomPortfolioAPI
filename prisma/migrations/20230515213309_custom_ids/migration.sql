/*
  Warnings:

  - The primary key for the `Articles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Projects` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `articleId` to the `Articles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Articles" DROP CONSTRAINT "Articles_pkey",
ADD COLUMN     "articleId" TEXT NOT NULL,
ADD CONSTRAINT "Articles_pkey" PRIMARY KEY ("articleId");

-- AlterTable
ALTER TABLE "Projects" DROP CONSTRAINT "Projects_pkey",
ADD COLUMN     "projectId" TEXT NOT NULL,
ADD CONSTRAINT "Projects_pkey" PRIMARY KEY ("projectId");
