import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function slugify(nama: string) {
  return nama
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function POST(req: Request) {
  const formData = await req.formData();

  const file = formData.get("image") as File | null;
  const nama = formData.get("nama") as string | null;
  const nomorUrut = formData.get("nomor_urut");
  const status = formData.get("status");

  if (!file || !file.type.startsWith("image/")) {
    return NextResponse.json({ message: "Image required" }, { status: 400 });
  }

  if (!nama) {
    return NextResponse.json({ message: "nama required" }, { status: 400 });
  }

  const uploadDir = path.join(process.cwd(), "public", "carousel");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

  const ext = path.extname(file.name);
  const slug = slugify(nama);
  const filename = `${slug}${ext}`;
  const filepath = path.join(uploadDir, filename);

  if (fs.existsSync(filepath)) {
    return NextResponse.json(
      { message: "Image nama already exists" },
      { status: 409 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(filepath, buffer);

  const slide = await prisma.homeCarousel.create({
    data: {
      nomor_urut: nomorUrut ? Number(nomorUrut) : null,
      url: `/carousel/${filename}`,
      alt: nama,
      status: status !== "false",
      created_at: new Date(),
      updated_at: new Date(),
    },
  });

  return NextResponse.json(slide, { status: 201 });
}
