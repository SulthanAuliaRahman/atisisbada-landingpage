import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import fs from "fs";
import path from "path";

const STORAGE_DIR =
  process.env.NODE_ENV === "development" ? path.join(process.cwd(), "public", "carousel") : "/var/www/storage/carousel";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "Missing id param" },
        { status: 400 }
      );
    }

    if (!body.alt) {
      return NextResponse.json(
        { message: "alt is required" },
        { status: 400 }
      );
    }

    const slide = await prisma.homeCarousel.update({
      where: { id },
      data: {
        nomor_urut: Number(body.nomor_urut),
        alt: body.alt,
        status: Boolean(body.status),
        updated_at: new Date(),
      },
    });

    return NextResponse.json(slide);
  } catch (error) {
    console.error("PUT /api/admin/profile/[id] error:", error);
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

    const slide = await prisma.homeCarousel.findUnique({
      where: { id },
    });

    if (!slide) {
      return NextResponse.json(
        { message: "Not found" },
        { status: 404 }
      );
    }

    const filename = path.basename(slide.url);
    const filepath = path.join(STORAGE_DIR, filename);

    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    await prisma.homeCarousel.delete({ where: { id } });

    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    console.error("DELETE /api/admin/profile/[id] error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
