import Image from "next/image";

type PhotoCardProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  label?: string;
  caption?: string;
};

export default function PhotoCard({
  src,
  alt,
  className = "",
  imageClassName = "",
  priority = false,
  sizes = "(max-width: 768px) 80vw, 320px",
  label,
  caption,
}: PhotoCardProps) {
  return (
    <div className={`photo-card ${className}`}>
      <div className="photo-card__frame">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={`object-cover ${imageClassName}`}
        />
      </div>
      {(label || caption) && (
        <div className="mt-4 text-center">
          {label ? (
            <p className="text-[10px] uppercase tracking-widest2 text-[#d9b7c1]">
              {label}
            </p>
          ) : null}
          {caption ? (
            <p className="mt-2 font-display text-xl text-cream md:text-2xl">
              {caption}
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
}
