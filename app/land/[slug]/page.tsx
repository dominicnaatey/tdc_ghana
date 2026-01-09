import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MapPin, Square, ArrowLeft, Phone, Mail, Calendar, Ruler, FileText, MapIcon } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

async function getLandPlot(slug: string) {
  const supabase = await createClient()

  const { data: plot, error } = await supabase.from("land_plots").select("*").eq("slug", slug).single()

  if (error || !plot) {
    return null
  }

  return plot
}

export default async function LandPlotPage({
  params,
}: {
  params: { slug: string }
}) {
  const plot = await getLandPlot(params.slug)

  if (!plot) {
    notFound()
  }

  const totalPrice = (plot.size_sqm || 0) * (plot.price_per_sqm || 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/land">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Land Plots
            </Link>
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Main Image */}
            <Card className="overflow-hidden">
              <div className="aspect-video">
                <img
                  src={plot.featured_image || "/placeholder.svg?height=400&width=600&query=land development site"}
                  alt={plot.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>

            {/* Plot Details */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-amber-100 text-amber-800">{plot.status}</Badge>
                    <Badge variant="outline">{plot.plot_type}</Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">GHS {plot.price_per_sqm?.toLocaleString()}/sqm</div>
                    <div className="text-2xl font-bold text-amber-800">GHS {totalPrice.toLocaleString()}</div>
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold">{plot.title}</CardTitle>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  {plot.location}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-100 rounded-lg">
                    <Square className="w-6 h-6 mx-auto mb-2 text-amber-700" />
                    <div className="font-semibold">{plot.size_sqm}</div>
                    <div className="text-sm text-gray-600">Square Meters</div>
                  </div>
                  <div className="text-center p-4 bg-gray-100 rounded-lg">
                    <Ruler className="w-6 h-6 mx-auto mb-2 text-amber-700" />
                    <div className="font-semibold">{plot.dimensions}</div>
                    <div className="text-sm text-gray-600">Dimensions</div>
                  </div>
                  <div className="text-center p-4 bg-gray-100 rounded-lg">
                    <MapIcon className="w-6 h-6 mx-auto mb-2 text-amber-700" />
                    <div className="font-semibold">{plot.plot_type}</div>
                    <div className="text-sm text-gray-600">Plot Type</div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div>
                  <h3 className="text-xl font-semibold mb-4">Plot Description</h3>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      {plot.description ||
                        "This prime land plot offers excellent development potential in a strategic location. The plot comes with clear title documentation and is ready for immediate development. Perfect for residential or commercial projects with easy access to major roads and utilities."}
                    </p>
                  </div>
                </div>

                {plot.features && (
                  <>
                    <Separator className="my-6" />
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Plot Features</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {plot.features.split(",").map((feature: string, index: number) => (
                          <div key={index} className="flex items-center text-gray-700">
                            <div className="w-2 h-2 bg-amber-600 rounded-full mr-3"></div>
                            {feature.trim()}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <Separator className="my-6" />

                <div>
                  <h3 className="text-xl font-semibold mb-4">Location Advantages</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900">Nearby Amenities</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Schools and educational facilities</li>
                        <li>• Healthcare centers</li>
                        <li>• Shopping centers</li>
                        <li>• Public transportation</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900">Infrastructure</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Electricity connection available</li>
                        <li>• Water supply access</li>
                        <li>• Paved road access</li>
                        <li>• Drainage systems</li>
                      </ul>
                    </div>
                  </div>
                </div>
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
                <Button className="w-full bg-amber-600 hover:bg-amber-700" size="lg">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now: +233 303 202 106
                </Button>
                <Button variant="outline" className="w-full bg-transparent" size="lg">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Inquiry
                </Button>
                <Button variant="outline" className="w-full bg-transparent" size="lg">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Site Visit
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Plot Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Title Status:</span>
                    <span className="font-semibold">Clear Title</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Zoning:</span>
                    <span className="font-semibold">{plot.zoning || "Mixed Use"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Survey:</span>
                    <span className="font-semibold">Completed</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Development Ready:</span>
                    <span className="font-semibold">Yes</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Documentation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <FileText className="w-4 h-4 mr-2" />
                  Site Plan
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <FileText className="w-4 h-4 mr-2" />
                  Survey Report
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <FileText className="w-4 h-4 mr-2" />
                  Title Documents
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Options</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Flexible payment plans available. We work with financial institutions to provide land acquisition
                  financing.
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

// Pre-generate static params for export mode
export async function generateStaticParams() {
  // Static list during export to avoid runtime/database dependencies
  return [
    { slug: 'lp001-tema-land' },
    { slug: 'lp002-accra-land' },
  ]
}

export const dynamicParams = true
// export const dynamic = 'force-static'
