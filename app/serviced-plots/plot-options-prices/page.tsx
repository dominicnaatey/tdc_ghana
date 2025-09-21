"use client"

import Image from "next/image"
import { useState } from "react"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"

export default function PlotOptionsPricesPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const plotImages = [
    {
      id: 1,
      src: "/serviced-plots/tdcplotland1.jpg",
      alt: "TDC Ghana serviced plot in Tema Community 25"
    },
    {
      id: 2,
      src: "/serviced-plots/tdcplotland2.jpg",
      alt: "TDC Ghana serviced plot in Tema Community 26"
    },
    {
      id: 3,
      src: "/serviced-plots/tdcplotland3.jpg",
      alt: "TDC Ghana serviced plots development"
    }
  ]

  const lightboxSlides = plotImages.map(image => ({
    src: image.src,
    alt: image.alt
  }))

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Title */}
      <div className="bg-[#0D3562] border-b border-gray-100">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-100 mb-4">
              TDC Ghana Ltd offers serviced plots located in Tema Communities 25 and 26
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
              Premium serviced plots with complete infrastructure including electricity, water, drainage, and paved roads in prime locations.
            </p>
          </div>
        </div>
      </div>

      {/* Main Images Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* First Large Image */}
          {/* <div className="mb-8">
            <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={plotImages[0].src}
                alt={plotImages[0].alt}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div> */}

          {/* Two Images Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div 
              className="relative w-full h-[40vh] md:h-[50vh] lg:h-[60vh] rounded-lg overflow-hidden shadow-xl cursor-pointer hover:shadow-2xl transition-shadow duration-300"
              onClick={() => openLightbox(0)}
            >
              <Image
                src={plotImages[0].src}
                alt={plotImages[0].alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div 
              className="relative w-full h-[40vh] md:h-[50vh] lg:h-[60vh] rounded-lg overflow-hidden shadow-xl cursor-pointer hover:shadow-2xl transition-shadow duration-300"
              onClick={() => openLightbox(1)}
            >
              <Image
                src={plotImages[1].src}
                alt={plotImages[1].alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div 
              className="relative w-full h-[40vh] md:h-[50vh] lg:h-[60vh] rounded-lg overflow-hidden shadow-xl cursor-pointer hover:shadow-2xl transition-shadow duration-300"
              onClick={() => openLightbox(2)}
            >
              <Image
                src={plotImages[2].src}
                alt={plotImages[2].alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Component */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={lightboxSlides}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, 0.9)" },
        }}
        render={{
          buttonPrev: lightboxIndex <= 0 ? () => null : undefined,
          buttonNext: lightboxIndex >= plotImages.length - 1 ? () => null : undefined,
        }}
      />
     
    </div>
  )
}