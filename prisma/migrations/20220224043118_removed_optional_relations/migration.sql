/*
  Warnings:

  - You are about to drop the column `category` on the `events` table. All the data in the column will be lost.
  - Made the column `locationId` on table `activations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `festivalId` on table `admins` required. This step will fail if there are existing NULL values in that column.
  - Made the column `festivalId` on table `brands` required. This step will fail if there are existing NULL values in that column.
  - Made the column `eventCategoryId` on table `events` required. This step will fail if there are existing NULL values in that column.
  - Made the column `customerId` on table `friendships` required. This step will fail if there are existing NULL values in that column.
  - Made the column `friendId` on table `friendships` required. This step will fail if there are existing NULL values in that column.
  - Made the column `festivalId` on table `locations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `brandId` on table `locations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `locationCategoryId` on table `locations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `visitorId` on table `markers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `festivalId` on table `markers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `customerId` on table `visitors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `festivalId` on table `visitors` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "activations" DROP CONSTRAINT "activations_locationId_fkey";

-- DropForeignKey
ALTER TABLE "admins" DROP CONSTRAINT "admins_festivalId_fkey";

-- DropForeignKey
ALTER TABLE "brands" DROP CONSTRAINT "brands_festivalId_fkey";

-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_eventCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "friendships" DROP CONSTRAINT "friendships_customerId_fkey";

-- DropForeignKey
ALTER TABLE "friendships" DROP CONSTRAINT "friendships_friendId_fkey";

-- DropForeignKey
ALTER TABLE "locations" DROP CONSTRAINT "locations_brandId_fkey";

-- DropForeignKey
ALTER TABLE "locations" DROP CONSTRAINT "locations_festivalId_fkey";

-- DropForeignKey
ALTER TABLE "locations" DROP CONSTRAINT "locations_locationCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "markers" DROP CONSTRAINT "markers_festivalId_fkey";

-- DropForeignKey
ALTER TABLE "markers" DROP CONSTRAINT "markers_visitorId_fkey";

-- DropForeignKey
ALTER TABLE "visitors" DROP CONSTRAINT "visitors_customerId_fkey";

-- DropForeignKey
ALTER TABLE "visitors" DROP CONSTRAINT "visitors_festivalId_fkey";

-- AlterTable
ALTER TABLE "activations" ALTER COLUMN "locationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "admins" ALTER COLUMN "festivalId" SET NOT NULL;

-- AlterTable
ALTER TABLE "brands" ALTER COLUMN "festivalId" SET NOT NULL;

-- AlterTable
ALTER TABLE "events" DROP COLUMN "category",
ALTER COLUMN "logo_url" DROP NOT NULL,
ALTER COLUMN "eventCategoryId" SET NOT NULL;

-- AlterTable
ALTER TABLE "friendships" ALTER COLUMN "customerId" SET NOT NULL,
ALTER COLUMN "friendId" SET NOT NULL;

-- AlterTable
ALTER TABLE "locations" ALTER COLUMN "festivalId" SET NOT NULL,
ALTER COLUMN "brandId" SET NOT NULL,
ALTER COLUMN "locationCategoryId" SET NOT NULL;

-- AlterTable
ALTER TABLE "markers" ALTER COLUMN "visitorId" SET NOT NULL,
ALTER COLUMN "festivalId" SET NOT NULL;

-- AlterTable
ALTER TABLE "visitors" ALTER COLUMN "customerId" SET NOT NULL,
ALTER COLUMN "festivalId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_festivalId_fkey" FOREIGN KEY ("festivalId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brands" ADD CONSTRAINT "brands_festivalId_fkey" FOREIGN KEY ("festivalId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visitors" ADD CONSTRAINT "visitors_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visitors" ADD CONSTRAINT "visitors_festivalId_fkey" FOREIGN KEY ("festivalId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friendships" ADD CONSTRAINT "friendships_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friendships" ADD CONSTRAINT "friendships_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_eventCategoryId_fkey" FOREIGN KEY ("eventCategoryId") REFERENCES "event_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "markers" ADD CONSTRAINT "markers_visitorId_fkey" FOREIGN KEY ("visitorId") REFERENCES "visitors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "markers" ADD CONSTRAINT "markers_festivalId_fkey" FOREIGN KEY ("festivalId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_festivalId_fkey" FOREIGN KEY ("festivalId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_locationCategoryId_fkey" FOREIGN KEY ("locationCategoryId") REFERENCES "location_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activations" ADD CONSTRAINT "activations_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
