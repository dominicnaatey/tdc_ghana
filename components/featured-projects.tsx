import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Bed, Bath, Square, ArrowRight } from "lucide-react"
import Link from "next/link"

const featuredProjects = [
  {
    id: 1,
    name: "Tema Gardens Estate",
    location: "Tema, Greater Accra Region",
    price: "GHS 250,000 - GHS 350,000",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1200,
    image: "/modern-ghanaian-townhouse.png",
    status: "Available",
    featured: true,
  },
  {
    id: 2,
    name: "Accra Heights Apartments",
    location: "East Legon, Accra",
    price: "GHS 180,000 - GHS 280,000",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 950,
    image: "/accra-luxury-apartments.png",
    status: "Available",
    featured: true,
  },
  {
    id: 3,
    name: "Community Villas",
    location: "Spintex, Accra",
    price: "GHS 320,000 - GHS 420,000",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 1500,
    image: "/ghanaian-family-villa.png",
    status: "Available",
    featured: false,
  },
]

export default function FeaturedProjects() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground font-serif mb-4">Featured Housing Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our latest housing developments designed to provide quality, affordable homes for families across
            Ghana.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project) => (
            <Card key={project.id} className="group hover:shadow-lg transition-shadow duration-300 border-border">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-accent text-accent-foreground">{project.status}</Badge>
                </div>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-semibold text-card-foreground font-serif">{project.name}</CardTitle>
                <div className="flex items-center text-muted-foreground text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  {project.location}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="text-lg font-semibold text-primary">{project.price}</div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-1" />
                    {project.bedrooms} Beds
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-4 w-4 mr-1" />
                    {project.bathrooms} Baths
                  </div>
                  <div className="flex items-center">
                    <Square className="h-4 w-4 mr-1" />
                    {project.sqft} sqft
                  </div>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group">
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
          >
            <Link href="/housing" className="flex items-center">
              View All Housing Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
