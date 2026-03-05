import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const STORAGE_DIR =
  process.env.NODE_ENV === "development"
    ? path.join(process.cwd(), "public", "perkembangan") : "/var/www/storage/perkembangan";


const PUBLIC_URL_PREFIX =
  process.env.NODE_ENV === "development"
    ? "/perkembangan" : "https://dev-atis-landingpage.atisisbada.id/perkembangan";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const formData = await request.formData();

    const judul = formData.get("judul") as string;
    const text = formData.get("text") as string;
    const tahun = Number(formData.get("tahun"));
    const status = formData.get("status") !== "false";

    const newImage = formData.get("image") as File | null;

    const existing = await prisma.perkembangan.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    let backgroundUrl = existing.background_url;

    if (newImage && newImage.size > 0) {
      if (!fs.existsSync(STORAGE_DIR)) {
        fs.mkdirSync(STORAGE_DIR, { recursive: true });
      }

      // delete old image
      const oldFilename = path.basename(existing.background_url);
      const oldPath = path.join(STORAGE_DIR, oldFilename);

      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }

      // save new image
      const ext = path.extname(newImage.name);
      const filename = `${crypto.randomUUID()}${ext}`;
      const filepath = path.join(STORAGE_DIR, filename);

      const buffer = Buffer.from(await newImage.arrayBuffer());
      fs.writeFileSync(filepath, buffer);

      backgroundUrl = `${PUBLIC_URL_PREFIX}/${filename}`;
    }

    const data = await prisma.perkembangan.update({
      where: { id },
      data: {
        judul,
        text,
        tahun,
        status,
        background_url: backgroundUrl,
        updated_at: new Date(),
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("PUT /api/admin/perkembangan/[id] error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existing = await prisma.perkembangan.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    // Delete old background file if exists
    const filename = path.basename(existing.background_url);
    const filepath = path.join(STORAGE_DIR, filename);

    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    await prisma.perkembangan.delete({ where: { id } });

    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    console.error("DELETE /api/admin/perkembangan/[id] error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}