/*
  Warnings:

  - You are about to drop the `Permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PermissionToPermissionGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PermissionToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PermissionToPermissionGroup" DROP CONSTRAINT "_PermissionToPermissionGroup_A_fkey";

-- DropForeignKey
ALTER TABLE "_PermissionToPermissionGroup" DROP CONSTRAINT "_PermissionToPermissionGroup_B_fkey";

-- DropForeignKey
ALTER TABLE "_PermissionToUser" DROP CONSTRAINT "_PermissionToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_PermissionToUser" DROP CONSTRAINT "_PermissionToUser_B_fkey";

-- AlterTable
ALTER TABLE "PermissionGroup" ADD COLUMN     "permissions" TEXT[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "permissions" TEXT[];

-- DropTable
DROP TABLE "Permission";

-- DropTable
DROP TABLE "_PermissionToPermissionGroup";

-- DropTable
DROP TABLE "_PermissionToUser";
