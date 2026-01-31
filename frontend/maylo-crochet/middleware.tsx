// middleware.ts (ejemplo conceptual básico)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Aquí iría tu lógica de: ¿Está logueado el admin?
    // Por ahora puedes usar un Header manual o una cookie si quieres probar.
  }
}