/*
  Warnings:

  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Category` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `Community` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Community` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `Discussion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Discussion` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `communityId` on the `Discussion` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `authorId` on the `Discussion` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `userId` on the `Password` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `A` on the `_CategoryToDiscussion` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `B` on the `_CategoryToDiscussion` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `A` on the `_CommunityToUser` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `B` on the `_CommunityToUser` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/

-- DropForeignKey
ALTER TABLE "Discussion" DROP CONSTRAINT "Discussion_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Discussion" DROP CONSTRAINT "Discussion_communityId_fkey";

-- DropForeignKey
ALTER TABLE "Password" DROP CONSTRAINT "Password_userId_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToDiscussion" DROP CONSTRAINT "_CategoryToDiscussion_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToDiscussion" DROP CONSTRAINT "_CategoryToDiscussion_B_fkey";

-- DropForeignKey
ALTER TABLE "_CommunityToUser" DROP CONSTRAINT "_CommunityToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_CommunityToUser" DROP CONSTRAINT "_CommunityToUser_B_fkey";

-- AlterTable
ALTER TABLE "Category" DROP CONSTRAINT "Category_pkey",
ALTER COLUMN "id" TYPE INTEGER,
ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Community" DROP CONSTRAINT "Community_pkey",
ALTER COLUMN "id" TYPE INTEGER,
ADD CONSTRAINT "Community_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Discussion" DROP CONSTRAINT "Discussion_pkey",
ALTER COLUMN "id" TYPE INTEGER,
ALTER COLUMN "communityId" SET DATA TYPE INTEGER,
ALTER COLUMN "authorId" SET DATA TYPE INTEGER,
ADD CONSTRAINT "Discussion_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Password" ALTER COLUMN "userId" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" TYPE Integer,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "_CategoryToDiscussion" ALTER COLUMN "A" SET DATA TYPE INTEGER,
ALTER COLUMN "B" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "_CommunityToUser" ALTER COLUMN "A" SET DATA TYPE INTEGER,
ALTER COLUMN "B" SET DATA TYPE INTEGER;

-- AddForeignKey
ALTER TABLE "Discussion" ADD CONSTRAINT "Discussion_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discussion" ADD CONSTRAINT "Discussion_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Password" ADD CONSTRAINT "Password_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommunityToUser" ADD FOREIGN KEY ("A") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommunityToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToDiscussion" ADD FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToDiscussion" ADD FOREIGN KEY ("B") REFERENCES "Discussion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
