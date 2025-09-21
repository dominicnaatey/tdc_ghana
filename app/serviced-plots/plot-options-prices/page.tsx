import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, MapPin, Ruler, DollarSign, Calendar, Phone, Mail } from "lucide-react"

export default function PlotOptionsPricesPage() {
  const plotOptions = [
    {
      id: 1,
      type: "Residential Standard",
      size: "50ft x 100ft",
      area: "5,000 sq ft",
      price: "$15,000",
      monthlyPayment: "$625",
      features: [
        "Fully serviced with utilities",
        "Paved access roads",
        "Street lighting",
        "Drainage system",
        "Security fence",
        "Title deed included"
      ],
      popular: false
    },
    {
      id: 2,
      type: "Residential Premium",
      size: "60ft x 120ft",
      area: "7,200 sq ft",
      price: "$22,000",
      monthlyPayment: "$917",
      features: [
        "All standard features",
        "Corner plot advantage",
        "Enhanced landscaping",
        "Premium location",
        "Wider frontage",
        "Garden space allocation"
      ],
      popular: true
    },
    {
      id: 3,
      type: "Commercial Standard",
      size: "40ft x 80ft",
      area: "3,200 sq ft",
      price: "$25,000",
      monthlyPayment: "$1,042",
      features: [
        "High-traffic location",
        "Commercial zoning",
        "Parking provisions",
        "Signage allowance",
        "Utility connections",
        "Business permit support"
      ],
      popular: false
    },
    {
      id: 4,
      type: "Commercial Premium",
      size: "60ft x 100ft",
      area: "6,000 sq ft",
      price: "$35,000",
      monthlyPayment: "$1,458",
      features: [
        "Prime commercial location",
        "Main road frontage",
        "Extended parking",
        "Multiple utility points",
        "Enhanced security",
        "Investment potential"
      ],
      popular: false
    }
  ]

  const paymentPlans = [
    {
      name: "Outright Purchase",
      discount: "10% Discount",
      description: "Pay full amount upfront and save",
      benefits: ["Immediate ownership", "No interest charges", "Maximum savings"]
    },
    {
      name: "12-Month Plan",
      discount: "5% Discount",
      description: "Spread payments over 12 months",
      benefits: ["Manageable payments", "Quick ownership", "Minimal interest"]
    },
    {
      name: "24-Month Plan",
      discount: "Standard Rate",
      description: "Extended payment period for flexibility",
      benefits: ["Lower monthly payments", "Flexible terms", "Gradual ownership"]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Plot Options & <span className="text-blue-600">Prices</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover our range of serviced plots with transparent pricing and flexible payment options. 
            Find the perfect plot that fits your budget and requirements.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="secondary" className="px-4 py-2">
              <DollarSign className="w-4 h-4 mr-2" />
              Competitive Pricing
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <Calendar className="w-4 h-4 mr-2" />
              Flexible Payment Plans
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <Ruler className="w-4 h-4 mr-2" />
              Various Sizes Available
            </Badge>
          </div>
        </div>
      </section>

      {/* Plot Options Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Available Plot Options</h2>
            <p className="text-lg text-gray-600">Choose from our carefully planned plot configurations</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {plotOptions.map((plot) => (
              <Card key={plot.id} className={`relative ${plot.popular ? 'ring-2 ring-blue-500 shadow-lg' : ''}`}>
                {plot.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                    Most Popular
                  </Badge>
                )}
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl font-bold">{plot.type}</CardTitle>
                      <CardDescription className="text-sm text-gray-500">
                        <Ruler className="w-4 h-4 inline mr-1" />
                        {plot.size} ({plot.area})
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{plot.price}</div>
                      <div className="text-sm text-gray-500">or {plot.monthlyPayment}/month</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {plot.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plot.popular ? "default" : "outline"}>
                    Select This Plot
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Plans */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Flexible Payment Plans</h2>
            <p className="text-lg text-gray-600">Choose a payment option that works for your budget</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {paymentPlans.map((plan, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                  <Badge variant="secondary" className="mx-auto w-fit">
                    {plan.discount}
                  </Badge>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center justify-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Information */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Additional Information</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
                  What's Included
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Survey and documentation
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Legal processing fees
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Infrastructure development
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Utility connections
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Security and maintenance
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  Location Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Prime locations in Accra
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Easy access to main roads
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Proximity to amenities
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Growing neighborhoods
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Investment potential
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Plot?</h2>
          <p className="text-xl mb-8 opacity-90">
            Contact our team today to discuss your requirements and get personalized pricing
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              Call Us: +233 123 456 789
            </Button>
            <Button size="lg" variant="outline" className="flex items-center text-white border-white hover:bg-white hover:text-blue-600">
              <Mail className="w-5 h-5 mr-2" />
              Email: info@tdcghana.com
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}