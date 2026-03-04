-- CreateTable
CREATE TABLE "Pengembang" (
    "id" TEXT NOT NULL,
    "nomor_urut" INTEGER,
    "nama" VARCHAR(255) NOT NULL,
    "jabatan" VARCHAR(255) NOT NULL,
    "img_url" VARCHAR(255) NOT NULL,
    "status" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Pengembang_pkey" PRIMARY KEY ("id")
);
