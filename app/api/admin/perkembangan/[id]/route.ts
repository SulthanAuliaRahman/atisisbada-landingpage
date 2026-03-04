import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import fs from "fs";
import path from "path";

const STORAGE_DIR =
  process.env.NODE_ENV === "development"
    ? path.join(process.cwd(), "public", "perkembangan")
    : "/var/www/storage/perkembangan";

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

    const data = await prisma.perkembangan.update({
      where: { id },
      data: {
        judul: body.judul,
        text: body.text,
        tahun: Number(body.tahun),
        status: Boolean(body.status),
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