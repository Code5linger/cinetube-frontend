import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function hasSessionCookie(request: NextRequest): boolean {
  return request.cookies.getAll().some(
    (c) =>
      c.name === "better-auth.session_token" ||
      c.name.includes("session_token"),
  );
}

export function middleware(request: NextRequest) {
  if (!hasSessionCookie(request)) {
    const login = new URL("/login", request.url);
    login.searchParams.set(
      "redirect",
      `${request.nextUrl.pathname}${request.nextUrl.search}`,
    );
    return NextResponse.redirect(login);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/watchlist", "/profile", "/purchases", "/admin/:path*"],
};
