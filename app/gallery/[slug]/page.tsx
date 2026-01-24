import { notFound } from "next/navigation";
import Image from "next/image";
import LightboxGallery from "@/components/gallery/LightboxGallery";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

import { getAlbumBySlug, getAllAlbums } from "@/lib/data/sample-gallery";

export default async function AlbumPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolved = await params;
  const slug = resolved.slug;
  const album = getAlbumBySlug(slug);
  if (!album) {
    notFound();
  }

  const [hero, ...rest] = album.images;

  return (
    <main className="bg-background-light dark:bg-background-dark font-display min-h-screen">
      {/* Header Navigation */}
      <div className="">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-2">
          <Button variant="ghost" asChild className="text-gray-600 hover:text-accent hover:bg-transparent">
            <Link href="/gallery">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Gallery
            </Link>
          </Button>
        </div>
      </div>
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="relative rounded-lg overflow-hidden mb-8 h-[35vh]">
          {hero && (
            <Image src={hero} alt={album.title} fill className="object-cover" />
          )}
          <div className="absolute inset-0 bg-black/85 flex items-center justify-center">
            <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold text-center px-4">
              {album.title}
            </h1>
          </div>
        </div>

        {/* Divider */}
        <div className="flex justify-center items-center my-8">
          <div className="w-1/3 border-t border-gray-300 dark:border-gray-600" />
          <span className="px-4 text-gray-500 dark:text-gray-400">♦</span>
          <div className="w-1/3 border-t border-gray-300 dark:border-gray-600" />
        </div>

        {/* Gallery Grid */}
        <LightboxGallery images={album.images} title={album.title} />

      </section>
    </main>
  );
}

// Pre-generate static params for export mode
export async function generateStaticParams() {
  const albums = getAllAlbums();
  return albums.map((album) => ({ slug: album.slug }))
}

export const dynamicParams = false
export const dynamic = 'force-static'