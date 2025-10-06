"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface GalleryLightboxProps {
  images: string[];
  title?: string; // optional, ignored in UI to match requested component
}

export default function LightboxGallery({ images }: GalleryLightboxProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleClose = () => setSelectedIndex(null);
  const handleNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => {
      const idx = prev!;
      if (idx >= images.length - 1) return idx; // stop at last image
      return idx + 1;
    });
  };
  const handlePrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => {
      const idx = prev!;
      if (idx <= 0) return idx; // stop at first image
      return idx - 1;
    });
  };
  const isLast = selectedIndex !== null && selectedIndex >= images.length - 1;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((src, i) => (
        <div
          key={i}
          className="relative aspect-[5/4] overflow-hidden rounded-lg"
          onClick={() => setSelectedIndex(i)}
        >
          <Image
            src={src}
            alt={`Gallery image ${i + 1}`}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105 cursor-[zoom-in]"
          />
        </div>
      ))}

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-neutral-900/85 backdrop-blur-sm flex items-center justify-center"
          >
            <button
              className="absolute top-6 right-6 p-3 rounded-md border border-white/40 text-white hover:bg-white/10 transition cursor-pointer"
              onClick={handleClose}
              aria-label="Close lightbox"
            >
              <X size={32} />
            </button>

            <div className="relative w-[90%] md:w-[70%] max-w-5xl aspect-[5/4] flex items-center justify-center">
              {selectedIndex !== null && (
                <Image
                  src={images[selectedIndex]}
                  alt={`Expanded image ${selectedIndex + 1}`}
                  fill
                  className="object-contain rounded-md"
                  priority
                />
              )}
            </div>

            <p className="absolute bottom-6 text-white text-xl font-medium tracking-wide">
              {selectedIndex + 1}/{images.length}
            </p>

            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-8 text-white/90 text-5xl select-none hover:text-white cursor-pointer"
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className={`absolute right-8 text-5xl select-none ${isLast ? "text-white/40 cursor-not-allowed" : "text-white/90 hover:text-white cursor-pointer"}`}
                  aria-label="Next image"
                  disabled={isLast}
                >
                  ›
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}