import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Download, Search, Filter, Calendar, Eye } from "lucide-react"

const documentCategories = [
  {
    name: "Annual Reports",
    description: "Comprehensive annual reports and financial statements",
    documents: [
      { name: "TDC Ghana Annual Report 2023", type: "PDF", size: "2.4 MB", date: "2024-03-15", downloads: 1250 },
      { name: "TDC Ghana Annual Report 2022", type: "PDF", size: "2.1 MB", date: "2023-03-20", downloads: 2100 },
      { name: "TDC Ghana Annual Report 2021", type: "PDF", size: "1.9 MB", date: "2022-03-18", downloads: 1800 },
    ],
  },
  {
    name: "Housing Applications",
    description: "Forms and applications for housing projects",
    documents: [
      { name: "Housing Application Form", type: "PDF", size: "450 KB", date: "2024-01-10", downloads: 5200 },
      { name: "Housing Eligibility Guidelines", type: "PDF", size: "680 KB", date: "2024-01-10", downloads: 3100 },
      { name: "Payment Plan Options", type: "PDF", size: "320 KB", date: "2024-01-15", downloads: 2800 },
      { name: "Housing Project Brochure", type: "PDF", size: "1.2 MB", date: "2024-02-01", downloads: 1900 },
    ],
  },
  {
    name: "Land Development",
    description: "Land acquisition and development documentation",
    documents: [
      { name: "Land Acquisition Application", type: "PDF", size: "380 KB", date: "2024-01-08", downloads: 2400 },
      { name: "Land Development Guidelines", type: "PDF", size: "750 KB", date: "2024-01-08", downloads: 1600 },
      { name: "Site Plan Requirements", type: "PDF", size: "520 KB", date: "2024-01-12", downloads: 1200 },
      { name: "Land Use Regulations", type: "PDF", size: "890 KB", date: "2024-01-20", downloads: 980 },
    ],
  },
  {
    name: "Project Reports",
    description: "Progress reports and project documentation",
    documents: [
      { name: "Q4 2023 Project Progress Report", type: "PDF", size: "1.8 MB", date: "2024-01-30", downloads: 850 },
      { name: "Infrastructure Development Update", type: "PDF", size: "1.1 MB", date: "2024-02-15", downloads: 720 },
      { name: "Community Impact Assessment", type: "PDF", size: "950 KB", date: "2024-02-20", downloads: 640 },
    ],
  },
  {
    name: "Policies & Guidelines",
    description: "Corporate policies and operational guidelines",
    documents: [
      { name: "TDC Ghana Corporate Policy Manual", type: "PDF", size: "2.8 MB", date: "2024-01-05", downloads: 1100 },
      { name: "Environmental Impact Guidelines", type: "PDF", size: "1.4 MB", date: "2024-01-05", downloads: 890 },
      { name: "Procurement Guidelines", type: "PDF", size: "680 KB", date: "2024-01-10", downloads: 750 },
      { name: "Quality Assurance Standards", type: "PDF", size: "920 KB", date: "2024-01-15", downloads: 620 },
    ],
  },
  {
    name: "Financial Information",
    description: "Budget reports and financial transparency documents",
    documents: [
      { name: "2024 Budget Allocation Report", type: "PDF", size: "1.6 MB", date: "2024-02-01", downloads: 980 },
      {
        name: "Quarterly Financial Statement Q1 2024",
        type: "PDF",
        size: "1.2 MB",
        date: "2024-04-15",
        downloads: 720,
      },
      { name: "Project Funding Sources", type: "PDF", size: "580 KB", date: "2024-01-25", downloads: 650 },
    ],
  },
]

export default function DownloadsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-800 to-purple-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Downloads & Resources</h1>
            <p className="text-xl text-purple-100">
              Access important documents, forms, reports, and resources from TDC Ghana Ltd.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter Section */}
        <Card className="mb-8">
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
                  <SelectItem value="pdf">PDF Documents</SelectItem>
                  <SelectItem value="forms">Forms</SelectItem>
                  <SelectItem value="reports">Reports</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-purple-800 hover:bg-purple-900">
                <Filter className="w-4 h-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>

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
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-purple-700" />
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
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                        <Button size="sm" className="bg-purple-700 hover:bg-purple-800">
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
        <Card className="mt-12">
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
        </Card>
      </div>
    </div>
  )
}
