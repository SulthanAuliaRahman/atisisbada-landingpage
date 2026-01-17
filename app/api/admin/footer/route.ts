import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const kantor = await prisma.DataKantor.findFirst();

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
      { type: "logo", src: "/logo.png" },
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
