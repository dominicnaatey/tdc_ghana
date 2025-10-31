import JobOpeningsClient from "./JobOpeningsClient"

export const metadata = {
  title: "Job Openings | TDC Ghana",
  description: "Explore current job opportunities at TDC Ghana. Filter by department, location, or job type and apply online.",
  openGraph: {
    title: "Job Openings | TDC Ghana",
    description: "Explore current job opportunities at TDC Ghana.",
    type: "website",
  },
}
export default function JobOpeningsPage() {
  return <JobOpeningsClient />
}