-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('TODO', 'IN_PROGRESS', 'DONE', 'CLOSE');

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "status" "ProjectStatus" NOT NULL DEFAULT 'TODO';
