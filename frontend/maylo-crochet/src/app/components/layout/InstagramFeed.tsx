import { InstagramPost } from "./InstagramPost";
import { siInstagram } from "simple-icons";
import Link from "next/link";

const INSTAGRAM_POSTS = [
  { id: 1, image: "/images/Spiderman.jpg", alt: "Amigurumi osito tejido" },
  { id: 2, image: "/images/Spiderman.jpg", alt: "Bolso de crochet" },
  { id: 3, image: "/images/Spiderman.jpg", alt: "Cojines decorativos" },
  { id: 4, image: "/images/Spiderman.jpg", alt: "Proceso de tejido" },
  { id: 5, image: "/images/Spiderman.jpg", alt: "Amigurumi conejito" },
  { id: 6, image: "/images/Spiderman.jpg", alt: "Decoración macramé" },
];

export function InstagramFeed() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-medium tracking-widest text-primary uppercase mb-3">
            Síguenos
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground">
            Ver es creer
          </h2>
          <p className="mt-4 text-muted-foreground">
            Síguenos en Instagram para ver promociones y nuevos lanzamientos
          </p>
          <Link
            href="https://instagram.com/maylo.crochet"
            target="_blank"
            className="inline-flex items-center gap-2 mt-4 text-primary hover:text-primary/80 transition-colors font-medium"
          >
            <div
              className="h-5 w-5 fill-current"
              style={{ color: `#${siInstagram.hex}` }}
              dangerouslySetInnerHTML={{ __html: siInstagram.svg }}
            />
            @maylo.crochet
          </Link>
        </div>

        {/* Cuadrícula de Posts */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <InstagramPost key={post.id} image={post.image} alt={post.alt} />
          ))}
        </div>
      </div>
    </section>
  );
}
