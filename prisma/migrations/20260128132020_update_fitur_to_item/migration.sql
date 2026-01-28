/*
  Warnings:

  - You are about to drop the `fitur` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "fitur";

-- CreateTable
CREATE TABLE "item" (
    "id" TEXT NOT NULL,
    "urutan" INTEGER NOT NULL,
    "ikon" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "item_pkey" PRIMARY KEY ("id")
);
