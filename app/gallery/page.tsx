"use client";

import Image from "next/image";
import Link from "next/link";

export default function Gallery() {
  type GalleryItem = {
    slug: string;
    title: string;
    image: string;
    description?: string;
  };
  const items: GalleryItem[] = [
    {
      slug: "md-quarterly-durbar",
      title: "The Managing Director Engages Staff at Quarterly Durbar",
      image: "/gallery/1/1.jpeg",
    },
    {
      slug: "md-courtesy-call-community-7-imam",
      title: "TDC MD Pays Courtesy Call on Tema Community 7 Imam",
      image: "/gallery/2/1.jpg",
    },
    {
      slug: "housing-project-in-ho",
      title: "TDC Ghana Ltd. To Begin Housing Project In HO",
      image: "/gallery/3/1.JPG",
    },
    {
      slug: "mwhwr-budget-guidance-2025",
      title:
        "Ministry of Works, Housing and Water Resources Guides TDC Ghana Ltd. on 2025 Budget Preparation",
      image: "/gallery/4/1.JPG",
    },
    {
      slug: "tdc-commitment-ibiexpo-2025",
      title:
        "TDC Ghana Ltd. Showcases Commitment to  Development at International Building, Infrastructure & Investment Expo 2025",
      image: "/gallery/5/1.jpg",
    },
  ];

  return (
    <main className="flex-grow bg-background-light dark:bg-background-dark font-sans">
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
          {items.map((item, idx) => (
            <Link
              key={idx}
              href={`/gallery/${item.slug}`}
              className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

              {/* Wrapper enforces visual aspect ratio consistency */}
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="absolute bottom-0 left-0 p-6">
                <div className="inline-block rounded-md bg-black/70 sm:bg-black/50 md:bg-black/40 px-4 py-3 backdrop-blur-[2px]">
                  <h3 className="text-base md:text-xl font-medium text-white">{item.title}</h3>
                  {item.description && (
                    <p className="text-white/80 mt-1">{item.description}</p>
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
