import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import fs from "fs";
import path from "path";

type Params = Promise<{ id: string }>;

export async function GET(req: Request, { params }: { params: Params }) {
  try {
    const { id } = await params;
    console.log(id);

    const item = await prisma.item.findUnique({
      where: { id },
    });

    if (!item) {
      return NextResponse.json(
        { message: "Item tidak ditemukan" },
        { status: 404 },
      );
    }

    const BASE_DIR =
      process.env.STORAGE_PATH || path.join(process.cwd(), "public");
    let iconUrl: string | null = null;

    if (item.ikon) {
      const folderPath = path.join(BASE_DIR, item.ikon);
      const exts = ["png", "svg", "jpg", "jpeg"];

      for (const ext of exts) {
        const filePath = path.join(folderPath, `icon.${ext}`);
        if (fs.existsSync(filePath)) {
          iconUrl = `/${item.ikon}/icon.${ext}`;
          break;
        }
      }
    }

    const result = {
      ...item,
      ikon: iconUrl,
    };

    return NextResponse.json({ data: result });
  } catch (error) {
    console.error("GET /api/admin/item/[id] error:", error);
    return NextResponse.json(
      {
        message: "Gagal ambil data item",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
