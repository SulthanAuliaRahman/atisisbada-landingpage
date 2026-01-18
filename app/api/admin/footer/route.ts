import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import fs from "fs";
import path from "path";
import { IncomingForm } from "formidable";

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
    return NextResponse.json({ message: "Missing body" }, { status: 400 });
  }

  const body = JSON.parse(bodyJson);

  if (logoFile) {
    const arrayBuffer = await logoFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const destPath = path.join(process.cwd(), "public/logo.png");
    fs.writeFileSync(destPath, buffer);
  }

  const result = await prisma.$queryRaw<{ id: string }[]>`
    SELECT id FROM data_kantor LIMIT 1
  `;
  const kantor = result[0];

  const alamat =
    body.dataKantor.find((i: any) => i.type === "alamat")?.text || "";
  const telp = body.dataKantor.find((i: any) => i.type === "telp")?.text || "";
  const email =
    body.dataKantor.find((i: any) => i.type === "email")?.text || "";
  const deskripsi = body.informasi || "";
  const instagram =
    body.kontak?.find((i: any) => i.platform === "Instagram")?.url || "";
  const latitude =
    body.lokasi?.find((i: any) => i.type === "Latitude")?.value || "0";
  const longitude =
    body.lokasi?.find((i: any) => i.type === "Longitude")?.value || "0";

  if (kantor) {
    const updated = await prisma.$executeRaw`
      UPDATE data_kantor
      SET
        alamat_kantor = ${alamat},
        nomor_kantor = ${telp},
        email_kantor = ${email},
        deskripsi_kantor = ${deskripsi},
        url_instagram_kantor = ${instagram},
        latitude = ${latitude},
        longitude = ${longitude},
        updated_at = NOW()
      WHERE id = ${kantor.id}
      RETURNING *;
    `;
    return NextResponse.json({
      message: "Data kantor diperbarui",
      data: updated,
    });
  }

  const created = await prisma.$executeRaw`
    INSERT INTO data_kantor
      (id, alamat_kantor, nomor_kantor, email_kantor,
       deskripsi_kantor, url_instagram_kantor, latitude, longitude, created_at, updated_at)
    VALUES
      (gen_random_uuid(), ${alamat}, ${telp}, ${email},
       ${deskripsi}, ${instagram}, ${latitude}, ${longitude}, NOW(), NOW())
    RETURNING *;
  `;

  return NextResponse.json({ message: "Data kantor dibuat", data: created });
}
export async function GET() {
  const result = await prisma.$queryRaw<{
    id: string;
    deskripsi_kantor: string;
    alamat_kantor: string;
    nomor_kantor: string;
    email_kantor: string;
    url_instagram_kantor: string;
    latitude: string;
    longitude: string;
  }>`SELECT * FROM data_kantor LIMIT 1`;

  const kantor = result[0];

  if (!kantor) {
    return NextResponse.json({
      dataKantor: [],
      informasi: "",
      kontak: [],
      lokasi: [],
    });
  }

  return NextResponse.json({
    dataKantor: [
      { type: "alamat", text: kantor.alamat_kantor },
      { type: "telp", text: kantor.nomor_kantor },
      { type: "email", text: kantor.email_kantor },
    ],
    informasi: kantor.deskripsi_kantor,
    kontak: [
      {
        platform: "Instagram",
        url: kantor.url_instagram_kantor,
      },
      {
        platform: "Whatsapp",
        url: kantor.nomor_kantor,
      },
    ],
    lokasi: [
      { type: "Latitude", value: kantor.latitude },
      { type: "Longitude", value: kantor.longitude },
    ],
  });
}
