import Header from "@/components/header"
import Footer from "@/components/footer"
import HeroSection from "@/components/hero-section"
import FeaturedProjects from "@/components/featured-projects"
import NewsSection from "@/components/news-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturedProjects />
        <NewsSection />
      </main>
      <Footer />
    </div>
  )
}
