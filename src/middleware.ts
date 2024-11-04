import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = ["/login", "/auth"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const loggedInCookie = request.cookies.get("logged");

  if (loggedInCookie?.value !== "yes" && !publicPaths.includes(pathname)) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico).*)"],
};
