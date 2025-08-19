"use client"

// Remove the duplicate Header import and render
// import Header from "@/components/header"
import Footer from "@/components/footer"
import HeroSection from "@/components/hero-section"
import FeaturedProjects from "@/components/featured-projects"
import NewsSection from "@/components/news-section"
import Carousel from "@/components/carousel"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Remove this line - header is already in root layout */}
      {/* <Header /> */}
      <main>
        <HeroSection />
        <Carousel />
        <FeaturedProjects />
        <NewsSection />
      </main>
      {/* Remove this line - footer is already in root layout */}

      {/* <Footer /> */}
    </div>
  )
}
