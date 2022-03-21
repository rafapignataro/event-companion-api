-- DropForeignKey
ALTER TABLE "locations" DROP CONSTRAINT "locations_brandId_fkey";

-- AlterTable
ALTER TABLE "locations" ALTER COLUMN "brandId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE SET NULL ON UPDATE CASCADE;
