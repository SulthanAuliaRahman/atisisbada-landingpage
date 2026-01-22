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
      { message: "Data harus berupa array fitur" },
      { status: 400 },
    );
  }
  const errors: Record<number, Record<string, string>> = {};
  const isDev = process.env.NODE_ENV === "development";
  const UPLOAD_DIR = isDev
    ? path.join(process.cwd(), "public", "fitur")
    : "/var/www/storage/fitur";
  if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  const processedData: any[] = [];

  for (let i = 0; i < body.data.length; i++) {
    const f = body.data[i];
    const fieldErrors: Record<string, string> = {};
    if (!f.nama?.trim()) fieldErrors.nama = "Nama wajib diisi";
    if (!f.deskripsi?.trim()) fieldErrors.deskripsi = "Deskripsi wajib diisi";
    if (!f.ikon?.trim()) fieldErrors.ikon = "Ikon wajib diisi";
    if (Object.keys(fieldErrors).length > 0) {
      errors[i] = fieldErrors;
      continue;
    }
    let ikonFileName = f.ikon;

    if (f.ikon.startsWith("data:image/")) {
      const matches = f.ikon.match(
        /^data:image\/([a-zA-Z0-9\+\-]+);base64,(.+)$/,
      );
      if (!matches) {
        errors[i] = { ikon: "Format ikon tidak valid" };
        continue;
      }
      let ext = matches[1] === "svg+xml" ? "svg" : matches[1];
      if (!["png", "jpg", "jpeg", "svg"].includes(ext)) {
        errors[i] = { ikon: "Hanya PNG, JPG, JPEG, SVG" };
        continue;
      }
      const buffer = Buffer.from(matches[2], "base64");
      const fileName = `${Date.now()}-${i}.${ext}`;
      fs.writeFileSync(path.join(UPLOAD_DIR, fileName), buffer);
      ikonFileName = fileName;
    } else {
      ikonFileName = f.ikon.replace(/^\/fitur\//, "");
    }

    processedData.push({
      ...f,
      ikon: ikonFileName,
      urutan: i + 1,
    });
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { message: "Validasi gagal", errors },
      { status: 400 },
    );
  }

  const dbFitur = await prisma.$queryRawUnsafe<
    { id: string; ikon: string | null }[]
  >(`SELECT id, ikon FROM fitur`);

  const dbIds = dbFitur.map((f) => f.id);
  const reqIds = processedData.filter((f) => f.id).map((f) => f.id);
  const idsToDelete = dbIds.filter((id) => !reqIds.includes(id));

  if (idsToDelete.length > 0) {
    const fiturToDelete = dbFitur.filter((f) => idsToDelete.includes(f.id));
    for (const f of fiturToDelete) {
      if (f.ikon) {
        const filePath = path.join(UPLOAD_DIR, f.ikon);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }
    }
    await prisma.$executeRawUnsafe(
      `DELETE FROM fitur WHERE id IN (${idsToDelete.map((id) => `'${id}'`).join(",")})`,
    );
  }

  const ikonMap = new Map(dbFitur.map((f) => [f.id, f.ikon]));

  for (const f of processedData) {
    if (f.id) {
      const ikonLama = ikonMap.get(f.id);

      if (
        ikonLama &&
        ikonLama !== f.ikon &&
        body.data
          .find((d: any) => d.id === f.id)
          ?.ikon?.startsWith("data:image/")
      ) {
        const filePath = path.join(UPLOAD_DIR, ikonLama);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }

      const nama = f.nama.replace(/'/g, "''");
      const deskripsi = f.deskripsi.replace(/'/g, "''");
      const ikon = f.ikon.replace(/'/g, "''");

      await prisma.$executeRawUnsafe(`
        UPDATE fitur
        SET
          nama='${nama}',
          deskripsi='${deskripsi}',
          ikon='${ikon}',
          urutan=${f.urutan},
          status=${f.status},
          updated_at=NOW()
        WHERE id='${f.id}'
      `);
    } else {
      const nama = f.nama.replace(/'/g, "''");
      const deskripsi = f.deskripsi.replace(/'/g, "''");
      const ikon = f.ikon.replace(/'/g, "''");

      await prisma.$executeRawUnsafe(`
        INSERT INTO fitur (id, urutan, nama, deskripsi, ikon, status, created_at, updated_at)
        VALUES (gen_random_uuid(), ${f.urutan}, '${nama}', '${deskripsi}', '${ikon}', ${f.status}, NOW(), NOW())
      `);
    }
  }

  return NextResponse.json({ message: "Semua fitur berhasil disimpan" });
}

export async function GET() {
  try {
    const data = await prisma.$queryRaw<
      Array<{
        id: string;
        urutan: number;
        ikon: string | null;
        nama: string;
        deskripsi: string;
        status: boolean;
      }>
    >`
      SELECT *
      FROM fitur
      ORDER BY status DESC, urutan ASC
    `;

    const result = data.map((f) => ({
      ...f,
      ikon: f.ikon ? `/fitur/${f.ikon}` : null,
    }));

    return NextResponse.json({ data: result });
  } catch {
    return NextResponse.json(
      { message: "Gagal ambil data fitur" },
      { status: 500 },
    );
  }
}
