-- AlterTable
ALTER TABLE "berita" ALTER COLUMN "status" SET DEFAULT false;

-- AlterTable
ALTER TABLE "faq" ALTER COLUMN "status" SET DEFAULT false;

-- CreateTable
CREATE TABLE "Instagram" (
    "id" TEXT NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "deskripsi" VARCHAR(255) NOT NULL,
    "nomor_urut" INTEGER,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Instagram_pkey" PRIMARY KEY ("id")
);
