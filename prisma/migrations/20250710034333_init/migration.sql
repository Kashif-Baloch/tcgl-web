-- DropIndex
DROP INDEX "User_email_key";

-- DropIndex
DROP INDEX "User_selectedAddress_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "selectedLenders" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "termsAgreed" SET DEFAULT false,
ALTER COLUMN "claimsAgreed" SET DEFAULT false,
ALTER COLUMN "authoriseAgreed" SET DEFAULT false,
ALTER COLUMN "drivingLicenceFront" DROP NOT NULL,
ALTER COLUMN "drivingLicenceBack" DROP NOT NULL;
