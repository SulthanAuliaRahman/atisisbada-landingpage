/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `profile_kantor` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "profile_kantor" ADD COLUMN     "key" TEXT NOT NULL DEFAULT 'MASTER_PROFILE';

-- CreateIndex
CREATE UNIQUE INDEX "profile_kantor_key_key" ON "profile_kantor"("key");
