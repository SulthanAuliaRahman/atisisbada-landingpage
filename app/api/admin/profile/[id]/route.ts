import prisma from "@/lib/prisma";
import { NextResponse,NextRequest } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "Missing id param" },
        { status: 400 }
      );
    }

    if (!body.alt) {
      return NextResponse.json(
        { message: "alt is required" },
        { status: 400 }
      );
    }

    const slide = await prisma.homeCarousel.update({
      where: { id },
      data: {
        nomor_urut: Number(body.nomor_urut),
        alt: body.alt,
        status: Boolean(body.status),
        updated_at: new Date(),
      },
    });

    return NextResponse.json(slide);
  } catch (error) {
    console.error("PUT /profile/[id] error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}


//note: Delete ini tidak menghapus di filesystem nya (jadi soft delete)
// ini katanya karena next js servere files pada /public itu jadi static assets (jadi bisa ke lock di server nya)
// jadi  delete file di /public tidak selalu jalan di next dev (katanya...)
// yaa karena small admin site harus nya aman aman aja
export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const slide = await prisma.homeCarousel.findUnique({
      where: { id },
    });

    if (!slide) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    await prisma.homeCarousel.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    console.error("DELETE carousel failed:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}


