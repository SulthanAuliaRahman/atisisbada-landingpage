import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  let body: any;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "JSON tidak valid" }, { status: 400 });
  }

  if (!body.data || !Array.isArray(body.data)) {
    return NextResponse.json(
      { message: "Data harus berupa array" },
      { status: 400 },
    );
  }

  const type = body.type;
  if (!["FITUR", "MODUL", "MITRA"].includes(type)) {
    return NextResponse.json({ message: "Type tidak valid" }, { status: 400 });
  }

  const errors: Record<number, Record<string, string>> = {};
  const isDev = process.env.NODE_ENV === "development";
  const UPLOAD_DIR = isDev
    ? path.join(process.cwd(), "public", type.toLowerCase())
    : `/var/www/storage/${type.toLowerCase()}`;

  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }

  const processedData: any[] = [];

  for (let i = 0; i < body.data.length; i++) {
    const f = body.data[i];
    const fieldErrors: Record<string, string> = {};

    if (!f.nama?.trim()) fieldErrors.nama = "Nama wajib diisi";
    if (!f.deskripsi?.trim()) fieldErrors.deskripsi = "Deskripsi wajib diisi";
    if (!f.ikon?.trim()) fieldErrors.ikon = "Ikon wajib diisi";

    if (Object.keys(fieldErrors).length) {
      errors[i] = fieldErrors;
      continue;
    }

    let ikonFileName = f.ikon;
    let ikonChanged = false;

    if (f.ikon.startsWith("data:image/")) {
      const matches = f.ikon.match(
        /^data:image\/([a-zA-Z0-9+.-]+);base64,(.+)$/,
      );

      if (!matches) {
        errors[i] = { ikon: "Format ikon tidak valid" };
        continue;
      }

      const ext = matches[1] === "svg+xml" ? "svg" : matches[1];
      if (!["png", "jpg", "jpeg", "svg"].includes(ext)) {
        errors[i] = { ikon: "Ekstensi tidak didukung" };
        continue;
      }

      const buffer = Buffer.from(matches[2], "base64");
      const fileName = `${Date.now()}-${i}.${ext}`;
      fs.writeFileSync(path.join(UPLOAD_DIR, fileName), buffer);

      ikonFileName = fileName;
      ikonChanged = true;
    } else {
      ikonFileName = path.basename(f.ikon);
    }

    processedData.push({
      id: f.id,
      nama: f.nama,
      deskripsi: f.deskripsi,
      ikon: ikonFileName,
      status: Boolean(f.status),
      urutan: i + 1,
      type,
      ikonChanged,
    });
  }

  if (Object.keys(errors).length) {
    return NextResponse.json(
      { message: "Validasi gagal", errors },
      { status: 400 },
    );
  }

  const existing = await prisma.item.findMany({
    where: { type },
    select: { id: true, ikon: true },
  });

  const existingMap = new Map(existing.map((i) => [i.id, i.ikon]));
  const incomingIds = processedData.filter((i) => i.id).map((i) => i.id);

  const toDelete = existing.filter((i) => !incomingIds.includes(i.id));

  for (const i of toDelete) {
    if (i.ikon) {
      const filePath = path.join(UPLOAD_DIR, i.ikon);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
  }

  await prisma.item.deleteMany({
    where: {
      type,
      id: { notIn: incomingIds },
    },
  });

  for (const f of processedData) {
    if (f.id) {
      const oldIcon = existingMap.get(f.id);

      if (f.ikonChanged && oldIcon && oldIcon !== f.ikon) {
        const filePath = path.join(UPLOAD_DIR, oldIcon);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }

      await prisma.item.update({
        where: { id: f.id },
        data: {
          nama: f.nama,
          deskripsi: f.deskripsi,
          ikon: f.ikon,
          urutan: f.urutan,
          status: f.status,
        },
      });
    } else {
      await prisma.item.create({
        data: {
          nama: f.nama,
          deskripsi: f.deskripsi,
          ikon: f.ikon,
          urutan: f.urutan,
          status: f.status,
          type,
        },
      });
    }
  }

  return NextResponse.json({ message: "Data berhasil disimpan" });
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const statusParam = searchParams.get("status");

    let status: boolean | undefined = undefined;
    if (statusParam === "true") status = true;
    if (statusParam === "false") status = false;

    const data = await prisma.item.findMany({
      where: {
        ...(type ? { type } : {}),
        ...(status !== undefined ? { status } : {}),
      },
      orderBy: [{ status: "desc" }, { urutan: "asc" }],
    });

    const iconPathMap: Record<string, string> = {
      FITUR: "fitur",
      MODUL: "modul",
      MITRA: "mitra",
    };

    const result = data.map((i) => ({
      ...i,
      ikon:
        i.ikon && iconPathMap[i.type]
          ? `/${iconPathMap[i.type]}/${i.ikon}`
          : null,
    }));

    return NextResponse.json({ data: result });
  } catch (error) {
    console.error("GET /api/admin/item error:", error);

    return NextResponse.json(
      {
        message: "Gagal ambil data item",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
