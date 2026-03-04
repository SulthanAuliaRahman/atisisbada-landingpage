import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import fs from "fs";
import path from "path";

const STORAGE_DIR =
  process.env.NODE_ENV === "development" ? path.join(process.cwd(), "public", "pengembang") : "/var/www/storage/pengembang";

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

    const data = await prisma.pengembang.update({
      where: { id },
      data: {
        nama: body.nama,
        jabatan:body.jabatan,
        nomor_urut: Number(body.nomor_urut),
        status: Boolean(body.status),
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
