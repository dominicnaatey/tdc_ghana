"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPin, Briefcase, Building2, CalendarDays, Filter, ArrowRight } from "lucide-react"
import Link from "next/link"

type Job = {
  id: string
  title: string
  department: string
  location: string
  type: "Full-time" | "Part-time" | "Contract" | "Internship"
  description: string
  postedDate: string
  applyUrl: string
}

const jobs: Job[] = [
  {
    id: "1",
    title: "Software Engineer",
    department: "IT",
    location: "Tema, Ghana",
    type: "Full-time",
    description: "Build and maintain internal tools and public-facing systems. Collaborate with cross-functional teams to deliver high-quality software.",
    postedDate: "2025-10-15",
    applyUrl: "mailto:hr@tdcghana.com?subject=Application%20-%20Software%20Engineer",
  },
  {
    id: "2",
    title: "Project Manager",
    department: "Projects",
    location: "Accra, Ghana",
    type: "Contract",
    description: "Lead planning and execution of housing and land development projects. Ensure timely delivery and stakeholder communication.",
    postedDate: "2025-10-10",
    applyUrl: "mailto:hr@tdcghana.com?subject=Application%20-%20Project%20Manager",
  },
  {
    id: "3",
    title: "Communications Officer",
    department: "Corporate Affairs",
    location: "Tema, Ghana",
    type: "Full-time",
    description: "Drive corporate communications, manage press releases, and support brand initiatives across channels.",
    postedDate: "2025-10-07",
    applyUrl: "mailto:hr@tdcghana.com?subject=Application%20-%20Communications%20Officer",
  },
]

export default function JobOpeningsClient() {
  const [query, setQuery] = useState("")
  const [department, setDepartment] = useState<string | undefined>(undefined)
  const [location, setLocation] = useState<string | undefined>(undefined)
  const [jobType, setJobType] = useState<string | undefined>(undefined)

  const departments = useMemo(() => Array.from(new Set(jobs.map(j => j.department))), [])
  const locations = useMemo(() => Array.from(new Set(jobs.map(j => j.location))), [])
  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"]

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesQuery = query.trim().length === 0 || job.title.toLowerCase().includes(query.toLowerCase()) || job.description.toLowerCase().includes(query.toLowerCase())
      const matchesDept = !department || job.department === department
      const matchesLocation = !location || job.location === location
      const matchesType = !jobType || job.type === jobType
      return matchesQuery && matchesDept && matchesLocation && matchesType
    })
  }, [query, department, location, jobType])

  return (
    <div className="min-h-screen bg-white">
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground font-serif mb-6 text-center">Careers at TDC Ghana</h1>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10">Browse open roles and find your next opportunity. Use the filters to refine by department, location, and job type, then apply directly.</p>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center text-xl"><Filter className="w-5 h-5 mr-2" /> Filter Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="md:col-span-2">
                  <label htmlFor="job-search" className="sr-only">Search jobs</label>
                  <Input id="job-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search jobs..." aria-label="Search jobs" className="bg-white" />
                </div>

                <Select onValueChange={(val) => setDepartment(val)}>
                  <SelectTrigger className="bg-white" aria-label="Filter by department">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Departments</SelectItem>
                    {departments.map((d) => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select onValueChange={(val) => setLocation(val)}>
                  <SelectTrigger className="bg-white" aria-label="Filter by location">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Locations</SelectItem>
                    {locations.map((l) => (
                      <SelectItem key={l} value={l}>{l}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select onValueChange={(val) => setJobType(val)}>
                  <SelectTrigger className="bg-white" aria-label="Filter by job type">
                    <SelectValue placeholder="Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Types</SelectItem>
                    {jobTypes.map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {filteredJobs.length === 0 && (
              <Card>
                <CardContent className="py-8 text-center text-gray-600">No jobs match your filters. Try adjusting them.</CardContent>
              </Card>
            )}

            {filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-900">{job.title}</CardTitle>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                        <span className="flex items-center"><Building2 className="w-4 h-4 mr-1" /> {job.department}</span>
                        <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> {job.location}</span>
                        <span className="flex items-center"><Briefcase className="w-4 h-4 mr-1" /> {job.type}</span>
                        <span className="flex items-center"><CalendarDays className="w-4 h-4 mr-1" /> Posted {job.postedDate}</span>
                      </div>
                    </div>
                    <Badge className="bg-primary text-primary-foreground">Open</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{job.description}</p>
                  <div className="flex items-center justify-between">
                    <Link href={job.applyUrl} aria-label={`Apply for ${job.title}`}>
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        Apply Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                    <Button variant="outline" className="bg-transparent" aria-label="View job details">Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}