import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import prisma from "@/lib/prisma";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function POST(req: Request) {
  let body: any;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "JSON tidak valid" }, { status: 400 });
  }

  if (!Array.isArray(body.data)) {
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

  const STORAGE_PATH =
    process.env.STORAGE_PATH || path.join(process.cwd(), "public");

  const BASE_DIR = path.join(STORAGE_PATH, type.toLowerCase());

  if (!fs.existsSync(BASE_DIR)) {
    fs.mkdirSync(BASE_DIR, { recursive: true });
  }

  const processedData: any[] = [];

  for (let i = 0; i < body.data.length; i++) {
    const f = body.data[i];
    const fieldErrors: Record<string, string> = {};

    if (!f.nama || typeof f.nama !== "string" || !f.nama.trim()) {
      fieldErrors.nama = "Nama wajib diisi dan berupa string";
    }

    if (
      !f.deskripsi ||
      typeof f.deskripsi !== "string" ||
      !f.deskripsi.trim()
    ) {
      fieldErrors.deskripsi = "Deskripsi wajib diisi dan berupa string";
    }

    if (!f.ikon || typeof f.ikon !== "string" || !f.ikon.trim()) {
      fieldErrors.ikon = "Ikon wajib diisi";
    } else if (f.ikon.startsWith("data:image/")) {
      const matches = f.ikon.match(
        /^data:image\/([a-zA-Z0-9+.-]+);base64,(.+)$/,
      );
      if (!matches) fieldErrors.ikon = "Format ikon base64 tidak valid";
      else {
        const ext = matches[1] === "svg+xml" ? "svg" : matches[1];
        if (!["png", "jpg", "jpeg", "svg"].includes(ext)) {
          fieldErrors.ikon =
            "Jenis file ikon harus di antara png, jpg, jpeg dan svg";
        }
      }
    }

    if (f.status !== undefined && typeof f.status !== "boolean") {
      fieldErrors.status = "Status harus boolean";
    }

    if (
      f.urutan !== undefined &&
      (!Number.isInteger(f.urutan) || f.urutan <= 0)
    ) {
      fieldErrors.urutan = "Urutan harus integer positif";
    }

    if (f.nama) {
      const existingName = await prisma.item.findFirst({
        where: { type, nama: f.nama, id: { not: f.id || "" } },
        select: { id: true },
      });
      if (existingName) {
        fieldErrors.nama = "Nama item harus berbeda satu sama lain";
      }
    }

    if (Object.keys(fieldErrors).length) {
      errors[i] = fieldErrors;
      continue;
    }

    const slug = slugify(f.nama);
    const ITEM_DIR = path.join(BASE_DIR, slug);

    if (!fs.existsSync(ITEM_DIR)) {
      fs.mkdirSync(ITEM_DIR, { recursive: true });
    }

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
      const fileName = `icon.${ext}`;

      fs.writeFileSync(path.join(ITEM_DIR, fileName), buffer);
    }

    processedData.push({
      id: f.id,
      nama: f.nama,
      deskripsi: f.deskripsi,
      status: Boolean(f.status),
      urutan: i + 1,
      type,
      ikonPath: `${type.toLowerCase()}/${slug}`,
    });
  }

  const errorValues = Object.values(errors);

  if (errorValues.length > 0) {
    const firstItem = errorValues[0];
    const firstMessage = Object.values(firstItem)[0];

    return NextResponse.json({ message: firstMessage }, { status: 400 });
  }

  const existing = await prisma.item.findMany({
    where: { type },
    select: { id: true, ikon: true },
  });

  const incomingIds = processedData.filter((i) => i.id).map((i) => i.id);
  const existingItems = await prisma.item.findMany({
    where: { type },
    select: { id: true, ikon: true },
  });
  const toDelete = existingItems.filter((i) => !incomingIds.includes(i.id));

  for (const item of toDelete) {
    if (item.ikon) {
      const folderPath = path.join(STORAGE_PATH, item.ikon);
      if (fs.existsSync(folderPath)) {
        fs.rmSync(folderPath, { recursive: true, force: true });
      }
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
      const oldItem = existingItems.find((e) => e.id === f.id);
      if (oldItem && oldItem.ikon) {
        const oldFolder = path.join(STORAGE_PATH, oldItem.ikon);
        const newFolder = path.join(STORAGE_PATH, f.ikonPath);

        if (oldFolder !== newFolder) {
          if (fs.existsSync(oldFolder)) {
            fs.renameSync(oldFolder, newFolder);
          } else {
            if (!fs.existsSync(newFolder))
              fs.mkdirSync(newFolder, { recursive: true });
          }
        }
      }

      await prisma.item.update({
        where: { id: f.id },
        data: {
          nama: f.nama,
          deskripsi: f.deskripsi,
          urutan: f.urutan,
          status: f.status,
          ikon: f.ikonPath,
        },
      });
    } else {
      await prisma.item.create({
        data: {
          nama: f.nama,
          deskripsi: f.deskripsi,
          urutan: f.urutan,
          status: f.status,
          type,
          ikon: f.ikonPath,
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

    const BASE_DIR =
      process.env.STORAGE_PATH || path.join(process.cwd(), "public");

    const result = data.map((i) => {
      let iconUrl: string | null = null;

      if (i.ikon) {
        const folderPath = path.join(BASE_DIR, i.ikon);
        const exts = ["png", "svg", "jpg", "jpeg"];

        for (const ext of exts) {
          const filePath = path.join(folderPath, `icon.${ext}`);
          if (fs.existsSync(filePath)) {
            iconUrl = `/${i.ikon}/icon.${ext}`;
            break;
          }
        }
      }

      return {
        ...i,
        ikon: iconUrl,
      };
    });

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
