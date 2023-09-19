import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
export const middleware = (request: NextRequest) => {
  const response = NextResponse.next();
  response.cookies.set("myToken", "theFucking token");
  // console.log("HI", request.cookies.get("myToken"));
  // cookies().set("myToken", "theFucking token");
  if (request.nextUrl.pathname.startsWith("/posts")) {
    // console.log("Posts Middleware");
    // return NextResponse.redirect(new URL("about", request.url));
  }
  if (request.nextUrl.pathname.startsWith("/docs")) {
    // console.log("Docs Middleware");
  }
  if (request.nextUrl.pathname == "/posts") {
    // console.log("post other middleware Middleware");
  }
  // console.log("Default Middleware");
  return NextResponse.next();
};

// export const config = {
//   matcher: ["/", "/posts/:path*"],
// };
