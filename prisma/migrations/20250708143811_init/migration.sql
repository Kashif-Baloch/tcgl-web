-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "selectedAddress" TEXT NOT NULL,
    "prefix" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "selectedLenders" TEXT[],
    "signature" TEXT NOT NULL,
    "termsAgreed" BOOLEAN NOT NULL,
    "claimsAgreed" BOOLEAN NOT NULL,
    "authoriseAgreed" BOOLEAN NOT NULL,
    "otp" TEXT NOT NULL,
    "drivingLicenceFront" TEXT NOT NULL,
    "drivingLicenceBack" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_selectedAddress_key" ON "User"("selectedAddress");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
