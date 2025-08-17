"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FileText, Home, MapPin, Users, Settings, LogOut, Plus, Edit, Trash2, Eye, MoreHorizontal } from "lucide-react"
import { signOut } from "@/lib/actions"

// Mock data - in real app this would come from Supabase
const mockNews = [
  { id: 1, title: "New Housing Development Launched", status: "published", date: "2024-01-15" },
  { id: 2, title: "Land Acquisition Program Update", status: "draft", date: "2024-01-14" },
  { id: 3, title: "Infrastructure Development Progress", status: "published", date: "2024-01-13" },
]

const mockHousing = [
  { id: 1, name: "Tema Gardens Estate", status: "available", units: 120, location: "Tema" },
  { id: 2, name: "Accra Heights Apartments", status: "available", units: 80, location: "East Legon" },
  { id: 3, name: "Community Villas", status: "sold_out", units: 45, location: "Spintex" },
]

const mockLand = [
  { id: 1, title: "Commercial Plot - Tema Industrial", status: "available", size: "2,500 sqm", price: "GHS 1,250,000" },
  { id: 2, title: "Residential Land - East Legon", status: "available", size: "800 sqm", price: "GHS 400,000" },
  { id: 3, title: "Mixed Use Development Site", status: "reserved", size: "5,000 sqm", price: "GHS 2,500,000" },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-cyan-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg font-serif">TDC</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">TDC Ghana Admin</h1>
                <p className="text-sm text-gray-600">Content Management System</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-4 space-y-2">
            <Button
              variant={activeTab === "overview" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("overview")}
            >
              <Settings className="w-4 h-4 mr-2" />
              Overview
            </Button>
            <Button
              variant={activeTab === "news" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("news")}
            >
              <FileText className="w-4 h-4 mr-2" />
              News & Updates
            </Button>
            <Button
              variant={activeTab === "housing" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("housing")}
            >
              <Home className="w-4 h-4 mr-2" />
              Housing Projects
            </Button>
            <Button
              variant={activeTab === "land" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("land")}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Land Plots
            </Button>
            <Button
              variant={activeTab === "inquiries" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("inquiries")}
            >
              <Users className="w-4 h-4 mr-2" />
              Contact Inquiries
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Total News Articles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">24</div>
                    <p className="text-xs text-gray-600">3 published this month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Housing Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">12</div>
                    <p className="text-xs text-gray-600">245 total units</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Land Plots</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">18</div>
                    <p className="text-xs text-gray-600">15 available</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Pending Inquiries</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">7</div>
                    <p className="text-xs text-gray-600">2 new today</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "news" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">News & Updates</h2>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Article
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="text-left p-4 font-medium text-gray-900">Title</th>
                          <th className="text-left p-4 font-medium text-gray-900">Status</th>
                          <th className="text-left p-4 font-medium text-gray-900">Date</th>
                          <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockNews.map((article) => (
                          <tr key={article.id} className="border-b">
                            <td className="p-4 font-medium">{article.title}</td>
                            <td className="p-4">
                              <Badge variant={article.status === "published" ? "default" : "secondary"}>
                                {article.status}
                              </Badge>
                            </td>
                            <td className="p-4 text-gray-600">{article.date}</td>
                            <td className="p-4">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem>
                                    <Eye className="w-4 h-4 mr-2" />
                                    View
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "housing" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Housing Projects</h2>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="text-left p-4 font-medium text-gray-900">Project Name</th>
                          <th className="text-left p-4 font-medium text-gray-900">Location</th>
                          <th className="text-left p-4 font-medium text-gray-900">Units</th>
                          <th className="text-left p-4 font-medium text-gray-900">Status</th>
                          <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockHousing.map((project) => (
                          <tr key={project.id} className="border-b">
                            <td className="p-4 font-medium">{project.name}</td>
                            <td className="p-4 text-gray-600">{project.location}</td>
                            <td className="p-4">{project.units}</td>
                            <td className="p-4">
                              <Badge variant={project.status === "available" ? "default" : "secondary"}>
                                {project.status.replace("_", " ")}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem>
                                    <Eye className="w-4 h-4 mr-2" />
                                    View
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "land" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Land Plots</h2>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Plot
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="text-left p-4 font-medium text-gray-900">Plot Title</th>
                          <th className="text-left p-4 font-medium text-gray-900">Size</th>
                          <th className="text-left p-4 font-medium text-gray-900">Price</th>
                          <th className="text-left p-4 font-medium text-gray-900">Status</th>
                          <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockLand.map((plot) => (
                          <tr key={plot.id} className="border-b">
                            <td className="p-4 font-medium">{plot.title}</td>
                            <td className="p-4 text-gray-600">{plot.size}</td>
                            <td className="p-4">{plot.price}</td>
                            <td className="p-4">
                              <Badge variant={plot.status === "available" ? "default" : "secondary"}>
                                {plot.status}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem>
                                    <Eye className="w-4 h-4 mr-2" />
                                    View
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "inquiries" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Contact Inquiries</h2>

              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-600">Contact inquiry management will be implemented here.</p>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
