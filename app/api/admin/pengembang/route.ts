import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const STORAGE_DIR =
  process.env.NODE_ENV === "development"
    ? path.join(process.cwd(), "public", "pengembang") : "/var/www/storage/pengembang";

const PUBLIC_URL_PREFIX =
  process.env.NODE_ENV === "development"
    ? "/pengembang" : "https://dev-atis-landingpage.atisisbada.id/pengembang";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("image") as File | null;
    const nama = formData.get("nama") as string | null;
    const jabatan = formData.get("jabatan") as string | null;

    if (!file || !file.type.startsWith("image/")) {
      return NextResponse.json(
        { message: "Image required" },
        { status: 400 }
      );
    }

    if (!nama || !jabatan) {
      return NextResponse.json(
        { message: "Nama & Jabatan required" },
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

    const data = await prisma.pengembang.create({
      data: {
        nama,
        jabatan,
        nomor_urut: Number(formData.get("nomor_urut")) || null,
        img_url: `${PUBLIC_URL_PREFIX}/${filename}`,
        status: formData.get("status") !== "false",
      },
    });

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/pengembang error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
