-- DropForeignKey
ALTER TABLE "ClinicFacility" DROP CONSTRAINT "ClinicFacility_clinicUid_fkey";

-- DropForeignKey
ALTER TABLE "ClinicService" DROP CONSTRAINT "ClinicService_clinicUid_fkey";

-- DropForeignKey
ALTER TABLE "ClinicUser" DROP CONSTRAINT "ClinicUser_clinicUid_fkey";

-- DropForeignKey
ALTER TABLE "ClinicUser" DROP CONSTRAINT "ClinicUser_userUid_fkey";

-- DropForeignKey
ALTER TABLE "ClinicWorkingHour" DROP CONSTRAINT "ClinicWorkingHour_clinicUid_fkey";

-- AlterTable
ALTER TABLE "Clinic" ADD COLUMN     "website" TEXT;

-- AddForeignKey
ALTER TABLE "ClinicService" ADD CONSTRAINT "ClinicService_clinicUid_fkey" FOREIGN KEY ("clinicUid") REFERENCES "Clinic"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClinicFacility" ADD CONSTRAINT "ClinicFacility_clinicUid_fkey" FOREIGN KEY ("clinicUid") REFERENCES "Clinic"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClinicWorkingHour" ADD CONSTRAINT "ClinicWorkingHour_clinicUid_fkey" FOREIGN KEY ("clinicUid") REFERENCES "Clinic"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClinicUser" ADD CONSTRAINT "ClinicUser_clinicUid_fkey" FOREIGN KEY ("clinicUid") REFERENCES "Clinic"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClinicUser" ADD CONSTRAINT "ClinicUser_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
