import { NextRequest, NextResponse } from "next/server";
export function middleware(request: NextRequest) {
  const isAdmin = request.cookies.get("isAdmin")?.value;

  if (isAdmin !== "true") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
