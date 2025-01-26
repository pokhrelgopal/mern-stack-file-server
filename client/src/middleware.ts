import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  "/admin/login",
  "/admin/register",
  "/admin/forgot-password",
  "/admin/onboarding",
];

const restrictedIfLoggedIn = [
  "/admin/login",
  "/admin/register",
  "/admin/forgot-password",
  "/admin/reset-password",
  "/admin/onboarding",
];

interface DecodedToken {
  email: string;
  id: string;
  iat: number;
  exp: number;
}

const isProtectedRoute = (path: string): boolean =>
  path.startsWith("/admin") &&
  !publicRoutes.some((route) => path.startsWith(route));

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const path = request.nextUrl.pathname;
  let isLoggedIn = false;

  if (token) {
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      const now = Date.now() / 1000;
      isLoggedIn = now < decodedToken.exp;
    } catch (error) {
      isLoggedIn = false;
    }
  }

  if (isProtectedRoute(path)) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  if (restrictedIfLoggedIn.some((route) => path.startsWith(route))) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
