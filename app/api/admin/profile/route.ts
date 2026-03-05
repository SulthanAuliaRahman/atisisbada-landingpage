import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { Visi, Misi, Profile_text, Tentang_text } = body;

    const KEY = "MASTER_PROFILE"

    const result = await prisma.profile_Kantor.upsert({
      where: {
         key: KEY,
      },
      update: {
        Visi,
        Misi,
        Profile_text,
        Tentang_text,
        updated_at: new Date(),
      },
      create: {
        Visi,
        Misi,
        Profile_text,
        Tentang_text,
        created_at: new Date(),
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Gagal menyimpan data" },
      { status: 500 }
    );
  }
}