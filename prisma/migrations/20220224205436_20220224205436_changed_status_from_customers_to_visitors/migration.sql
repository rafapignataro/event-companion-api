/*
  Warnings:

  - You are about to drop the column `status` on the `customers` table. All the data in the column will be lost.
  - Added the required column `status` to the `visitors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customers" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "visitors" ADD COLUMN     "status" VARCHAR(255) NOT NULL;
