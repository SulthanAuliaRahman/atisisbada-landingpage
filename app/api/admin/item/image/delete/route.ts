import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  const { url } = await req.json();

  if (!url || !url.startsWith("/detail-item/")) {
    return NextResponse.json({ error: "URL tidak valid" }, { status: 400 });
  }

  const STORAGE_PATH =
    process.env.STORAGE_PATH || path.join(process.cwd(), "public");

  const filePath = path.join(STORAGE_PATH, url);

  try {
    await fs.unlink(filePath);
  } catch {
    return NextResponse.json(
      { error: "File tidak ditemukan" },
      { status: 404 },
    );
  }

  return NextResponse.json({ success: true });
}
