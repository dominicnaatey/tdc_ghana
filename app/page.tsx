"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import HeroSection from "@/components/hero-section"
import FeaturedProjects from "@/components/featured-projects"
import NewsSection from "@/components/news-section"
import Carousel from "@/components/carousel"
import { X } from "lucide-react"

export default function HomePage() {
  const [showAlert, setShowAlert] = useState(true)

  if (!showAlert) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Image Carousel */}
          <Carousel />
          <HeroSection />
          <FeaturedProjects />
          <NewsSection />
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Dismissible Important Notice Banner */}
      {showAlert && (
        <div className="bg-red-600 text-white py-4 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center text-center relative">
              <div className="bg-white text-red-600 rounded-full p-2 mr-4 flex-shrink-0">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">IMPORTANT NOTICE TO ALL TDC RENT DEFAULTERS</h3>
                <p className="text-sm md:text-base">
                  BE ADVISED TO SETTLE OUTSTANDING ARREARS OF YOUR HOUSES, SHOPS AND OFFICES WITHIN THIS PERIOD. 
                  TO AVOID DISRUPTION OF YOUR BUSINESS OPERATION OR LOSS OF ACCESS TO YOUR PREMISES.
                  <span className="font-semibold"> VISIT TDC HEAD OFFICE AT COMMUNITY 1, TEMA</span>
                </p>
              </div>
              {/* Close Button */}
              <button
                onClick={() => setShowAlert(false)}
                className="absolute top-0 right-0 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all duration-200 flex-shrink-0"
                aria-label="Close alert"
              >
                <X className="w-5 h-5 text-red-600" />
              </button>
            </div>
          </div>
        </div>
      )}
      
      <main>
        {/* Image Carousel */}
        <section className="py-8 px-4">
          <Carousel />
        </section>
        <HeroSection />
        <FeaturedProjects />
        <NewsSection />
      </main>
      <Footer />
    </div>
  )
}
