/*
  Warnings:

  - Changed the type of `userId` on the `Link` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `groupId` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupId` to the `RequestBid` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Link" DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "groupId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "RequestBid" ADD COLUMN     "groupId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
