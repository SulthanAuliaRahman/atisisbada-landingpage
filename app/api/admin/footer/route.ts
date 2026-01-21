import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import fs from "fs";
import path from "path";
import {
  extractInstagramUsername,
  extractWhatsAppNumber,
} from "@/app/utils/ExtractLink";

export const dynamic = "force-dynamic";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  const formData = await req.formData();
  const logoFile = formData.get("logo") as File | null;
  const bodyJson = formData.get("body") as string;

  if (!bodyJson) {
    return NextResponse.json(
      { message: "Validasi gagal", errors: { body: "Body wajib diisi" } },
      { status: 400 },
    );
  }

  let body: any;
  try {
    body = JSON.parse(bodyJson);
  } catch {
    return NextResponse.json(
      {
        message: "Validasi gagal",
        errors: { body: "Format body tidak valid" },
      },
      { status: 400 },
    );
  }

  const errors: Record<string, string> = {};

  if (!body.alamat) errors.alamat = "Alamat wajib diisi";
  if (!body.telp) errors.telp = "Nomor telepon wajib diisi";
  if (!body.email) errors.email = "Email wajib diisi";
  if (!body.longitude) errors.longitude = "Titik longitude kantor wajib diisi";
  if (!body.latitude) errors.latitude = "Titik Latitude kantor wajib diisi";

  if (logoFile && !logoFile.type.startsWith("image/")) {
    errors.logo = "File logo harus berupa gambar";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { message: "Validasi gagal", errors },
      { status: 400 },
    );
  }

  const isDev = process.env.NODE_ENV === "development";

  const UPLOAD_DIR = isDev
    ? path.join(process.cwd(), "public")
    : "/var/www/storage";

  const LOGO_PATH = path.join(UPLOAD_DIR, "logo.png");

  if (logoFile) {
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    const buffer = Buffer.from(await logoFile.arrayBuffer());
    fs.writeFileSync(LOGO_PATH, buffer);
  }

  const alamat = body.alamat;
  const telp = body.telp;
  const email = body.email;
  const deskripsi = body.deskripsi || "";
  const instagram = extractInstagramUsername(body.instagram || "");
  const whatsapp = extractWhatsAppNumber(body.whatsapp || "");
  const latitude = body.latitude || "0";
  const longitude = body.longitude || "0";

  const result = await prisma.$queryRaw<Array<{ id: string }>>`
    SELECT id FROM data_kantor LIMIT 1
  `;

  const kantor = result[0];

  if (kantor) {
    const updated = await prisma.$queryRaw<Array<any>>`
      UPDATE data_kantor
      SET
        alamat_kantor = ${alamat},
        nomor_kantor = ${telp},
        email_kantor = ${email},
        deskripsi_kantor = ${deskripsi},
        url_instagram_kantor = ${instagram},
        nomor_whatsapp = ${whatsapp},
        latitude = ${latitude},
        longitude = ${longitude},
        updated_at = NOW()
      WHERE id = ${kantor.id}
      RETURNING *;
    `;

    return NextResponse.json({
      message: "Data kantor diperbarui",
      data: updated[0],
    });
  }

  const created = await prisma.$queryRaw<Array<any>>`
    INSERT INTO data_kantor
      (id, alamat_kantor, nomor_kantor, email_kantor,
       deskripsi_kantor, nomor_whatsapp, url_instagram_kantor,
       latitude, longitude, created_at, updated_at)
    VALUES
      (gen_random_uuid(), ${alamat}, ${telp}, ${email},
       ${deskripsi}, ${whatsapp}, ${instagram},
       ${latitude}, ${longitude}, NOW(), NOW())
    RETURNING *;
  `;

  return NextResponse.json({
    message: "Data kantor dibuat",
    data: created[0],
  });
}

export async function GET() {
  const result = await prisma.$queryRaw<
    Array<{
      id: string;
      deskripsi_kantor: string;
      alamat_kantor: string;
      nomor_kantor: string;
      email_kantor: string;
      url_instagram_kantor: string;
      latitude: string;
      longitude: string;
    }>
  >`SELECT * FROM data_kantor LIMIT 1`;

  const kantor = result[0];

  if (!kantor) {
    return NextResponse.json({
      alamat: "",
      telp: "",
      email: "",
      deskripsi: "",
      instagram: "",
      whatsapp: "",
      latitude: "",
      longitude: "",
    });
  }

  return NextResponse.json({
    alamat: kantor.alamat_kantor,
    telp: kantor.nomor_kantor,
    email: kantor.email_kantor,
    deskripsi: kantor.deskripsi_kantor,
    instagram: kantor.url_instagram_kantor,
    whatsapp: kantor.nomor_kantor,
    latitude: kantor.latitude,
    longitude: kantor.longitude,
  });
}
