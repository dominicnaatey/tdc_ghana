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
  project_type: 'Infrastructure' | 'Housing' | 'Community' | 'Industrial' | 'Energy' | 'Utilities' | 'Hospitality';
  featured: boolean;
  facilities?: string[];
  features?: string[];
  image_collection?: string[];
  apartment_types?: {
    type: string;
    floor_area_sqm: number;
  }[];
  announcement?: string;
  note?: string;
  payment_details?: {
    bank: string;
    account_number: string;
    currency: string;
  };
  contact?: {
    mobile: string[];
    telephone: string;
    whatsapp: string;
  };
  phase_info?: {
    phase_1?: string;
    phase_2?: string;
  };
  landmark?: string;
  key_features?: string[];
  highlights?: string;
  apartment_type?: string;
  category?: string;
}

export const sampleProjects: Project[] = [
  {
    id: 1,
    title: "TDC Towers",
    slug: "tdc-towers",
    description: "A prestigious mixed-use development featuring luxury residential towers, commercial spaces, and modern amenities. TDC Towers represents the pinnacle of urban living in Ghana, offering world-class facilities and stunning architectural design.",
    location: "Tema, Greater Accra Region",
    status: "ongoing",
    start_date: "2023-03-01",
    completion_date: "2026-02-28",
    budget: 85000000,
    beneficiaries: 2500,
    featured_image: "/projects/project1/1.jpg",
    project_type: "Housing",
    featured: true,
    facilities: [
      "24/7 Security with CCTV surveillance",
      "Swimming pool and fitness center",
      "Underground parking garage",
      "Business center and conference rooms",
      "Children's playground and garden areas",
      "High-speed elevator systems",
      "Backup power generation",
      "Water treatment and storage systems"
    ],
    features: [
      "Luxury 1, 2, and 3-bedroom apartments",
      "Panoramic city and ocean views",
      "Modern kitchen with premium appliances",
      "Spacious balconies and terraces",
      "Smart home automation systems",
      "Premium finishing materials",
      "Energy-efficient design",
      "Retail and commercial spaces on ground floor"
    ],
    image_collection: [
      "/projects/project1/2.jpg",
      "/projects/project1/3.jpg",
      "/projects/project1/4.jpg",
      "/projects/project1/5.jpg",
      "/projects/project1/6.jpg",
      "/projects/project1/7.jpg",
    ]
  },
  {
    id: 2,
    title: "Community 26 Kpone Affordable Housing Project",
    slug: "community-26-kpone-affordable-housing",
    description: "TDC Ghana Ltd is pleased to announce that units of the Community 26 Kpone Affordable Housing Project are available for sale. This project offers various apartment types designed to meet diverse housing needs at affordable prices.",
    location: "Kpone, Greater Accra Region",
    status: "ongoing",
    start_date: "2024-01-01",
    completion_date: "2025-12-31",
    budget: 15000000,
    beneficiaries: 1200,
    featured_image: "/projects/project3/1.jpg",
    project_type: "Housing",
    featured: true,
    announcement: "TDC Ghana Ltd, is pleased to announce that units of the Community 26 Kpone Affordable Housing Project are available for sale.",
    apartment_types: [
      {
        type: "Studio",
        floor_area_sqm: 30.485
      },
      {
        type: "1 Bedroom",
        floor_area_sqm: 42.9
      },
      {
        type: "1 Bedroom (Special)",
        floor_area_sqm: 60.837
      },
      {
        type: "2 Bedrooms",
        floor_area_sqm: 79.644
      }
    ],
    note: "Applicants will be expected to pay before an apartment can be earmarked.",
    payment_details: {
      bank: "Ghana Commercial Bank",
      account_number: "1071130001798",
      currency: "CEDI"
    },
    contact: {
      mobile: [
        "+233504895302",
        "+233596914432"
      ],
      telephone: "+233303202731",
      whatsapp: "+233552569887"
    },
    image_collection: [
      "/projects/project3/2.jpg",
      "/projects/project3/3.jpg",
      "/projects/project3/4.jpg",
    ]
  },
  {
    id: 3,
    title: "Site 3 Apartment for Sale",
    slug: "site-3-apartment-for-sale",
    description: "With the successful completion of phase-I of TDC Development Company Limited's first 8-storey block of (2-Bedroom) Apartments, the Corporation is commencing the phase-II project comprising 4 blocks of 8-storey 3-bedroom apartments at Site 3, Community 1 Tema. This prime location is off the Tema Stadium Road, opposite the TDC Head Office.",
    location: "Site 3, Community 1, Tema",
    landmark: "Opposite TDC Head Office, off Tema Stadium Road",
    status: "ongoing",
    start_date: "2024-01-01",
    completion_date: "2026-12-31",
    budget: 50000000,
    beneficiaries: 800,
    featured_image: "/projects/project2/1.jpg",
    project_type: "Housing",
    featured: true,
    phase_info: {
      phase_1: "First 8-storey block of 2-Bedroom Apartments completed.",
      phase_2: "Four blocks of 8-storey 3-Bedroom Apartments under development."
    },
    key_features: [
      "Spacious Sitting Rooms and Bedrooms (Net floor area is 218 sq.m)",
      "Secured Gated Community",
      "Spacious, Secured and Paved car park",
      "24-Hour Standby Generator",
      "Standby Water Supply and Laundry Area",
      "Access Control (With Audio / Video communication to Apartments)",
      "Fully Fitted Kitchen (With Cooker Unit and Refrigerator)",
      "Children's Playground",
      "Supermarkets and Retail Stores provided"
    ],
    image_collection: [
      "/projects/project2/2.jpg",
      "/projects/project2/3.jpg",
    ]
  },
  {
    id: 4,
    title: "Site 3 Luxury 3-Bedroom Airbnb",
    slug: "site-3-luxury-3-bedroom-airbnb",
    description: "Conveniently located, the apartments provide easy access to business hubs, shopping centers, and leisure spots, making them the ideal choice for travelers seeking both relaxation and convenience in a luxurious setting.",
    location: "Site 3, Tema",
    status: "ongoing",
    start_date: "2024-01-01",
    completion_date: "2025-06-30",
    budget: 8000000,
    beneficiaries: 200,
    featured_image: "/projects/project4/3.jpg",
    project_type: "Hospitality",
    featured: true,
    highlights: "TDC Airbnb Luxury Apartments redefine comfort and elegance, offering guests a stylish retreat with modern amenities, top-tier security, and a serene environment—perfect for both short and long stays in Tema.",
    apartment_type: "3-Bedroom",
    category: "Airbnb / Short-Stay",
    features: [
      "Luxury 3-bedroom apartments",
      "Modern amenities and furnishing",
      "Top-tier security system",
      "Serene and comfortable environment",
      "Easy access to business hubs",
      "Close to shopping centers and leisure spots",
      "Perfect for short and long stays",
      "Stylish and elegant interior design"
    ],
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