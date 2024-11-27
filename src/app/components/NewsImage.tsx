"use client";

import Image from "next/image";
import { useState } from "react";

interface NewsImageProps {
  src: string;
  alt: string;
  priority?: boolean;
}

export default function NewsImage({
  src,
  alt,
  priority = false,
}: NewsImageProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src="/globe.svg"
          alt="Fallback"
          width={48}
          height={48}
          className="opacity-40 transition-opacity duration-300"
        />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={450}
      className="h-full w-full object-cover"
      onError={() => setError(true)}
      priority={priority}
    />
  );
}
