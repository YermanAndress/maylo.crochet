// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/uploads/imagenes/**",
      },
    ],
    // OPCIÓN A: Si sigues teniendo problemas con la IP privada,
    // puedes desactivar la optimización para imágenes locales:
    unoptimized: true,
  },
  rewrites: async () => [
    {
      source: "/api/:path*",
      destination: "http://localhost:8080/api/:path*",
    },
  ],
};

export default nextConfig;
