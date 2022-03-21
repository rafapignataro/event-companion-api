/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `event_categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `location_categories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "event_categories_code_key" ON "event_categories"("code");

-- CreateIndex
CREATE UNIQUE INDEX "location_categories_code_key" ON "location_categories"("code");
