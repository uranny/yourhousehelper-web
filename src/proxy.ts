import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import COOKIES_KEYS from "@/constants/cookies";
import ROUTE_KEYS from "@/constants/route";

export function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const accessToken = req.cookies.get(COOKIES_KEYS.ACCESS_TOKEN)?.value;

  const isAssetRequest =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    /\.[^/]+$/.test(pathname);

  if (isAssetRequest) return NextResponse.next();

  const isPublicPage =
    pathname === ROUTE_KEYS.ROOT ||
    pathname === ROUTE_KEYS.SIGNIN ||
    pathname === ROUTE_KEYS.SIGNUP;

  if (isPublicPage) return NextResponse.next();

  if (!accessToken) {
    return NextResponse.redirect(new URL(ROUTE_KEYS.SIGNIN, req.url));
  }

  return NextResponse.next();
}