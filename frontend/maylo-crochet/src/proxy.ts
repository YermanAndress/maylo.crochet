// src/middleware.ts
import { NextResponse, NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const adminToken = request.cookies.get("admin-token");

  // EXCEPCIÓN: No proteger la página de login ni los recursos estáticos
  if (
    pathname === "/admin/login" ||
    pathname === "/admin/login/form" ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // PROTEGER RUTAS DE ADMIN
  if (pathname.startsWith("/admin")) {
    // Si no hay token o el valor no coincide con la clave maestra
    if (!adminToken || adminToken.value !== process.env.ADMIN_PASSWORD) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // Ajustamos el matcher para que sea más preciso
  matcher: ["/admin/:path*"],
};
