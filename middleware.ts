import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/admin")) {
    if (["GET", "HEAD", "OPTIONS"].includes(request.method)) {
      return NextResponse.next();
    }

    const token = request.cookies.get("token")?.value;

    // if (!token) {
    //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/admin/:path*",
};
