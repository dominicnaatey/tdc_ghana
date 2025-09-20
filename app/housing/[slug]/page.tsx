import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MapPin, Bed, Bath, Square, ArrowLeft, Phone, Mail, Calendar, Users } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

async function getHousingProject(slug: string) {
  const supabase = await createClient()

  // Restructure query to fix TypeScript error
  const query = supabase.from("housing_projects").select("*")
  const { data: project, error } = await query.eq("slug", slug).single()

  if (error || !project) {
    return null
  }

  return project
}

export default async function HousingProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getHousingProject(slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/housing">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Housing Projects
            </Link>
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Main Image */}
            <Card className="overflow-hidden">
              <div className="aspect-video">
                <img
                  src={project.featured_image || "/placeholder.svg?height=400&width=600&query=housing development"}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>

            {/* Project Details */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-cyan-100 text-cyan-800">{project.status}</Badge>
                    <Badge variant="outline">{project.project_type}</Badge>
                  </div>
                  <div className="text-2xl font-bold text-cyan-800">
                    GHS {project.price_min?.toLocaleString()} - GHS {project.price_max?.toLocaleString()}
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold">{project.name}</CardTitle>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  {project.location}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-100 rounded-lg">
                    <Bed className="w-6 h-6 mx-auto mb-2 text-cyan-700" />
                    <div className="font-semibold">{project.bedrooms}</div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                  </div>
                  <div className="text-center p-4 bg-gray-100 rounded-lg">
                    <Bath className="w-6 h-6 mx-auto mb-2 text-cyan-700" />
                    <div className="font-semibold">{project.bathrooms}</div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                  </div>
                  <div className="text-center p-4 bg-gray-100 rounded-lg">
                    <Square className="w-6 h-6 mx-auto mb-2 text-cyan-700" />
                    <div className="font-semibold">{project.sqft}</div>
                    <div className="text-sm text-gray-600">Sq Ft</div>
                  </div>
                  <div className="text-center p-4 bg-gray-100 rounded-lg">
                    <Users className="w-6 h-6 mx-auto mb-2 text-cyan-700" />
                    <div className="font-semibold">{project.total_units}</div>
                    <div className="text-sm text-gray-600">Total Units</div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div>
                  <h3 className="text-xl font-semibold mb-4">Project Description</h3>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      {project.description ||
                        "This modern housing development offers quality homes designed for contemporary Ghanaian families. Each unit features modern amenities, quality finishes, and is located in a well-planned community with access to essential services and infrastructure."}
                    </p>
                  </div>
                </div>

                {project.amenities && (
                  <>
                    <Separator className="my-6" />
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Amenities & Features</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {project.amenities.split(",").map((amenity: string, index: number) => (
                          <div key={index} className="flex items-center text-gray-700">
                            <div className="w-2 h-2 bg-cyan-600 rounded-full mr-3"></div>
                            {amenity.trim()}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" size="lg">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now: +233 303 202 105
                </Button>
                <Button variant="outline" className="w-full bg-transparent" size="lg">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Inquiry
                </Button>
                <Button variant="outline" className="w-full bg-transparent" size="lg">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Visit
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Completion:</span>
                    <span className="font-semibold">
                      {project.completion_date ? new Date(project.completion_date).getFullYear() : "TBD"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Units Available:</span>
                    <span className="font-semibold">{project.available_units || project.total_units}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Plans:</span>
                    <span className="font-semibold">Available</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financing Options</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  We offer flexible payment plans and work with major financial institutions to help make homeownership
                  accessible.
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  Learn About Financing
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
