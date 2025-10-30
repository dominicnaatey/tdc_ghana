"use client";

import React, { useEffect, useState } from "react";

interface CarouselItem {
  src: string;
  caption?: string;
}

const images: CarouselItem[] = [
  { src: "/HoHousingProjects/1.jpg", caption: "Flats" },
  { src: "/HoHousingProjects/2.jpg", caption: "Serviced plots" },
  { src: "/HoHousingProjects/3.jpg", caption: "Golf Course" },
];

const HoCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      handleSlideChange((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleSlideChange = (newSlideOrFunction: number | ((prev: number) => number)) => {
    if (isAnimating) return;
    setIsAnimating(true);
    if (typeof newSlideOrFunction === "function") {
      setCurrentSlide(newSlideOrFunction);
    } else {
      setCurrentSlide(newSlideOrFunction);
    }
    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  };

  const goToPrevious = () => {
    handleSlideChange((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    handleSlideChange((prev) => (prev + 1) % images.length);
  };

  return (
    <section className="relative bg-gradient-to-br from-primary/5 to-accent/5 py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="max-w-4xl mx-auto text-3xl lg:text-4xl font-bold text-center text-foreground font-serif mb-8">
          TDC Ghana Ltd. to Begin Housing Project in Ho.
        </h2>
        <div className="relative w-full" data-carousel="static">
          {/* Carousel wrapper */}
          <div className="relative h-56 overflow-hidden rounded-lg md:h-140">
            {images.map((item, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                  index === currentSlide ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0"
                } ${isAnimating ? "transition-all duration-700" : ""}`}
                style={{ transitionDelay: index === currentSlide ? "0ms" : "100ms" }}
              >
                <img
                  src={item.src}
                  className="absolute block w-full h-full object-cover"
                  alt={item.caption || `Slide ${index + 1}`}
                />

                {/* Caption Overlay - bottom-center */}
                {item.caption && (
                  <div className="absolute z-20 px-3 py-2 max-w-sm bottom-0 left-1/2 transform -translate-x-1/2 sm:bottom-4">
                    <div className="bg-black/70 backdrop-blur-sm rounded-lg py-2 px-3 sm:py-2 sm:px-4 text-white shadow-lg border border-white/10">
                      <p className="text-xs sm:text-xs md:text-base text-gray-200 leading-tight">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Slider controls */}
            <button
              type="button"
              className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-1 cursor-pointer group focus:outline-none"
              onClick={goToPrevious}
              aria-label="Previous slide"
            >
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/70 group-hover:bg-white/90 dark:bg-white/30 dark:group-hover:bg-white/50">
                <svg className="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                </svg>
                <span className="sr-only">Previous</span>
              </span>
            </button>
            <button
              type="button"
              className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-1 cursor-pointer group focus:outline-none"
              onClick={goToNext}
              aria-label="Next slide"
            >
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/70 group-hover:bg-white/90 dark:bg-white/30 dark:group-hover:bg-white/50">
                <svg className="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                </svg>
                <span className="sr-only">Next</span>
              </span>
            </button>
          </div>

          {/* Indicators */}
          <div className="flex items-center justify-center space-x-2 mt-4">
            {images.map((_, idx) => (
              <button
                key={idx}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  idx === currentSlide ? "bg-accent" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => handleSlideChange(idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HoCarousel;