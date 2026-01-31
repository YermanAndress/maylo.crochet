// @/app/components/layout/Footer.tsx
import { Heart } from "lucide-react";
import Link from "next/link";
import { FOOTER_LINKS, SOCIAL_LINKS } from "@/app/config/footer";

// Sub-componente interno (solo para uso aquí dentro)
function FooterSection({
  title,
  links,
}: {
  title: string;
  links: { name: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="font-semibold text-background mb-4">{title}</h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="text-background/70 hover:text-background transition-colors"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer id="contacto" className="bg-primary">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand & Social */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="font-serif text-2xl font-semibold text-background"
            >
              Hilitos de Amor
            </Link>
            <p className="mt-4 text-background/70 max-w-sm leading-relaxed">
              Creamos piezas únicas tejidas a mano que llenan de calidez y amor
              tu hogar.
            </p>
            <div className="mt-6 flex gap-4">
              {SOCIAL_LINKS.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  className="w-10 h-10 rounded-full bg-accent hover:bg-background/70 flex items-center justify-center transition-all hover:scale-110"
                >
                  <div
                    className="h-5 w-5 fill-current text-white"
                    dangerouslySetInnerHTML={{ __html: social.icon.svg }}
                  />
                </Link>
              ))}
            </div>
          </div>

          <FooterSection title="Tienda" links={FOOTER_LINKS.tienda} />
          <FooterSection title="Soporte" links={FOOTER_LINKS.soporte} />
          <FooterSection title="Nosotros" links={FOOTER_LINKS.nosotros} />
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between text-background/60 text-sm">
          <p>© {new Date().getFullYear()} Hilitos de Amor.</p>
          <p className="flex items-center gap-1">
            Hecho con <Heart className="h-4 w-4 text-red-400 fill-red-400" /> en
            Colombia
          </p>
        </div>
      </div>
    </footer>
  );
}
