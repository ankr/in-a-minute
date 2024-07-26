/*
  Warnings:

  - Added the required column `owner_id` to the `Properties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Properties" ADD COLUMN     "owner_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Properties" ADD CONSTRAINT "Properties_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Guests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
