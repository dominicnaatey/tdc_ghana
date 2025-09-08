import Image from "next/image";

interface ManagementHeroProps {
  title?: string;
  description?: string;
}

export default function ManagementHero({ 
  title = "Management Team",
  description = "Meet the experienced management team driving TDC Ghana Ltd's operations and strategic initiatives in real estate development and sustainable urban planning."
}: ManagementHeroProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/bg-primary.jpg"
          alt="TDC Ghana Management Team"
          fill
          className="object-cover scale-145 md:scale-100 object-[50%_3%] md:object-[50%_21%]"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/5 to-black/60"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end h-[30vh] md:h-[43vh]">
        <div className="text-center mb-8 w-full">
          <h1 className="text-4xl lg:text-5xl font-bold text-white font-serif mb-6">
            {/* {title} */}
          </h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
            {/* {description} */}
          </p>
        </div>
      </div>
    </section>
  );
}