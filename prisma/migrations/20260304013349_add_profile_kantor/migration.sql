-- CreateTable
CREATE TABLE "profile_kantor" (
    "id" TEXT NOT NULL,
    "Visi" TEXT NOT NULL,
    "Misi" TEXT NOT NULL,
    "Profile_text" TEXT NOT NULL,
    "Tentang_text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "profile_kantor_pkey" PRIMARY KEY ("id")
);
