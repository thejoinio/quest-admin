import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  // const role = request.cookies.get("role")?.value;

  const protectedRoutes = [
    "/dashboard",
    "/dashboard/create-ambassador",
    "/dashboard/create-kol-user",
    "/task-management",
    "/task-management/create-task",
    "/user-management",
  ];
  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/create-ambassador",
    "/dashboard/create-kol-user",
    "/task-management",
    "/task-management/create-task",
    "/user-management",
  ],
};
