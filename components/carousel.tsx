"use client";

import React, { useState, useEffect } from "react";

const images = [
  "/carousel/1.jpg",
  "/carousel/2.jpg",
  "/carousel/3.jpg",
  "/carousel/4.jpg",
  "/carousel/5.jpg",
  "/carousel/6.jpg",
  "/carousel/7.jpg",
  "/carousel/8.jpg",
  "/carousel/9.jpg",
  "/carousel/10.jpg",
  "/carousel/11.jpg",
  "/carousel/12.jpg",
  "/carousel/13.jpg",
  "/carousel/14.jpg",
  "/carousel/15.jpg",
  "/carousel/16.jpg",
  "/carousel/17.jpg",
  "/carousel/18.jpg",
  "/carousel/19.jpg"
];

const Carousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-slide every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleSlideChange((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleSlideChange = (newSlideOrFunction: number | ((prev: number) => number)) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    if (typeof newSlideOrFunction === 'function') {
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
    <section className="relative bg-gradient-to-br from-primary/5 to-accent/5 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full" data-carousel="static">
          {/* Carousel wrapper */}
          <div className="relative h-56 overflow-hidden rounded-lg md:h-140">
            {images.map((src, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                  index === currentSlide
                    ? "opacity-100 scale-100 z-10"
                    : "opacity-0 scale-105 z-0"
                } ${
                  isAnimating ? "transition-all duration-700" : ""
                }`}
                style={{
                  transitionDelay: index === currentSlide ? "0ms" : "100ms",
                }}
              >
                <img
                  src={src}
                  className="absolute block w-full h-full object-cover"
                  alt={`Slide ${index + 1}`}
                />
              </div>
            ))}
          </div>

          {/* Slider controls */}
          <button
            type="button"
            className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none transition-transform hover:scale-110 active:scale-95"
            onClick={goToPrevious}
            disabled={isAnimating}
            data-carousel-prev
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none transition-all duration-200">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            type="button"
            className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none transition-transform hover:scale-110 active:scale-95"
            onClick={goToNext}
            disabled={isAnimating}
            data-carousel-next
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none transition-all duration-200">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Carousel;