import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { 
  Home, 
  Building2, 
  MapPin, 
  Zap, 
  Droplets, 
  Wifi, 
  Shield, 
  Car, 
  Trees, 
  Users,
  CheckCircle,
  ArrowRight
} from "lucide-react"
import Link from "next/link"

export default function ResidentialCommercialPage() {
  const residentialFeatures = [
    {
      icon: <Home className="h-6 w-6" />,
      title: "Family-Friendly Design",
      description: "Spacious plots designed with families in mind, featuring safe neighborhoods and community spaces."
    },
    {
      icon: <Trees className="h-6 w-6" />,
      title: "Green Spaces",
      description: "Integrated parks and recreational areas for outdoor activities and community gatherings."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "24/7 Security",
      description: "Gated community with round-the-clock security personnel and surveillance systems."
    },
    {
      icon: <Car className="h-6 w-6" />,
      title: "Ample Parking",
      description: "Dedicated parking spaces and wide driveways for multiple vehicles per household."
    }
  ]

  const commercialFeatures = [
    {
      icon: <Building2 className="h-6 w-6" />,
      title: "Strategic Location",
      description: "Prime commercial locations with high foot traffic and excellent visibility for businesses."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Business Community",
      description: "Join a thriving business ecosystem with networking opportunities and shared resources."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Reliable Power",
      description: "Uninterrupted power supply with backup generators to keep your business running."
    },
    {
      icon: <Wifi className="h-6 w-6" />,
      title: "High-Speed Internet",
      description: "Fiber optic internet connectivity for modern business operations and digital commerce."
    }
  ]

  const sharedAmenities = [
    "Underground utilities (water, electricity, sewage)",
    "Paved roads and walkways",
    "Street lighting throughout",
    "Drainage and flood management systems",
    "Waste management services",
    "Emergency services access",
    "Public transportation connectivity",
    "Landscaped common areas"
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Residential & Commercial Plots
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Discover the perfect plot for your dream home or thriving business
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-[#DA7A0B] text-white">
                View Available Plots
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900">
                Schedule Site Visit
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Residential Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-100 text-green-800">Residential Plots</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Build Your Dream Home
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our residential plots offer the perfect foundation for your family's future, 
              combining modern amenities with peaceful living environments.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {residentialFeatures.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full text-green-600 w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Residential Plot Sizes</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 border rounded-lg">
                <h4 className="text-xl font-semibold mb-2">Standard</h4>
                <p className="text-3xl font-bold text-accent mb-2">500m²</p>
                <p className="text-gray-600">Perfect for single-family homes</p>
              </div>
              <div className="text-center p-6 border rounded-lg bg-accent/5 border-accent">
                <Badge className="mb-2 bg-accent text-white">Most Popular</Badge>
                <h4 className="text-xl font-semibold mb-2">Premium</h4>
                <p className="text-3xl font-bold text-accent mb-2">750m²</p>
                <p className="text-gray-600">Spacious plots with garden space</p>
              </div>
              <div className="text-center p-6 border rounded-lg">
                <h4 className="text-xl font-semibold mb-2">Executive</h4>
                <p className="text-3xl font-bold text-accent mb-2">1000m²</p>
                <p className="text-gray-600">Luxury plots for grand homes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Commercial Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-800">Commercial Plots</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Grow Your Business
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Strategic commercial plots designed to maximize your business potential 
              with excellent accessibility and modern infrastructure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {commercialFeatures.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full text-blue-600 w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Commercial Plot Options</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold mb-2">Retail</h4>
                <p className="text-2xl font-bold text-accent mb-2">200-500m²</p>
                <p className="text-gray-600">Shops & boutiques</p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold mb-2">Office</h4>
                <p className="text-2xl font-bold text-accent mb-2">300-800m²</p>
                <p className="text-gray-600">Professional services</p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold mb-2">Industrial</h4>
                <p className="text-2xl font-bold text-accent mb-2">1000-5000m²</p>
                <p className="text-gray-600">Manufacturing & warehouses</p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold mb-2">Mixed-Use</h4>
                <p className="text-2xl font-bold text-accent mb-2">500-2000m²</p>
                <p className="text-gray-600">Residential + commercial</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shared Amenities Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              World-Class Infrastructure
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Every plot comes with comprehensive infrastructure and amenities 
              designed for modern living and business operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sharedAmenities.map((amenity, index) => (
              <div key={index} className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-sm">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Secure Your Plot?
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            Join hundreds of satisfied customers who have built their dreams with TDC Ghana
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/serviced-plots/plot-options-prices">
              <Button size="lg" className="bg-white text-accent hover:bg-gray-100">
                View Pricing <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-accent">
                Contact Us Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}