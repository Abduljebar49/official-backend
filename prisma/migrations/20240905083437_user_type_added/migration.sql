-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('ADMIN', 'STUDENT', 'INSTRUCTOR');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userType" "UserType" NOT NULL DEFAULT 'ADMIN';
