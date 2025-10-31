"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, ArrowRight } from "lucide-react"

const services = [
  {
    name: "Urban Planning Advisory",
    description: "Comprehensive planning support for new communities, zoning, and infrastructure alignment.",
    price: "GHS 8,000 – 25,000",
    features: [
      "Site analysis and zoning recommendations",
      "Infrastructure planning guidance",
      "Regulatory compliance insights",
    ],
  },
  {
    name: "Land Development Consulting",
    description: "End-to-end guidance on viable land development projects, from feasibility to execution.",
    price: "GHS 12,000 – 40,000",
    features: [
      "Feasibility assessments",
      "Costing and phasing plans",
      "Stakeholder engagement support",
    ],
  },
  {
    name: "Housing Project Management",
    description: "Program and project management services for residential developments.",
    price: "GHS 15,000 – 60,000",
    features: [
      "Project scheduling and controls",
      "Risk and quality management",
      "Vendor and contractor coordination",
    ],
  },
]

export default function ConsultancyServiceClient() {
  const [service, setService] = useState<string | undefined>(undefined)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Inquiry submitted. We will contact you shortly.")
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground font-serif mb-6 text-center">Consultancy Services</h1>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10">We offer professional consulting across urban planning, land development, and housing project management. Review our services and submit an inquiry to get started.</p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
            {services.map((svc, idx) => (
              <Card key={idx} className="h-full hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">{svc.name}</CardTitle>
                  <CardDescription>{svc.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Badge variant="secondary">Pricing: {svc.price}</Badge>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {svc.features.map((f, i) => (
                      <li key={i} className="flex items-center"><CheckCircle2 className="w-4 h-4 text-green-600 mr-2" /> {f}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Service Inquiry</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSubmit} aria-label="Consultancy service inquiry form">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="md:col-span-1">
                    <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <Input id="full-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" aria-label="Full Name" className="bg-white" required />
                  </div>
                  <div className="md:col-span-1">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" aria-label="Email" className="bg-white" required />
                  </div>
                  <div className="md:col-span-1">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" aria-label="Phone" className="bg-white" />
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                    <Select onValueChange={(val) => setService(val)}>
                      <SelectTrigger className="bg-white" aria-label="Select service">
                        <SelectValue placeholder="Choose a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((svc) => (
                          <SelectItem key={svc.name} value={svc.name}>{svc.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us about your needs" aria-label="Message" className="bg-white" rows={5} />
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground" aria-label="Submit inquiry">
                    Submit Inquiry
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button variant="outline" className="bg-transparent" aria-label="Download service brochure">Download Brochure</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}