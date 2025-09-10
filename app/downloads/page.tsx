'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Download, Search, Filter, Calendar, Eye } from "lucide-react"

const documentCategories = [
  {
    name: "Forms & Applications",
    description: "Essential forms and applications for various services",
    documents: [
      { name: "Cadastral Plan Form", type: "PDF", size: "450 KB", date: "2024-01-10", downloads: 1250, filename: "Cadastral Plan Form.pdf" },
      { name: "Client Information Form", type: "PDF", size: "320 KB", date: "2024-01-15", downloads: 980, filename: "Client Information Form.pdf" },
      { name: "Checklist of Requirements for Processing Consent for Transfers, Mortgages, Vesting Assents Form", type: "PDF", size: "680 KB", date: "2024-01-20", downloads: 750, filename: "Checklist of Requirements for Processing Consent for Transfers, Mortgages, Vesting Assents Form.pdf" },
    ],
  },
  {
    name: "Housing & Properties",
    description: "Information about residential houses and commercial plots",
    documents: [
      { name: "Residential Houses", type: "PDF", size: "1.2 MB", date: "2024-02-01", downloads: 2100, filename: "Residential Houses.pdf" },
      { name: "Serviced Residential and Commercial Plots", type: "PDF", size: "890 KB", date: "2024-02-05", downloads: 1800, filename: "Serviced Residential and Commercial Plots.pdf" },
    ],
  },
  {
    name: "Service Offerings",
    description: "Premium services and offerings with detailed information",
    documents: [
      { name: "Prestige and Premium Service Offerings with Timelines and Fees", type: "PDF", size: "1.5 MB", date: "2024-01-25", downloads: 1600, filename: "PRESTIGE AND PREMIUM SERVICE OFFERINGS WITH TIMELINES AND FEES.pdf" },
    ],
  },
  {
    name: "Policies & Guidelines",
    description: "Corporate policies and operational guidelines",
    documents: [
      { name: "Code of Business Conduct", type: "PDF", size: "750 KB", date: "2024-01-05", downloads: 1100, filename: "Code of Business Conduct.pdf" },
      { name: "Right to Information Manual", type: "PDF", size: "920 KB", date: "2024-01-08", downloads: 890, filename: "Right to Information Manual.pdf" },
      { name: "Whistleblowing Policy", type: "PDF", size: "580 KB", date: "2024-01-12", downloads: 720, filename: "Whistleblowing Policy.pdf" },
    ],
  },
]

export default function DownloadsPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-4 lg:py-4 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/bg-primary.jpg"
            alt="TDC Ghana Building"
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/90"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end h-[40vh]">
          <div className="text-center mb-8 w-full">
            <h1 className="text-4xl lg:text-5xl font-bold text-white font-serif mb-6">
              Downloads & Resources
            </h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
              Access important documents, forms, reports, and resources from TDC Ghana Ltd.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter Section */}
        {/* <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Find Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Input placeholder="Search documents..." className="bg-white" />
              <Select>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Document Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="forms">Forms & Applications</SelectItem>
                  <SelectItem value="housing">Housing & Properties</SelectItem>
                  <SelectItem value="services">Service Offerings</SelectItem>
                  <SelectItem value="policies">Policies & Guidelines</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Filter className="w-4 h-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card> */}

        {/* Document Categories */}
        <div className="space-y-8">
          {documentCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex}>
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">{category.name}</CardTitle>
                <p className="text-gray-600">{category.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.documents.map((doc, docIndex) => (
                    <div
                      key={docIndex}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{doc.name}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>
                              {doc.type} • {doc.size}
                            </span>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(doc.date).toLocaleDateString()}
                            </div>
                            <span>{doc.downloads.toLocaleString()} downloads</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.open(`/downloads/${doc.filename}`, '_blank')}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-primary hover:bg-primary/90 text-primary-foreground"
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = `/downloads/${doc.filename}`;
                            link.download = doc.filename;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          }}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Help Section */}
        {/* <Card className="mt-12">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              If you can't find the document you're looking for or need assistance with any forms, please contact our
              support team.
            </p>
            <div className="flex space-x-4">
              <Button variant="outline">Contact Support</Button>
              <Button variant="outline">Request Document</Button>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </div>
  )
}
