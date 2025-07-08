/*
  Warnings:

  - Changed the type of `drivingLicenceFront` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `drivingLicenceBack` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "drivingLicenceFront",
ADD COLUMN     "drivingLicenceFront" JSONB NOT NULL,
DROP COLUMN "drivingLicenceBack",
ADD COLUMN     "drivingLicenceBack" JSONB NOT NULL;
