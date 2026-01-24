import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const STORAGE_DIR =
  process.env.NODE_ENV === "development"
    ? path.join(process.cwd(), "public", "carousel")
    : "/var/www/storage/carousel";

const PUBLIC_URL_PREFIX =
  process.env.NODE_ENV === "development"
    ? "/carousel"
    : "/storage/carousel";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("image") as File | null;
    const nama = formData.get("nama") as string | null;

    if (!file || !file.type.startsWith("image/")) {
      return NextResponse.json(
        { message: "Image required" },
        { status: 400 }
      );
    }

    if (!nama) {
      return NextResponse.json(
        { message: "nama required" },
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

    const slide = await prisma.homeCarousel.create({
      data: {
        nomor_urut: Number(formData.get("nomor_urut")) || null,
        url: `${PUBLIC_URL_PREFIX}/${filename}`,
        alt: nama,
        status: formData.get("status") !== "false",
      },
    });

    return NextResponse.json(slide, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/profile error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
