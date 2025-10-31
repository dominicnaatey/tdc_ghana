"use client"

import React, { useState } from "react"

interface Job {
  title: string
  company: string
  location: string
  type: string
  industry: string
}

const jobs: Job[] = [
  { title: "Marketing Manager", company: "TDC Ghana", location: "Accra, Ghana", type: "Full-time", industry: "Marketing" },
  { title: "Secretary", company: "TDC Ghana", location: "Tema, Ghana", type: "Full-time", industry: "Administration" },
  { title: "Civil Engineer", company: "TDC Ghana", location: "Tema, Ghana", type: "Full-time", industry: "Engineering" },
]

export default function JobListingsSection() {
  const [query, setQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState("")

  const filteredJobs = jobs.filter(
    (job) =>
      (job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.company.toLowerCase().includes(query.toLowerCase()) ||
        job.location.toLowerCase().includes(query.toLowerCase())) &&
      (selectedLocation ? job.location.includes(selectedLocation) : true) &&
      (selectedType ? job.type === selectedType : true) &&
      (selectedIndustry ? job.industry === selectedIndustry : true)
  )

  return (
    <section className="w-full py-16 md:py-20 lg:py-24 px-6 sm:px-10 lg:px-20 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h2 className="text-3xl font-bold text-center mb-10 text-text-gray">
          Explore Open Positions
        </h2>

        {/* Search + Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="md:col-span-2">
              <label className="flex flex-col w-full">
                <div className="flex items-center rounded-lg bg-gray-100">
                  <div className="text-gray-500 flex items-center justify-center pl-4">
                    <span className="material-symbols-outlined">search</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Search by job title, skill, or company"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="form-input flex-1 border-none bg-gray-100 h-12 px-4 rounded-lg text-sm text-text-gray focus:outline-none focus:ring-2 focus:ring-primary-blue/50"
                  />
                </div>
              </label>
            </div>

            <button className="w-full h-12 px-5 bg-primary-blue text-white text-base font-bold rounded-lg hover:bg-opacity-90 transition">
              Find Jobs
            </button>
          </div>

          {/* Filter Chips */}
          <div className="flex gap-3 pt-4 overflow-x-auto">
            {/* Location */}
            <select
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="h-8 px-4 bg-gray-200 text-sm rounded-full hover:bg-gray-300 transition-colors"
            >
              <option value="">Location</option>
              <option value="Accra">Accra, Ghana</option>
              <option value="Tema">Tema, Ghana</option>
            </select>

            {/* Job Type */}
            <select
              onChange={(e) => setSelectedType(e.target.value)}
              className="h-8 px-4 bg-gray-200 text-sm rounded-full hover:bg-gray-300 transition-colors"
            >
              <option value="">Job Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Remote">Remote</option>
            </select>

            {/* Industry */}
            <select
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="h-8 px-4 bg-gray-200 text-sm rounded-full hover:bg-gray-300 transition-colors"
            >
              <option value="">Industry</option>
              <option value="Marketing">Marketing</option>
              <option value="Administration">Administration</option>
              <option value="Engineering">Engineering</option>
            </select>
          </div>
        </div>

        {/* Job Cards */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.title}
                className="bg-white p-6 rounded-xl border border-border-gray hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-bold text-text-gray">{job.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{job.company}</p>

                <div className="flex items-center text-gray-500 mt-4 text-sm gap-2">
                  <span className="material-symbols-outlined text-base">location_on</span>
                  <span>{job.location}</span>
                </div>

                <button className="w-full mt-6 h-10 px-4 bg-primary-blue/10 text-primary-blue text-sm font-bold rounded-lg hover:bg-primary-blue/20 transition">
                  View Details
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-8">No matching jobs found.</p>
        )}
      </div>
    </section>
  )
}