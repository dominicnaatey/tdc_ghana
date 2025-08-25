import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { 
  MapPin, 
  Calendar, 
  Users, 
  ArrowLeft, 
  Phone, 
  Mail, 
  DollarSign,
  CheckCircle,
  Clock,
  Building,
  Target
} from "lucide-react"
import Link from "next/link"
import { getProjectBySlug } from "@/lib/data/sample-projects"
import { format } from "date-fns"

export default async function ProjectPage({
  params,
}: {
  params: { slug: string }
}) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'ongoing':
        return 'bg-blue-100 text-blue-800'
      case 'planning':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/projects">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Link>
          </Button>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Badge 
                  className={`${getStatusColor(project.status)} border-0`}
                >
                  {project.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                  {project.status === 'ongoing' && <Clock className="w-3 h-3 mr-1" />}
                  {project.status === 'planning' && <Target className="w-3 h-3 mr-1" />}
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </Badge>
                <Badge variant="outline">{project.project_type}</Badge>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {project.title}
              </h1>
              
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                <span className="text-lg">{project.location}</span>
              </div>
              
              <p className="text-xl text-gray-700 leading-relaxed max-w-3xl">
                {project.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Image */}
            <Card className="overflow-hidden">
              <div className="aspect-video">
                <img
                  src={project.featured_image || "/placeholder.svg?height=500&width=800&query=development project"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>

            {/* Project Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Project Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Timeline</h4>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>
                          {format(new Date(project.start_date), 'MMM yyyy')} - {format(new Date(project.completion_date), 'MMM yyyy')}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Beneficiaries</h4>
                      <div className="flex items-center text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        <span>{project.beneficiaries.toLocaleString()} people</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Investment</h4>
                      <div className="flex items-center text-gray-600">
                        <DollarSign className="w-4 h-4 mr-2" />
                        <span className="text-lg font-semibold">{formatCurrency(project.budget)}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Project Type</h4>
                      <Badge variant="secondary" className="bg-cyan-100 text-cyan-800">
                        {project.project_type}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Facilities & Features */}
                {(project.facilities || project.features) && (
                  <>
                    <Separator />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {project.facilities && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Facilities</h4>
                          <ul className="space-y-2">
                            {project.facilities.map((facility, index) => (
                              <li key={index} className="flex items-center text-gray-600">
                                <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                                {facility}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {project.features && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Features</h4>
                          <ul className="space-y-2">
                            {project.features.map((feature, index) => (
                              <li key={index} className="flex items-center text-gray-600">
                                <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Get More Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-[#0D3562] hover:bg-[#0D3562]/90" size="lg">
                  <Phone className="w-4 h-4 mr-2" />
                  Call: +233 303 202 106
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Inquiry
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Site Visit
                </Button>
              </CardContent>
            </Card>

            {/* Project Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Project Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-[#0D3562] mb-1">
                    {formatCurrency(project.budget)}
                  </div>
                  <div className="text-sm text-gray-600">Total Investment</div>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-[#0D3562] mb-1">
                    {project.beneficiaries.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">People Benefited</div>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-[#0D3562] mb-1">
                    {Math.ceil((new Date(project.completion_date).getTime() - new Date(project.start_date).getTime()) / (1000 * 60 * 60 * 24 * 365 * 12)) * 12}
                  </div>
                  <div className="text-sm text-gray-600">Project Duration (Months)</div>
                </div>
              </CardContent>
            </Card>

            {/* Related Projects */}
            <Card>
              <CardHeader>
                <CardTitle>Related Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <p className="text-gray-600 mb-4">Explore similar projects</p>
                  <Button variant="outline" asChild className="w-full">
                    <Link href={`/projects?type=${project.project_type}`}>
                      View {project.project_type} Projects
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}