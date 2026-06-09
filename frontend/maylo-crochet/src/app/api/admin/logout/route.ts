// src/app/api/admin/logout/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    // Eliminar la cookie de sesión
    (await cookies()).delete("admin-token");

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al cerrar sesión" },
      { status: 500 },
    );
  }
}
