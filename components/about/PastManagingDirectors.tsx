import Image from "next/image";

export default function PastManagingDirectors() {
  const images = [
    "/pastmds/1.jpg",
    "/pastmds/2.jpg",
    "/pastmds/3.jpg",
    "/pastmds/4.jpg",
    "/pastmds/5.jpg",
    "/pastmds/6.jpg",
    "/pastmds/7.jpg",
  ];

  return (
    <section className="py-16 lg:py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-card-foreground font-serif">
            PAST MANAGING DIRECTORS OF TDC GHANA LIMITED
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((src, idx) => (
            <div
              key={src}
              className="relative w-full aspect-square rounded-lg overflow-hidden bg-muted"
            >
              <Image
                src={src}
                alt={`Past Managing Director ${idx + 1}`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
                priority={idx < 3}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}