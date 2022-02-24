/*
  Warnings:

  - You are about to drop the column `logo_url` on the `events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "logo_url",
ADD COLUMN     "logoURL" VARCHAR(255);
