import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
export const middleware = (req: NextRequest, res: NextResponse) => {
  const path = req.nextUrl.pathname;
  const isPublicPath = path === "/auth/login" || path === "/auth/register";
  const token = req.cookies.get("token") || "";
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }
  // return NextResponse.next();
};

export const config = {
  matcher: ["/", "/posts/:path*", "/auth/:path*"],
};
