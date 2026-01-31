// @/app/config/footer.ts
import { siInstagram, siFacebook, siPinterest } from "simple-icons";

export const FOOTER_LINKS = {
  tienda: [
    { name: "Amigurumis", href: "/catalogo?categoria=Amigurumi" }, // Actualizado a tus nuevas rutas
    { name: "Llaveros", href: "/catalogo?categoria=Llavero" },
    { name: "Ramos", href: "/catalogo?categoria=Ramo" },
    { name: "Patrones", href: "/catalogo?categoria=Patron" },
  ],
  soporte: [
    { name: "Envíos", href: "#envios" },
    { name: "Devoluciones", href: "#devoluciones" },
    { name: "Cuidado del producto", href: "#cuidado" },
    { name: "FAQ", href: "#faq" },
  ],
  nosotros: [
    { name: "Sobre mí", href: "#sobre-mi" },
    { name: "Contacto", href: "#contacto" },
    { name: "Pedidos personalizados", href: "#personalizados" },
  ],
};

export const SOCIAL_LINKS = [
  {
    name: "Instagram",
    icon: siInstagram,
    href: "https://instagram.com/maylo.crochet",
  },
  {
    name: "Facebook",
    icon: siFacebook,
    href: "https://facebook.com/maylo.crochet",
  },
  {
    name: "Pinterest",
    icon: siPinterest,
    href: "https://pinterest.com/maylo.crochet",
  },
];
