import Image from "next/image";

interface AboutHeroProps {
  title?: string;
  description?: string;
}

export default function AboutHero({ 
  title = "About TDC Ghana Ltd",
  description = "Shaping Ghana’s future since 1952 through housing, land development, and infrastructure."
}: AboutHeroProps) {
  return (
    <section className="relative py-4 lg:py-4 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/bg-primary.jpg"
          alt="TDC Ghana Building"
          fill
          className="object-cover object-center"
          // style={{ objectPosition: '50% 35%' }}
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/90"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end h-[40vh]">
        <div className="text-center mb-8 w-full">
          <h1 className="text-4xl lg:text-5xl font-bold text-white font-serif mb-6">
            {title}
          </h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}