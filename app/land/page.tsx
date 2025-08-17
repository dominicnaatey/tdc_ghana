import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { MapPin, Square, Search, Filter, ArrowRight, Ruler } from "lucide-react"
import Link from "next/link"
import { createServerClient } from "@/lib/supabase/server"

async function getLandPlots() {
  const supabase = createServerClient()

  const { data: plots, error } = await supabase
    .from("land_plots")
    .select("*")
    .eq("status", "available")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching land plots:", error)
    return []
  }

  return plots || []
}

function PlotCardSkeleton() {
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
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  )
}

async function LandPlotsList() {
  const plots = await getLandPlots()

  if (plots.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No land plots found</h3>
        <p className="text-gray-600">Check back later for new land development opportunities.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {plots.map((plot) => (
        <Card key={plot.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="aspect-video overflow-hidden">
            <img
              src={plot.featured_image || "/placeholder.svg?height=300&width=400&query=land plot development site"}
              alt={plot.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                {plot.status}
              </Badge>
              <Badge variant="outline">{plot.plot_type}</Badge>
            </div>
            <CardTitle className="line-clamp-1 hover:text-amber-700 transition-colors">
              <Link href={`/land/${plot.slug}`}>{plot.title}</Link>
            </CardTitle>
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="w-4 h-4 mr-1" />
              {plot.location}
            </div>
            <div className="text-lg font-semibold text-amber-800">GHS {plot.price_per_sqm?.toLocaleString()}/sqm</div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
              <div className="flex items-center">
                <Square className="w-4 h-4 mr-1" />
                {plot.size_sqm} sqm
              </div>
              <div className="flex items-center">
                <Ruler className="w-4 h-4 mr-1" />
                {plot.dimensions}
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-4">
              Total: GHS {((plot.size_sqm || 0) * (plot.price_per_sqm || 0)).toLocaleString()}
            </div>
            <Button className="w-full bg-amber-600 hover:bg-amber-700" asChild>
              <Link href={`/land/${plot.slug}`}>
                View Details <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function LandPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-amber-700 to-amber-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Land Development</h1>
            <p className="text-xl text-amber-100">
              Discover prime land opportunities for residential and commercial development across strategic locations in
              Ghana.
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
              Find Your Perfect Plot
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <Input placeholder="Search by location..." className="bg-white" />
              <Select>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Plot Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="mixed">Mixed Use</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Size Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-500">Under 500 sqm</SelectItem>
                  <SelectItem value="500-1000">500 - 1,000 sqm</SelectItem>
                  <SelectItem value="1000-2000">1,000 - 2,000 sqm</SelectItem>
                  <SelectItem value="2000+">Above 2,000 sqm</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-amber-700 hover:bg-amber-800">
                <Filter className="w-4 h-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Plots Grid */}
        <Suspense
          fallback={
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <PlotCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          <LandPlotsList />
        </Suspense>
      </div>
    </div>
  )
}
