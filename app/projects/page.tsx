import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { MapPin, Calendar, Users, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import { sampleProjects } from "@/lib/data/sample-projects"

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

function ProjectsList() {
  const projects = sampleProjects

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
              <Link href={`/projects/${project.slug}`}>{project.title}</Link>
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
                <Link href={`/projects/${project.slug}`}>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-black mb-2">7+</div>
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
              <div className="text-3xl font-bold text-black mb-2">300K+</div>
              <div className="text-sm text-gray-600">People Benefited</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-black mb-2">3</div>
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
