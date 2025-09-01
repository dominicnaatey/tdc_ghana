import Image from "next/image";

interface BoardHeroProps {
  title?: string;
  description?: string;
}

export default function BoardHero({ 
  title = "Board of Directors",
  description = "Meet the distinguished leaders guiding TDC Ghana Ltd towards excellence in real estate development and sustainable urban planning."
}: BoardHeroProps) {
  return (
    <section className="relative py-8 lg:py-4 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/carousel/4.jpeg"
          alt="TDC Ghana Board Meeting"
          fill
          className="object-cover"
          style={{ objectPosition: '50% 25%' }}
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/5 to-black/60"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end h-[40vh]">
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