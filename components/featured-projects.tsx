import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Users, ArrowRight, DollarSign } from "lucide-react"
import Link from "next/link"
import { getFeaturedProjects } from "@/lib/data/sample-projects"
import { format } from "date-fns"

export default function FeaturedProjects() {
  const featuredProjects = getFeaturedProjects().slice(0, 3) // Limit to 3 projects

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground font-serif mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our latest development projects that are transforming communities across Ghana.
          </p>
        </div>

        {/* Projects Grid - Similar to News Layout */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredProjects.map((project) => (
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
                    
                    {/* Budget */}
                    <div className="flex items-center space-x-1 text-sm font-semibold text-primary">
                      <DollarSign className="w-4 h-4" />
                      <span>GHS {(project.budget / 1000000).toFixed(0)}M</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
            asChild
          >
            <Link href="/projects" className="flex items-center">
              View All Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
