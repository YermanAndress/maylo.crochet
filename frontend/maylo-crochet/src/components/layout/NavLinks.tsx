// @/app/components/layout/NavLinks.tsx
import Link from "next/link";

const navigation = [
  { name: "Tienda", href: "/catalogo" },
  { name: "Personalizados", href: "/personalizados" },
  { name: "Colecciones", href: "/#colecciones" },
  { name: "Sobre Mí", href: "/#sobre-mi" },
  { name: "Contacto", href: "/#contacto" },
];

interface Props {
  className?: string;
  onClick?: () => void;
}

export function NavLinks({ className, onClick }: Props) {
  return (
    <nav className={className}>
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          onClick={onClick}
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors lg:text-base"
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
