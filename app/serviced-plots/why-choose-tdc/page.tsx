import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Shield, 
  Award, 
  Users, 
  MapPin, 
  Zap, 
  Handshake, 
  TrendingUp, 
  Clock, 
  CheckCircle2,
  Star,
  Phone,
  Mail,
  ArrowRight
} from "lucide-react"

export default function WhyChooseTDCPage() {
  const advantages = [
    {
      icon: Shield,
      title: "Guaranteed Title Deeds",
      description: "All our plots come with secure, legally verified title deeds. Your investment is protected with proper documentation and legal backing.",
      features: ["Legal verification", "Secure ownership", "No hidden issues"]
    },
    {
      icon: Zap,
      title: "Fully Serviced Infrastructure",
      description: "Every plot includes complete infrastructure - electricity, water, drainage, and paved roads. Move in and start building immediately.",
      features: ["Electricity connection", "Water supply", "Drainage systems", "Paved access roads"]
    },
    {
      icon: MapPin,
      title: "Prime Locations",
      description: "Strategically located in fast-growing areas of Accra with excellent connectivity and proximity to essential amenities.",
      features: ["Growing neighborhoods", "Easy access", "Near amenities", "Future development"]
    },
    {
      icon: TrendingUp,
      title: "High Investment Returns",
      description: "Our plots are in areas with proven appreciation potential. Benefit from capital growth and rental income opportunities.",
      features: ["Capital appreciation", "Rental potential", "Market growth", "ROI tracking"]
    },
    {
      icon: Handshake,
      title: "Flexible Payment Plans",
      description: "Choose from various payment options that suit your budget. From outright purchase to extended payment plans.",
      features: ["Multiple payment options", "No hidden fees", "Transparent pricing", "Budget-friendly"]
    },
    {
      icon: Users,
      title: "Expert Support Team",
      description: "Our experienced team provides guidance throughout your journey - from selection to ownership and beyond.",
      features: ["Professional guidance", "24/7 support", "Expert advice", "After-sales service"]
    }
  ]

  const testimonials = [
    {
      name: "Kwame Asante",
      role: "Property Investor",
      content: "TDC Ghana delivered exactly what they promised. The plot was ready with all infrastructure, and the documentation process was seamless.",
      rating: 5
    },
    {
      name: "Akosua Mensah",
      role: "Homeowner",
      content: "I'm impressed with the quality of infrastructure and the ongoing support. My family now has a beautiful home in a secure, well-planned community.",
      rating: 5
    },
    {
      name: "John Osei",
      role: "Business Owner",
      content: "The commercial plot I purchased has exceeded my expectations. The location is perfect for my business, and the value has already appreciated significantly.",
      rating: 5
    }
  ]

  const achievements = [
    { number: "500+", label: "Satisfied Customers" },
    { number: "50+", label: "Completed Projects" },
    { number: "15+", label: "Years Experience" },
    { number: "99%", label: "Customer Satisfaction" }
  ]

  const whyChooseReasons = [
    "Transparent and honest dealings",
    "No hidden costs or surprise fees",
    "Proven track record of delivery",
    "Strong legal and technical team",
    "Commitment to quality infrastructure",
    "Long-term customer relationships",
    "Continuous community development",
    "Environmental sustainability focus"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
            <Award className="w-4 h-4 mr-2" />
            Award-Winning Developer
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Why Choose <span className="text-green-600">TDC Plots?</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover what makes TDC Ghana the preferred choice for discerning property investors and homeowners. 
            Experience the difference of working with Ghana's most trusted land development company.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-green-600">{achievement.number}</div>
                <div className="text-sm text-gray-600">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Advantages */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Unique Advantages</h2>
            <p className="text-lg text-gray-600">What sets us apart from other developers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => {
              const IconComponent = advantage.icon
              return (
                <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-green-600" />
                    </div>
                    <CardTitle className="text-xl font-bold">{advantage.title}</CardTitle>
                    <CardDescription>{advantage.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {advantage.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us List */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Commitment to Excellence</h2>
            <p className="text-lg text-gray-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyChooseReasons.map((reason, index) => (
              <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-green-500 mr-4 flex-shrink-0" />
                <span className="text-gray-800 font-medium">{reason}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600">Real experiences from satisfied plot owners</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex items-center mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Proven Process</h2>
            <p className="text-lg text-gray-600">From inquiry to ownership in simple steps</p>
          </div>
          
          <div className="space-y-8">
            {[
              { step: "1", title: "Consultation & Site Visit", description: "Meet with our team and visit available plots to find your perfect match" },
              { step: "2", title: "Documentation & Payment", description: "Complete paperwork and choose your preferred payment plan" },
              { step: "3", title: "Infrastructure Development", description: "We develop the infrastructure while keeping you updated on progress" },
              { step: "4", title: "Handover & Title Transfer", description: "Receive your fully serviced plot with complete legal documentation" }
            ].map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-6">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Success Stories?</h2>
          <p className="text-xl mb-8 opacity-90">
            Experience the TDC difference. Let us help you secure your future with a premium serviced plot.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              Schedule a Consultation
            </Button>
            <Button size="lg" variant="outline" className="flex items-center text-white border-white hover:bg-white hover:text-green-600">
              <ArrowRight className="w-5 h-5 mr-2" />
              View Available Plots
            </Button>
          </div>
          <div className="mt-8 pt-8 border-t border-green-500 opacity-75">
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                +233 123 456 789
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                info@tdcghana.com
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Mon-Fri: 8AM-6PM
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}