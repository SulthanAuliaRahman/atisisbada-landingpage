-- CreateTable
CREATE TABLE "fitur" (
    "id" TEXT NOT NULL,
    "urutan" INTEGER NOT NULL,
    "ikon" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fitur_pkey" PRIMARY KEY ("id")
);
