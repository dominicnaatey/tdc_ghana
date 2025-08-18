"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import HeroSection from "@/components/hero-section"
import FeaturedProjects from "@/components/featured-projects"
import NewsSection from "@/components/news-section"
import Carousel from "@/components/carousel"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <Carousel />
        <FeaturedProjects />
        <NewsSection />
      </main>
      <Footer />
    </div>
  )
}
