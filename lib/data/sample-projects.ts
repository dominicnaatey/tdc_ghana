export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  location: string;
  status: 'completed' | 'ongoing' | 'planning';
  start_date: string;
  completion_date: string;
  budget: number;
  beneficiaries: number;
  featured_image: string;
  project_type: 'Infrastructure' | 'Housing' | 'Community' | 'Industrial' | 'Energy' | 'Utilities';
  featured: boolean;
}

export const sampleProjects: Project[] = [
  {
    id: 1,
    title: "Tema Port Expansion Infrastructure",
    slug: "tema-port-expansion-infrastructure",
    description: "Major infrastructure development to support Ghana's largest port with new roads, utilities, and commercial facilities.",
    location: "Tema, Greater Accra Region",
    status: "ongoing",
    start_date: "2023-01-15",
    completion_date: "2025-12-31",
    budget: 45000000,
    beneficiaries: 50000,
    featured_image: "/tema-port-infrastructure.png",
    project_type: "Infrastructure",
    featured: true
  },
  {
    id: 2,
    title: "Affordable Housing Initiative - Phase 3",
    slug: "affordable-housing-initiative-phase-3",
    description: "Construction of 2,000 affordable housing units across multiple locations in Greater Accra Region.",
    location: "Multiple Locations, Greater Accra",
    status: "ongoing",
    start_date: "2023-06-01",
    completion_date: "2026-05-31",
    budget: 120000000,
    beneficiaries: 8000,
    featured_image: "/affordable-housing-phase3.png",
    project_type: "Housing",
    featured: true
  },
  {
    id: 3,
    title: "Community Center Development Program",
    slug: "community-center-development-program",
    description: "Building modern community centers with healthcare facilities, schools, and recreational areas.",
    location: "Tema and Surrounding Areas",
    status: "completed",
    start_date: "2022-03-01",
    completion_date: "2024-02-28",
    budget: 25000000,
    beneficiaries: 75000,
    featured_image: "/community-centers.png",
    project_type: "Community",
    featured: false
  },
  {
    id: 4,
    title: "Industrial Zone Development",
    slug: "industrial-zone-development",
    description: "Creating a modern industrial zone with manufacturing facilities, logistics hubs, and supporting infrastructure.",
    location: "Tema Industrial Area",
    status: "planning",
    start_date: "2024-09-01",
    completion_date: "2027-08-31",
    budget: 200000000,
    beneficiaries: 25000,
    featured_image: "/industrial-zone.png",
    project_type: "Industrial",
    featured: true
  },
  {
    id: 5,
    title: "Green Energy Infrastructure",
    slug: "green-energy-infrastructure",
    description: "Installation of solar power systems and energy-efficient infrastructure across TDC developments.",
    location: "Multiple TDC Sites",
    status: "ongoing",
    start_date: "2023-09-01",
    completion_date: "2025-08-31",
    budget: 35000000,
    beneficiaries: 100000,
    featured_image: "/green-energy.png",
    project_type: "Energy",
    featured: false
  },
  {
    id: 6,
    title: "Water and Sanitation Upgrade",
    slug: "water-and-sanitation-upgrade",
    description: "Comprehensive upgrade of water supply and sanitation systems serving residential and commercial areas.",
    location: "Tema Metropolitan Area",
    status: "completed",
    start_date: "2021-01-01",
    completion_date: "2023-12-31",
    budget: 18000000,
    beneficiaries: 150000,
    featured_image: "/water-sanitation.png",
    project_type: "Utilities",
    featured: false
  }
];

// Helper functions
export function getActiveProjects() {
  return sampleProjects.filter(project => project.status === 'ongoing');
}

export function getFeaturedProjects() {
  return sampleProjects.filter(project => project.featured);
}

export function getProjectBySlug(slug: string) {
  return sampleProjects.find(project => project.slug === slug);
}

export function getProjectsByType(type: string) {
  return sampleProjects.filter(project => project.project_type === type);
}

export function getProjectsByStatus(status: 'completed' | 'ongoing' | 'planning') {
  return sampleProjects.filter(project => project.status === status);
}