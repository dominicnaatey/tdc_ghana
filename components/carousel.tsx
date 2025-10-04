"use client";

import React, { useState, useEffect } from "react";
import LeadershipSection from "./leadership-section";

interface CarouselItem {
  src: string;
  caption?: {
    title?: string;
    description?: string;
    position?: 'bottom-left' | 'bottom-right' | 'bottom-center' | 'top-left' | 'top-right' | 'top-center' | 'center';
  };
}

const images: CarouselItem[] = [
  { 
    src: "/carousel/0.jpg",
    caption: {
      description: "TDC Ghana Ltd – Real Estate Leaders",
      position: "bottom-center"
    }
  },
  { 
    src: "/carousel/1.jpg",
    caption: {
      description: "Engineer Donates Official Portraits to TDC",
      position: "bottom-right"
    }
  },
  { 
    src: "/carousel/2.jpeg",
    caption: {
      description: "Minister Adjei Inaugurates New TDC Board",
      position: "bottom-center"
    }
  },
  { 
    src: "/carousel/3.jpg",
    caption: {
      description: "TDC Launches 24-Hour Services",
      position: "bottom-right"
    }
  },
  { 
    src: "/carousel/4.jpeg",
    caption: {
      description: "TDC Introduces Premium Services",
      position: "bottom-left"
    }
  },
  { 
    src: "/carousel/6.jpg",
    caption: {
      description: "TDC Expands 24/7 Service Access",
      position: "bottom-left"
    }
  },
  { 
    src: "/carousel/7.jpg",
    caption: {
      description: "TDC Strengthens Customer Support",
      position: "bottom-left"
    }
  },
  { 
    src: "/carousel/8.jpg",
    caption: {
      description: "TDC Holds National Prayer & Thanksgiving",
      position: "bottom-center"
    }
  },
  { 
    src: "/carousel/9.jpeg",
    caption: {
      description: "TDC Board Inspects Project Sites",
      position: "bottom-right"
    }
  },
  { 
    src: "/carousel/10.jpeg",
    caption: {
      description: "Board Members Review of Ongoing Works",
      position: "bottom-left"
    }
  },
  { 
    src: "/carousel/11.jpeg",
    caption: {
      description: "TDC Directors Assess Progress on Projects",
      position: "bottom-center"
    }
  },
  { 
    src: "/carousel/12.jpeg",
    caption: {
      description: "TDC Celebrates Workers on May Day",
      position: "bottom-right"
    }
  },
  { 
    src: "/carousel/13.jpeg",
    caption: {
      description: "Honouring Workers at May Day 2025",
      position: "bottom-left"
    }
  },
  { 
    src: "/carousel/14.jpg",
    caption: {
      description: "TDC Joins National May Day Festivities",
      position: "bottom-center"
    }
  },
  { 
    src: "/carousel/16.jpg",
    caption: {
      description: "TDC at International Building & Investment Expo 2025",
      position: "bottom-left"
    }
  },
  { 
    src: "/carousel/17.jpg",
    caption: {
      description: "TDC MD Highlights Growth & Housing Projects",
      position: "bottom-center"
    }
  },
  { 
    src: "/carousel/18.jpeg",
    caption: {
      description: "MD Announces Upcoming 24-Hour Service Launch",
      position: "bottom-right"
    }
  },
  { 
    src: "/carousel/19.jpg",
    caption: {
      description: "Media Engagement: TDC’s Growth & Achievements",
      position: "bottom-center"
    }
  },
  { 
    src: "/carousel/20.jpg",
    caption: {
      description: "Showcasing TDC’s Transformation Journey",
      position: "bottom-center"
    }
  }
];

const Carousel: React.FC = () => {
  const getPositionClasses = (position: string = 'bottom-center') => {
    // Base classes with mobile-first approach: all captions at bottom-center on mobile
    // Optimized for single-line display on mobile with wider max-width
    const baseClasses = "absolute z-20 px-3 py-2 max-w-sm sm:px-4 sm:py-3 sm:max-w-md";
    const mobilePosition = "bottom-0 left-1/2 transform -translate-x-1/2";
    
    switch (position) {
      case 'bottom-left':
        return `${baseClasses} ${mobilePosition} sm:bottom-4 sm:left-4 sm:transform-none sm:translate-x-0`;
      case 'bottom-right':
        return `${baseClasses} ${mobilePosition} sm:bottom-4 sm:right-4 sm:left-auto sm:transform-none sm:translate-x-0`;
      case 'bottom-center':
        return `${baseClasses} ${mobilePosition} sm:bottom-4`;
      case 'top-left':
        return `${baseClasses} ${mobilePosition} sm:top-4 sm:bottom-auto sm:left-4 sm:transform-none sm:translate-x-0`;
      case 'top-right':
        return `${baseClasses} ${mobilePosition} sm:top-4 sm:bottom-auto sm:right-4 sm:left-auto sm:transform-none sm:translate-x-0`;
      case 'top-center':
        return `${baseClasses} ${mobilePosition} sm:top-4 sm:bottom-auto`;
      case 'center':
        return `${baseClasses} ${mobilePosition} sm:top-1/2 sm:bottom-auto sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2`;
      default:
        return `${baseClasses} ${mobilePosition} sm:bottom-4`;
    }
  };

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
    <>
    <section className="relative bg-gradient-to-br from-primary/5 to-accent/5 pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="relative w-full" data-carousel="static">
          {/* Carousel wrapper */}
          <div className="relative h-56 overflow-hidden rounded-lg md:h-140">
            {images.map((item, index) => (
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
                  src={item.src}
                  className="absolute block w-full h-full object-cover"
                  alt={`Slide ${index + 1}`}
                />
                
                {/* Caption Overlay */}
                {item.caption && (item.caption.title || item.caption.description) && (
                  <div className={getPositionClasses(item.caption.position)}>
                    <div className="bg-black/70 backdrop-blur-sm rounded-lg py-2 px-3 sm:py-2 sm:px-4 text-white shadow-lg border border-white/10">
                      {item.caption.title && (
                        <h3 className="text-xs sm:text-sm md:text-base font-bold mb-1 sm:mb-2 text-white leading-tight truncate sm:whitespace-normal">
                          {item.caption.title}
                        </h3>
                      )}
                      {item.caption.description && (
                        <p className="text-xs sm:text-xs md:text-base text-gray-200 leading-tight truncate sm:whitespace-normal sm:leading-relaxed">
                          {item.caption.description}
                        </p>
                      )}
                    </div>
                  </div>
                )}
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

    {/* Leadership Section */}
    <LeadershipSection />
  </>
);
};

export default Carousel;