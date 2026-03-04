-- CreateTable
CREATE TABLE "Perkembangan" (
    "id" TEXT NOT NULL,
    "tahun" INTEGER,
    "judul" VARCHAR(255) NOT NULL,
    "text" VARCHAR(255) NOT NULL,
    "background_url" VARCHAR(255) NOT NULL,
    "status" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Perkembangan_pkey" PRIMARY KEY ("id")
);
