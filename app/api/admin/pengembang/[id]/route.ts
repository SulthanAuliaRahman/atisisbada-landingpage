import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import fs from "fs";
import path from "path";

import crypto from "crypto";

const STORAGE_DIR =
  process.env.NODE_ENV === "development" ? path.join(process.cwd(), "public", "pengembang") : "/var/www/storage/pengembang";

const PUBLIC_URL_PREFIX =
  process.env.NODE_ENV === "development" ? "/pengembang" : "https://dev-atis-landingpage.atisisbada.id/pengembang";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const formData = await request.formData();

    const nama = formData.get("nama") as string;
    const jabatan = formData.get("jabatan") as string;
    const nomorUrut = Number(formData.get("nomor_urut"));
    const status = formData.get("status") !== "false";

    const newImage = formData.get("image") as File | null;

    const existing = await prisma.pengembang.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    let imgUrl = existing.img_url;

    if (newImage && newImage.size > 0) {
      if (!fs.existsSync(STORAGE_DIR)) {
        fs.mkdirSync(STORAGE_DIR, { recursive: true });
      }

      // delete old image
      const oldFilename = path.basename(existing.img_url);
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

      imgUrl = `${PUBLIC_URL_PREFIX}/${filename}`;
    }

    const data = await prisma.pengembang.update({
      where: { id },
      data: {
        nama,
        jabatan,
        nomor_urut: nomorUrut,
        status,
        img_url: imgUrl,
        updated_at: new Date(),
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("PUT /api/admin/pengembang/[id] error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const data = await prisma.pengembang.findUnique({ where: { id } });

    if (!data) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    const filename = path.basename(data.img_url);
    const filepath = path.join(STORAGE_DIR, filename);


    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    await prisma.pengembang.delete({ where: { id } });

    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    console.error("DELETE /api/admin/pengembang/[id] error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
