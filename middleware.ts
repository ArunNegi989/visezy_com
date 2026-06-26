import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {

    const token = request.cookies.get("token");

    const path = request.nextUrl.pathname;

    const isPublicRoute =
        path === "/admin/login" ||
        path === "/admin/signup" ||
        path === "/admin/verify-otp" ||
        path === "/admin/resend-otp" ||
        path === "/admin/forgot-password" ||
        path.startsWith("/admin/reset-password");

    if (
        path.startsWith("/admin") &&
        !isPublicRoute &&
        !token
    ) {
        return NextResponse.redirect(
            new URL("/admin/login", request.url)
        );
    }

    // Optional:
    // Logged-in user shouldn't open auth pages
    if (
        token &&
        (
            path === "/admin/login" ||
            path === "/admin/signup" ||
            path === "/admin/verify-otp"
        )
    ) {
        return NextResponse.redirect(
            new URL("/admin", request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};