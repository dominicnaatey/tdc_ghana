import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { MapPin, Calendar, Users, DollarSign } from "lucide-react"
import Link from "next/link"
import { sampleProjects } from "@/lib/data/sample-projects"
import { format } from "date-fns"

async function getDevelopmentProjects() {
  // Use sample projects data instead of Supabase
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

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects found</h3>
        <p className="text-gray-600">Check back later for updates on our development projects.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Link key={project.id} href={`/projects/${project.slug}`} className="group">
          <article className="space-y-4">
            {project.featured_image && (
              <div className="aspect-[2/1] overflow-hidden rounded-md">
                <img
                  src={project.featured_image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}

            <div className="space-y-3">
              <h3 className="font-bold text-lg text-black group-hover:text-gray-700 transition-colors line-clamp-2 leading-tight">
                {project.title}
              </h3>

              {/* Project Details */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate max-w-20">{project.location.split(',')[0]}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{format(new Date(project.start_date), "MMM yyyy")}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{(project.beneficiaries / 1000).toFixed(0)}K</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={
                    project.status === "completed" 
                      ? "bg-green-100 text-green-800 text-xs" 
                      : project.status === "ongoing" 
                      ? "bg-blue-100 text-blue-800 text-xs" 
                      : "bg-yellow-100 text-yellow-800 text-xs"
                  }>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </Badge>
                </div>
              </div>

              {/* Pricing hidden */}
            </div>
          </article>
        </Link>
      ))}
    </div>
  )
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#0D3562] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Development Projects</h1>
            <p className="text-xl text-gray-100">
              Explore our major infrastructure and development initiatives that are transforming communities across
              Ghana.
            </p>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-12">
        {/* Stats Section */}
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-black mb-2">25+</div>
              <div className="text-sm text-gray-600">Active Projects</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-black mb-2">GHS 500M+</div>
              <div className="text-sm text-gray-600">Total Investment</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-black mb-2">250K+</div>
              <div className="text-sm text-gray-600">People Benefited</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-black mb-2">8</div>
              <div className="text-sm text-gray-600">Completed Projects</div>
            </CardContent>
          </Card>
        </div> */}

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
