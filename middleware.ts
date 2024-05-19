import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const isAdmin = request.cookies.get("isAdmin")?.value;
  const userType = request.cookies.get("userType")?.value;

  if (request.nextUrl.pathname.startsWith('/admin') && isAdmin !== "true") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (request.nextUrl.pathname.startsWith('/dashboard') && userType !== "Gallery") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
