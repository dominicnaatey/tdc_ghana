import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { MapPin, Calendar, Users, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import { createServerClient } from "@/lib/supabase/server"

async function getDevelopmentProjects() {
  const supabase = createServerClient()

  const { data: projects, error } = await supabase
    .from("development_projects")
    .select("*")
    .order("start_date", { ascending: false })

  if (error) {
    console.error("Error fetching development projects:", error)
    return []
  }

  return projects || []
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
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-10 w-full mt-4" />
        </div>
      </CardContent>
    </Card>
  )
}

async function ProjectsList() {
  const projects = await getDevelopmentProjects()

  // Mock data for demonstration
  const mockProjects = [
    {
      id: 1,
      title: "Tema Port Expansion Infrastructure",
      description:
        "Major infrastructure development to support Ghana's largest port with new roads, utilities, and commercial facilities.",
      location: "Tema, Greater Accra Region",
      status: "ongoing",
      start_date: "2023-01-15",
      completion_date: "2025-12-31",
      budget: 45000000,
      beneficiaries: 50000,
      featured_image: "/tema-port-infrastructure.png",
      project_type: "Infrastructure",
    },
    {
      id: 2,
      title: "Affordable Housing Initiative - Phase 3",
      description: "Construction of 2,000 affordable housing units across multiple locations in Greater Accra Region.",
      location: "Multiple Locations, Greater Accra",
      status: "ongoing",
      start_date: "2023-06-01",
      completion_date: "2026-05-31",
      budget: 120000000,
      beneficiaries: 8000,
      featured_image: "/affordable-housing-phase3.png",
      project_type: "Housing",
    },
    {
      id: 3,
      title: "Community Center Development Program",
      description: "Building modern community centers with healthcare facilities, schools, and recreational areas.",
      location: "Tema and Surrounding Areas",
      status: "completed",
      start_date: "2022-03-01",
      completion_date: "2024-02-28",
      budget: 25000000,
      beneficiaries: 75000,
      featured_image: "/community-centers.png",
      project_type: "Community",
    },
    {
      id: 4,
      title: "Industrial Zone Development",
      description:
        "Creating a modern industrial zone with manufacturing facilities, logistics hubs, and supporting infrastructure.",
      location: "Tema Industrial Area",
      status: "planning",
      start_date: "2024-09-01",
      completion_date: "2027-08-31",
      budget: 200000000,
      beneficiaries: 25000,
      featured_image: "/industrial-zone.png",
      project_type: "Industrial",
    },
    {
      id: 5,
      title: "Green Energy Infrastructure",
      description: "Installation of solar power systems and energy-efficient infrastructure across TDC developments.",
      location: "Multiple TDC Sites",
      status: "ongoing",
      start_date: "2023-09-01",
      completion_date: "2025-08-31",
      budget: 35000000,
      beneficiaries: 100000,
      featured_image: "/green-energy.png",
      project_type: "Energy",
    },
    {
      id: 6,
      title: "Water and Sanitation Upgrade",
      description:
        "Comprehensive upgrade of water supply and sanitation systems serving residential and commercial areas.",
      location: "Tema Metropolitan Area",
      status: "completed",
      start_date: "2021-01-01",
      completion_date: "2023-12-31",
      budget: 18000000,
      beneficiaries: 150000,
      featured_image: "/water-sanitation.png",
      project_type: "Utilities",
    },
  ]

  const allProjects = projects.length > 0 ? projects : mockProjects

  if (allProjects.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects found</h3>
        <p className="text-gray-600">Check back later for updates on our development projects.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {allProjects.map((project) => (
        <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="aspect-video overflow-hidden">
            <img
              src={project.featured_image || "/placeholder.svg?height=300&width=400&query=development project"}
              alt={project.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge
                variant={
                  project.status === "completed" ? "default" : project.status === "ongoing" ? "secondary" : "outline"
                }
                className={
                  project.status === "completed"
                    ? "bg-green-100 text-green-800"
                    : project.status === "ongoing"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                }
              >
                {project.status === "completed" && <CheckCircle className="w-3 h-3 mr-1" />}
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </Badge>
              <Badge variant="outline">{project.project_type}</Badge>
            </div>
            <CardTitle className="line-clamp-2 hover:text-cyan-700 transition-colors">
              <Link href={`/projects/${project.id}`}>{project.title}</Link>
            </CardTitle>
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              {project.location}
            </div>
            <p className="text-gray-600 line-clamp-2 text-sm">{project.description}</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(project.start_date).getFullYear()} - {new Date(project.completion_date).getFullYear()}
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-1" />
                  {project.beneficiaries?.toLocaleString()} people
                </div>
              </div>
              <div className="text-lg font-semibold text-cyan-800">Budget: GHS {project.budget?.toLocaleString()}</div>
              <Button className="w-full" asChild>
                <Link href={`/projects/${project.id}`}>
                  View Details <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-800 to-green-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Development Projects</h1>
            <p className="text-xl text-green-100">
              Explore our major infrastructure and development initiatives that are transforming communities across
              Ghana.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-700 mb-2">15+</div>
              <div className="text-sm text-gray-600">Active Projects</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-700 mb-2">GHS 500M+</div>
              <div className="text-sm text-gray-600">Total Investment</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-700 mb-2">250K+</div>
              <div className="text-sm text-gray-600">People Benefited</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-700 mb-2">8</div>
              <div className="text-sm text-gray-600">Completed Projects</div>
            </CardContent>
          </Card>
        </div>

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
          <ProjectsList />
        </Suspense>
      </div>
    </div>
  )
}
