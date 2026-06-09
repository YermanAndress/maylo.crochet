// src/app/api/admin/login/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    // 1. Extraemos la variable y aseguramos que sea un string (si no existe, usamos vacío)
    const secret = process.env.ADMIN_PASSWORD || "";

    if (!secret) {
      console.error("Falta ADMIN_PASSWORD en .env.local");
      return NextResponse.json(
        { error: "Error de configuración" },
        { status: 500 },
      );
    }

    if (password === secret) {
      const cookieStore = await cookies();

      // 2. Usamos el valor validado 'secret' que TypeScript ya sabe que es string
      cookieStore.set("admin-token", secret, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
        path: "/",
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "Contraseña incorrecta" },
      { status: 401 },
    );
  } catch (error) {
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
