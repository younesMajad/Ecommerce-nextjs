"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ImageOverviewProps {
  images: string[];
  alt: string;
}

const ImageOverview = ({ images, alt }: ImageOverviewProps) => {
  const validImages = images.filter((src) => Boolean(src));
  const [selected, setSelected] = useState(0);

  const current =
    validImages[Math.min(selected, validImages.length - 1)] ??
    "/placeholder.png";
  const showThumbnails = validImages.length > 1;

  return (
    <div className="flex flex-col gap-4">
      <motion.div
        key={current}
        initial={{ opacity: 0.3 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50"
      >
        <Image
          src={current}
          alt={alt}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </motion.div>

      {showThumbnails && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {validImages.map((src, index) => (
            <button
              key={`${src}-${index}`}
              onClick={() => setSelected(index)}
              aria-label={`View image ${index + 1}`}
              className={`relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-gray-50 border-2 transition ${
                index === selected
                  ? "border-black"
                  : "border-transparent hover:border-gray-300"
              }`}
            >
              <Image
                src={src}
                alt={`${alt} ${index + 1}`}
                fill
                className="object-contain p-1.5"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageOverview;
