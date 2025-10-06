import { notFound } from "next/navigation";
import Image from "next/image";
import LightboxGallery from "@/components/gallery/LightboxGallery";

type AlbumDef = {
  title: string;
  images: string[];
};

const albums: Record<string, AlbumDef> = {
  "md-quarterly-durbar": {
    title: "The Managing Director Engages Staff at Quarterly Durbar",
    images: [
      "/gallery/1/1.jpeg",
      // "/gallery/1/2.JPG",
      "/gallery/1/3.JPG",
      "/gallery/1/4.JPG",
      "/gallery/1/5.JPG",
      "/gallery/1/6.JPG",
      "/gallery/1/7.JPG",
      "/gallery/1/8.JPG",
      "/gallery/1/9.JPG",
      "/gallery/1/10.JPG",
      "/gallery/1/11.JPG",
      "/gallery/1/12.JPG",
      "/gallery/1/13.JPG",
      "/gallery/1/14.JPG",
      "/gallery/1/15.JPG",
      "/gallery/1/16.JPG",
      "/gallery/1/17.JPG",
      "/gallery/1/18.JPG",
      "/gallery/1/19.JPG",
    ],
  },
  "md-courtesy-call-community-7-imam": {
    title: "TDC MD Pays Courtesy Call on Tema Community 7 Imam",
    images: [
      "/gallery/2/1.jpg",
      "/gallery/2/2.jpg",
      "/gallery/2/3.jpg",
      "/gallery/2/4.jpg",
      "/gallery/2/5.jpg",
      "/gallery/2/6.jpg",
      "/gallery/2/7.jpg",
      "/gallery/2/8.jpg",
    ],
  },
  "housing-project-in-ho": {
    title: "TDC Ghana Ltd. To Begin Housing Project In HO",
    images: [
      "/gallery/3/1.JPG",
      "/gallery/3/2.JPG",
      "/gallery/3/3.JPG",
      "/gallery/3/4.JPG",
      "/gallery/3/5.JPG",
      "/gallery/3/6.JPG",
      "/gallery/3/7.JPG",
      "/gallery/3/8.JPG",
      "/gallery/3/9.JPG",
      "/gallery/3/10.JPG",
      "/gallery/3/11.JPG",
      "/gallery/3/12.JPG",
      "/gallery/3/13.JPG",
      "/gallery/3/14.JPG",
      "/gallery/3/15.JPG",
      "/gallery/3/16.JPG",
      "/gallery/3/17.JPG",
      "/gallery/3/18.JPG",
    ],
  },
  "mwhwr-budget-guidance-2025": {
    title:
      "Ministry of Works, Housing and Water Resources Guides TDC Ghana Ltd. on 2025 Budget Preparation",
    images: [
      "/gallery/4/1.JPG",
      "/gallery/4/2.JPG",
      "/gallery/4/3.JPG",
      "/gallery/4/4.JPG",
      "/gallery/4/5.JPG",
      "/gallery/4/6.JPG",
      "/gallery/4/7.JPG",
    ],
  },
  "tdc-commitment-ibiexpo-2025": {
    title:
      "TDC Ghana Ltd. Showcases Commitment to  Development at International Building, Infrastructure & Investment Expo 2025",
    images: [
      "/gallery/5/1.jpg",
      "/gallery/5/2.jpg",
      "/gallery/5/3.jpg",
      "/gallery/5/4.jpg",
      "/gallery/5/5.jpg",
      "/gallery/5/6.jpg",
      "/gallery/5/7.jpg",
    ],
  },
};

export default async function AlbumPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const album = albums[slug];
  if (!album) {
    notFound();
  }

  const [hero, ...rest] = album.images;

  return (
    <main className="bg-background-light dark:bg-background-dark font-display min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="relative rounded-lg overflow-hidden mb-8 h-[35vh]">
          {hero && (
            <Image src={hero} alt={album.title} fill className="object-cover" />
          )}
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
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