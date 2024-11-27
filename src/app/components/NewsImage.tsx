"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface NewsImageProps {
  src: string;
  alt: string;
  priority?: boolean;
}

function isValidHttpUrl(string: string) {
  try {
    const url = new URL(string);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export default function NewsImage({
  src,
  alt,
  priority = false,
}: NewsImageProps) {
  const [imgSrc, setImgSrc] = useState<string>("/globe.svg");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isValidHttpUrl(src)) {
      setImgSrc(src);
    } else {
      setImgSrc("/globe.svg");
      setIsLoading(false);
    }
  }, [src]);

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--category-bg)]">
      {isLoading && imgSrc !== "/globe.svg" && (
        <div className="absolute inset-0 animate-pulse bg-[var(--category-bg)]" />
      )}
      {imgSrc === "/globe.svg" ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/globe.svg"
            alt="Fallback"
            width={48}
            height={48}
            className="opacity-40 transition-opacity duration-300"
          />
        </div>
      ) : (
        <Image
          src={imgSrc}
          alt={alt}
          fill
          priority={priority}
          className={`object-cover transition-all duration-500 ${
            isLoading
              ? "scale-105 blur-sm opacity-0"
              : "scale-100 blur-0 opacity-100"
          }`}
          onError={() => {
            setImgSrc("/globe.svg");
            setIsLoading(false);
          }}
          onLoad={() => setIsLoading(false)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      )}
    </div>
  );
}
