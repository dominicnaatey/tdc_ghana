import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { MapPin, Bed, Bath, Square, Search, Filter, ArrowRight } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

interface HousingProject {
  id: number
  name: string
  description: string
  location: string
  status: string
  project_type: string
  featured_image: string | null
  price_range: string | null
  price_min: number | null
  price_max: number | null
  bedrooms: number | null
  bathrooms: number | null
  floor_area: number | null
  sqft: number | null
  slug: string
  created_at: string
}

async function getHousingProjects(): Promise<HousingProject[]> {
  // Temporarily using sample data to avoid Supabase connection issues
  const sampleProjects: HousingProject[] = [
    {
      id: 1,
      name: "Modern Family Home",
      description: "A beautiful 3-bedroom family home with modern amenities",
      location: "Tema, Ghana",
      status: "available",
      project_type: "residential",
      featured_image: "/placeholder.jpg",
      price_range: "$150,000 - $200,000",
      price_min: 150000,
      price_max: 200000,
      bedrooms: 3,
      bathrooms: 2,
      floor_area: 1200,
      sqft: 1200,
      slug: "modern-family-home",
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      name: "Luxury Villa",
      description: "Spacious villa with premium finishes and garden",
      location: "Accra, Ghana",
      status: "available",
      project_type: "residential",
      featured_image: "/placeholder.jpg",
      price_range: "$300,000 - $400,000",
      price_min: 300000,
      price_max: 400000,
      bedrooms: 4,
      bathrooms: 3,
      floor_area: 2000,
      sqft: 2000,
      slug: "luxury-villa",
      created_at: new Date().toISOString()
    }
  ]

  return sampleProjects
}

function ProjectCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video">
        <Skeleton className="w-full h-full" />
      </div>
      <CardHeader>
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-6 w-1/2" />
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  )
}

async function HousingProjectsList() {
  const projects = await getHousingProjects()

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No housing projects found</h3>
        <p className="text-gray-600">Check back later for new housing developments.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project: HousingProject) => (
        <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="aspect-video overflow-hidden">
            <img
              src={project.featured_image || "/placeholder.svg?height=300&width=400&query=modern housing development"}
              alt={project.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="secondary" className="bg-cyan-100 text-cyan-800">
                {project.status}
              </Badge>
              <Badge variant="outline">{project.project_type}</Badge>
            </div>
            <CardTitle className="line-clamp-1 hover:text-cyan-700 transition-colors">
              <Link href={`/housing/${project.slug}`}>{project.name}</Link>
            </CardTitle>
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="w-4 h-4 mr-1" />
              {project.location}
            </div>
            <div className="text-lg font-semibold text-cyan-800">
              GHS {project.price_min?.toLocaleString()} - GHS {project.price_max?.toLocaleString()}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
              <div className="flex items-center">
                <Bed className="w-4 h-4 mr-1" />
                {project.bedrooms} Beds
              </div>
              <div className="flex items-center">
                <Bath className="w-4 h-4 mr-1" />
                {project.bathrooms} Baths
              </div>
              <div className="flex items-center">
                <Square className="w-4 h-4 mr-1" />
                {project.sqft} sqft
              </div>
            </div>
            <Button className="w-full" asChild>
              <Link href={`/housing/${project.slug}`}>
                View Details <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function HousingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-cyan-800 to-cyan-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Housing Projects</h1>
            <p className="text-xl text-cyan-100">
              Discover quality, affordable housing developments designed for modern Ghanaian families across the Greater
              Accra Region.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Find Your Perfect Home
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <Input placeholder="Search by location..." className="bg-white" />
              <Select>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Project Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartments</SelectItem>
                  <SelectItem value="townhouse">Townhouses</SelectItem>
                  <SelectItem value="villa">Villas</SelectItem>
                  <SelectItem value="estate">Estate Homes</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-200000">Under GHS 200,000</SelectItem>
                  <SelectItem value="200000-350000">GHS 200,000 - 350,000</SelectItem>
                  <SelectItem value="350000-500000">GHS 350,000 - 500,000</SelectItem>
                  <SelectItem value="500000+">Above GHS 500,000</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-cyan-800 hover:bg-cyan-900">
                <Filter className="w-4 h-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Projects Grid */}
        <Suspense
          fallback={
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProjectCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          <HousingProjectsList />
        </Suspense>
      </div>
    </div>
  )
}
