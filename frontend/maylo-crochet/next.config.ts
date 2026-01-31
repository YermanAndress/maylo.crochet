// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Esto permite que Next.js cargue imágenes de tu localhost sin bloquear la IP
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8080",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/uploads/**",
      },
    ],
    // OPCIÓN A: Si sigues teniendo problemas con la IP privada,
    // puedes desactivar la optimización para imágenes locales:
    unoptimized: true,
  },
};

export default nextConfig;
