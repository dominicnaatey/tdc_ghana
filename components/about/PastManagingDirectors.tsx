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
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-card-foreground font-serif">
            PAST MANAGING DIRECTORS OF TDC GHANA LIMITED
          </h2>
        </div>

        <div className="max-w-7xl mx-auto text-center mb-10">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Over the years, TDC Ghana Limited has been guided by a succession of visionary leaders whose stewardship helped shape the Corporation’s strategic direction and operational excellence. Each Managing Director contributed to the growth, transformation, and sustainability of TDC, steering the organization through different developmental phases and national housing priorities.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mt-6">
            This section provides a historical record of individuals who have served as Managing Directors of TDC Ghana Limited. Their leadership and commitment have played key roles in maintaining TDC’s mandate of developing and managing planned urban communities in Ghana.
          </p>
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
                className="object-cover w-full h-full"
                priority={idx < 3}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}