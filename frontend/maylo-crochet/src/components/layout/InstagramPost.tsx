import { siInstagram } from "simple-icons";
import Image from "next/image";
import Link from "next/link";

interface Props {
  image: string;
  alt: string;
}

export function InstagramPost({ image, alt }: Props) {
  return (
    <Link
      href="https://instagram.com/maylo.crochet"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative aspect-square overflow-hidden rounded-xl bg-muted"
    >
      <Image
        src={image || "/placeholder.svg"}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110 blur-xs"
      />
      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors flex items-center justify-center">
        <div
          className="h-5 w-5 fill-current"
          style={{ color: `#${siInstagram.hex}` }}
          dangerouslySetInnerHTML={{ __html: siInstagram.svg }}
        />
      </div>
    </Link>
  );
}
