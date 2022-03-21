/*
  Warnings:

  - Made the column `code` on table `event_categories` required. This step will fail if there are existing NULL values in that column.
  - Made the column `code` on table `location_categories` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "event_categories" ALTER COLUMN "code" SET NOT NULL;

-- AlterTable
ALTER TABLE "location_categories" ALTER COLUMN "code" SET NOT NULL;
