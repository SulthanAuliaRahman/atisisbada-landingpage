import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function POST(req: Request) {
  const formData = await req.formData();

  const file =
    (formData.get("file") as File) ||
    (formData.get("file[]") as File) ||
    (formData.get("files") as File) ||
    (formData.get("files[]") as File);
  console.log([...formData.entries()]);
  if (!file) {
    return NextResponse.json(
      { error: "File tidak ditemukan" },
      { status: 400 },
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const STORAGE_PATH =
    process.env.STORAGE_PATH || path.join(process.cwd(), "public");

  const detailItemDir = path.join(STORAGE_PATH, "detail-item");
  await fs.mkdir(detailItemDir, { recursive: true });

  const ext = path.extname(file.name);
  const filename = `${Date.now()}${ext}`;
  const filepath = path.join(detailItemDir, filename);

  await fs.writeFile(filepath, buffer);

  const url = `/detail-item/${filename}`;

  return NextResponse.json({
    data: [url],
  });
}
