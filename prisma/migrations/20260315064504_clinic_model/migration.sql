-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'INACTIVE', 'PENDING');

-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('OWNER', 'ADMIN', 'RECEPTIONIST', 'PATIENT');

-- CreateTable
CREATE TABLE "Clinic" (
    "uid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "address" TEXT,
    "contact" TEXT,
    "email" TEXT,
    "type" TEXT,
    "clinicBanner" TEXT,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Clinic_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "ClinicService" (
    "uid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clinicUid" TEXT NOT NULL,

    CONSTRAINT "ClinicService_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "ClinicFacility" (
    "uid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clinicUid" TEXT NOT NULL,

    CONSTRAINT "ClinicFacility_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "ClinicWorkingHour" (
    "uid" TEXT NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "openTime" TEXT NOT NULL,
    "closeTime" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clinicUid" TEXT NOT NULL,

    CONSTRAINT "ClinicWorkingHour_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "ClinicUser" (
    "uid" TEXT NOT NULL,
    "role" "Roles" NOT NULL DEFAULT 'PATIENT',
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clinicUid" TEXT NOT NULL,
    "userUid" TEXT NOT NULL,

    CONSTRAINT "ClinicUser_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Clinic_name_key" ON "Clinic"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Clinic_slug_key" ON "Clinic"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Clinic_email_key" ON "Clinic"("email");

-- AddForeignKey
ALTER TABLE "ClinicService" ADD CONSTRAINT "ClinicService_clinicUid_fkey" FOREIGN KEY ("clinicUid") REFERENCES "Clinic"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClinicFacility" ADD CONSTRAINT "ClinicFacility_clinicUid_fkey" FOREIGN KEY ("clinicUid") REFERENCES "Clinic"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClinicWorkingHour" ADD CONSTRAINT "ClinicWorkingHour_clinicUid_fkey" FOREIGN KEY ("clinicUid") REFERENCES "Clinic"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClinicUser" ADD CONSTRAINT "ClinicUser_clinicUid_fkey" FOREIGN KEY ("clinicUid") REFERENCES "Clinic"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClinicUser" ADD CONSTRAINT "ClinicUser_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
