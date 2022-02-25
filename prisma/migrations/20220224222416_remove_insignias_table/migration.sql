/*
  Warnings:

  - You are about to drop the `insignias` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "insignias" DROP CONSTRAINT "insignias_customerId_fkey";

-- DropTable
DROP TABLE "insignias";
