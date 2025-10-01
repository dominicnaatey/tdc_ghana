"use client";

import React, { useState, useEffect } from "react";

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
      title: "Modern Development",
      description: "State-of-the-art residential and commercial properties",
      position: "bottom-left"
    }
  },
  { 
    src: "/carousel/1.jpg",
    caption: {
      title: "Modern Development",
      description: "State-of-the-art residential and commercial properties",
      position: "bottom-left"
    }
  },
  { 
    src: "/carousel/2.jpg",
    caption: {
      title: "Quality Construction",
      description: "Built with premium materials and expert craftsmanship",
      position: "bottom-center"
    }
  },
  { 
    src: "/carousel/3.jpg",
    caption: {
      title: "Prime Locations",
      description: "Strategically located properties for maximum convenience",
      position: "bottom-right"
    }
  },
  { 
    src: "/carousel/4.jpg",
    caption: {
      title: "Sustainable Living",
      description: "Eco-friendly designs for a better tomorrow",
      position: "bottom-left"
    }
  },
  { 
    src: "/carousel/5.jpg",
    caption: {
      title: "Community Focus",
      description: "Building communities that bring people together",
      position: "bottom-center"
    }
  },
  { 
    src: "/carousel/6.jpg",
    caption: {
      title: "Investment Opportunity",
      description: "Secure your future with our premium properties",
      position: "bottom-right"
    }
  },
  { 
    src: "/carousel/7.jpg",
    caption: {
      title: "Luxury Amenities",
      description: "Experience comfort and convenience like never before",
      position: "bottom-left"
    }
  },
  { 
    src: "/carousel/8.jpg",
    caption: {
      title: "Professional Excellence",
      description: "Decades of experience in real estate development",
      position: "bottom-center"
    }
  },
  { 
    src: "/carousel/9.jpg",
    caption: {
      title: "Future Ready",
      description: "Properties designed for tomorrow's lifestyle",
      position: "bottom-right"
    }
  },
  { 
    src: "/carousel/10.jpg",
    caption: {
      title: "Trusted Partner",
      description: "Your reliable partner in property investment",
      position: "bottom-left"
    }
  },
  { 
    src: "/carousel/11.jpg",
    caption: {
      title: "Innovation",
      description: "Cutting-edge design meets functional living",
      position: "bottom-center"
    }
  },
  { 
    src: "/carousel/12.jpg",
    caption: {
      title: "Excellence",
      description: "Setting new standards in property development",
      position: "bottom-right"
    }
  },
  { 
    src: "/carousel/13.jpg",
    caption: {
      title: "Growth",
      description: "Expanding horizons in real estate development",
      position: "bottom-left"
    }
  },
  { 
    src: "/carousel/14.jpg",
    caption: {
      title: "Vision",
      description: "Creating spaces that inspire and elevate",
      position: "bottom-center"
    }
  },
  { 
    src: "/carousel/15.jpg",
    caption: {
      title: "Heritage",
      description: "Building on a foundation of trust and quality",
      position: "bottom-right"
    }
  },
  { 
    src: "/carousel/16.jpg",
    caption: {
      title: "Progress",
      description: "Advancing the future of urban development",
      position: "bottom-left"
    }
  },
  { 
    src: "/carousel/17.jpg",
    caption: {
      title: "Commitment",
      description: "Dedicated to delivering exceptional results",
      position: "bottom-center"
    }
  },
  { 
    src: "/carousel/18.jpg",
    caption: {
      title: "Success",
      description: "Proven track record of successful projects",
      position: "bottom-right"
    }
  },
  { 
    src: "/carousel/19.jpg",
    caption: {
      title: "Partnership",
      description: "Building lasting relationships with our clients",
      position: "bottom-center"
    }
  }
];

const Carousel: React.FC = () => {
  const getPositionClasses = (position: string = 'bottom-center') => {
    const baseClasses = "absolute z-20 px-4 py-3 max-w-md";
    
    switch (position) {
      case 'bottom-left':
        return `${baseClasses} bottom-4 left-4`;
      case 'bottom-right':
        return `${baseClasses} bottom-4 right-4`;
      case 'bottom-center':
        return `${baseClasses} bottom-4 left-1/2 transform -translate-x-1/2`;
      case 'top-left':
        return `${baseClasses} top-4 left-4`;
      case 'top-right':
        return `${baseClasses} top-4 right-4`;
      case 'top-center':
        return `${baseClasses} top-4 left-1/2 transform -translate-x-1/2`;
      case 'center':
        return `${baseClasses} top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`;
      default:
        return `${baseClasses} bottom-4 left-1/2 transform -translate-x-1/2`;
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
    <section className="relative bg-gradient-to-br from-primary/5 to-accent/5 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    <div className="bg-black/70 backdrop-blur-sm rounded-lg p-4 text-white shadow-lg border border-white/10">
                      {item.caption.title && (
                        <h3 className="text-lg md:text-xl font-bold mb-2 text-white leading-tight">
                          {item.caption.title}
                        </h3>
                      )}
                      {item.caption.description && (
                        <p className="text-sm md:text-base text-gray-200 leading-relaxed">
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
  );
};

export default Carousel;