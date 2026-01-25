"use client";

import Image from "next/image";
import Link from "next/link";

import { getAllAlbums } from "@/lib/data/sample-gallery";

export default function Gallery() {
  const albums = getAllAlbums();

  return (
    <main className="grow bg-background-light dark:bg-background-dark font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground font-serif leading-tight">
            GALLERY
          </h2>
          <p className="mt-4 text-lg text-background-dark/70 dark:text-background-light/70 max-w-2xl mx-auto">
            Showcasing TDC Ghana’s projects, people, and events.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {albums.map((album, idx) => (
            <Link
              key={idx}
              href={`/gallery/${album.slug}`}
              className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent"></div>

              {/* Wrapper enforces visual aspect ratio consistency */}
              <div className="relative aspect-4/3 w-full">
                <Image
                  src={album.images[0]}
                  alt={album.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="absolute bottom-0 left-0 p-6">
                <div className="inline-block rounded-md bg-black/70 sm:bg-black/50 md:bg-black/40 px-4 py-3 backdrop-blur-[2px]">
                  <h3 className="text-base md:text-xl font-medium text-white">{album.title}</h3>
                  {album.description && (
                    <p className="text-white/80 mt-1">{album.description}</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
