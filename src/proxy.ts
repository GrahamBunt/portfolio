import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE = "site_auth";

export function proxy(request: NextRequest) {
  if (request.cookies.has(AUTH_COOKIE)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/login";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Protect everything except: Next internals, the login page,
    // the dynamic favicon route, and public static assets.
    "/((?!_next/static|_next/image|login|icon|avatar|fonts|masonry).*)",
  ],
};
