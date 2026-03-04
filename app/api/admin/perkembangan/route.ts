import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const STORAGE_DIR =
  process.env.NODE_ENV === "development"
    ? path.join(process.cwd(), "public", "perkembangan")
    : "/var/www/storage/perkembangan";

const PUBLIC_URL_PREFIX =
  process.env.NODE_ENV === "development"
    ? "/perkembangan"
    : "https://dev-atis-landingpage.atisisbada.id/perkembangan";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("image") as File | null;
    const judul = formData.get("judul") as string | null;
    const text = formData.get("text") as string | null;

    if (!file || !file.type.startsWith("image/")) {
      return NextResponse.json(
        { message: "Gambar background wajib diunggah" },
        { status: 400 }
      );
    }

    if (!judul || !text) {
      return NextResponse.json(
        { message: "Judul dan teks wajib diisi" },
        { status: 400 }
      );
    }

    if (!fs.existsSync(STORAGE_DIR)) {
      fs.mkdirSync(STORAGE_DIR, { recursive: true });
    }

    const ext = path.extname(file.name);
    const filename = `${crypto.randomUUID()}${ext}`;
    const filepath = path.join(STORAGE_DIR, filename);

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filepath, buffer);

    const data = await prisma.perkembangan.create({
      data: {
        judul,
        text,
        tahun: Number(formData.get("tahun")) || null,
        background_url: `${PUBLIC_URL_PREFIX}/${filename}`,
        status: formData.get("status") !== "false",
      },
    });

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/perkembangan error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}