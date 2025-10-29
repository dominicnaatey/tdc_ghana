export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  location: string;
  status: "completed" | "ongoing" | "planning";
  start_date: string;
  completion_date: string;
  budget: number;
  beneficiaries: number;
  featured_image: string;
  project_type:
    | "Infrastructure"
    | "Housing"
    | "Community"
    | "Industrial"
    | "Energy"
    | "Utilities"
    | "Hospitality";
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
    description:
      "TDC Towers is a 7-storey commercial building located in Tema, Community 2 between the Aggrey and Lumumba Roads and just opposite the Tema Community 2 Police Station. The structure, which is L-shaped, sits at the edge of Salifu Dagati Extension Street, facing the police station and parts of the Tema Harbour.",
    location: "Tema, Greater Accra Region",
    status: "ongoing",
    start_date: "2023-03-01",
    completion_date: "2026-02-28",
    budget: 85000000,
    beneficiaries: 2500,
    featured_image: "/projects/project1/1.jpg",
    project_type: "Infrastructure",
    featured: true,
    facilities: [
      "Ancillary Parking",
      "Four (4) elevators",
      "Three (3) Stairways",
      "Disability ramp",
      "Escape Stairways",
      "Fully air-conditioned office and retail space",
      "Underground and overhead water storage and supply",
      "CCTV cameras available on each floor",
      "Backup Generator of 2000 K.V.A",
      "24 hour security service",
      "Fire alarms and extinguishers available",
      "Telephone, Cable & Fibre Optics available",
    ],
    features: [
      "Open plan Office space",
      "Ground Floor available for banking halls and retail outlets",
      "1st to 2nd floor available for retail and restaurant",
      "450 seater conference facility",
      "Cafeteria available on the 7th floor",
      "Cafeteria/Restaurant space to complement Conference Facility",
    ],
    image_collection: [
      "/projects/project1/2.jpg",
      "/projects/project1/3.jpg",
      "/projects/project1/4.jpg",
      "/projects/project1/5.jpg",
      "/projects/project1/6.jpg",
      "/projects/project1/7.jpg",
    ],
  },
  {
    id: 2,
    title: "Community 26 Kpone Affordable Housing Project",
    slug: "community-26-kpone-affordable-housing",
    description:
      "TDC Ghana Ltd is pleased to announce that units of the Community 26 Kpone Affordable Housing Project are available for sale. This project offers various apartment types designed to meet diverse housing needs at affordable prices.",
    location: "Kpone, Greater Accra Region",
    status: "ongoing",
    start_date: "2024-01-01",
    completion_date: "2025-12-31",
    budget: 15000000,
    beneficiaries: 1200,
    featured_image: "/projects/project3/1.jpg",
    project_type: "Housing",
    featured: true,
    announcement:
      "TDC Ghana Ltd, is pleased to announce that units of the Community 26 Kpone Affordable Housing Project are available for sale.",
    apartment_types: [
      {
        type: "Studio",
        floor_area_sqm: 30.485,
      },
      {
        type: "1 Bedroom",
        floor_area_sqm: 42.9,
      },
      {
        type: "1 Bedroom (Special)",
        floor_area_sqm: 60.837,
      },
      {
        type: "2 Bedrooms",
        floor_area_sqm: 79.644,
      },
    ],
    note: "Applicants will be expected to pay before an apartment can be earmarked.",
    payment_details: {
      bank: "Ghana Commercial Bank",
      account_number: "1071130001798",
      currency: "CEDI",
    },
    contact: {
      mobile: ["+233504895302", "+233596914432"],
      telephone: "+233303202731",
      whatsapp: "+233552569887",
    },
    image_collection: [
      "/projects/project3/2.jpg",
      "/projects/project3/3.jpg",
      "/projects/project3/4.jpg",
      "/projects/project5/2.jpg", 
      "/projects/project5/3.jpg"
    ],
  },
  {
    id: 3,
    title: "Site 3 Apartment for Sale",
    slug: "site-3-apartment-for-sale",
    description:
      "With the successful completion of phase-I of TDC Development Company Limited's first 8-storey block of (2-Bedroom) Apartments, the Corporation is commencing the phase-II project comprising 4 blocks of 8-storey 3-bedroom apartments at Site 3, Community 1 Tema. This prime location is off the Tema Stadium Road, opposite the TDC Head Office.",
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
      phase_2:
        "Four blocks of 8-storey 3-Bedroom Apartments under development.",
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
      "Supermarkets and Retail Stores provided",
    ],
    image_collection: ["/projects/project2/2.jpg", "/projects/project2/3.jpg"],
  },
  {
    id: 4,
    title:
      "Luxury 3-Bedroom Airbnb Apartment Now Available in Tema – Comfort, Security, and Style Await!",
    slug: "site-3-luxury-3-bedroom-airbnb",
    description:
      "Experience luxury living at its finest with TDC Ghana Ltd’s exclusive Airbnb offering—a stunning 3-bedroom apartment located in Tema, Ghana. This beautifully designed apartment features a state-of-the-art kitchen, elegant living and dining areas, a lavish master suite, and two additional spacious bedrooms for your comfort.",
    location: "Site 3, Tema",
    status: "ongoing",
    start_date: "2024-01-01",
    completion_date: "2025-06-30",
    budget: 8000000,
    beneficiaries: 200,
    featured_image: "/projects/project4/1.JPG",
    project_type: "Hospitality",
    featured: true,
    highlights:
      "TDC Airbnb Luxury Apartments redefine comfort and elegance, offering guests a stylish retreat with modern amenities, top-tier security, and a serene environment—perfect for both short and long stays in Tema.",
    apartment_type: "3-Bedroom",
    category: "Airbnb / Short-Stay",
    features: [
      "24-hour standby generator",
      "Reliable water supply",
      "Access control with audio/video security",
      "Elevator access",
      "Paved car park",
      "Secured gated community",
      "Dedicated laundry area",
    ],
    image_collection: [
      "/projects/project4/2.JPG",
      "/projects/project4/2.JPG",
      "/projects/project4/3.JPG",
      "/projects/project4/4.JPG",
      "/projects/project4/5.JPG",
      "/projects/project4/6.JPG",
      "/projects/project4/7.JPG",
      "/projects/project4/8.JPG",
      "/projects/project4/9.JPG",
      "/projects/project4/10.JPG",
      "/projects/project4/11.JPG",
      "/projects/project4/12.JPG",
      "/projects/project4/13.JPG",
      "/projects/project4/14.JPG",
      "/projects/project4/15.JPG",
    ],
  },
  // {
  //   id: 5,
  //   title: "KPONE AFFORDABLE comm 26 new",
  //   slug: "kpone-affordable-comm-26-new",
  //   description:
  //     "Affordable housing development at Community 26, Kpone, providing accessible residential units with practical amenities.",
  //   location: "Kpone, Greater Accra Region",
  //   status: "ongoing",
  //   start_date: "2024-01-01",
  //   completion_date: "2026-12-31",
  //   budget: 0,
  //   beneficiaries: 0,
  //   featured_image: "/projects/project5/1.jpg",
  //   project_type: "Housing",
  //   featured: false,
  //   image_collection: ["/projects/project5/2.jpg", "/projects/project5/3.jpg"],
  // },
  {
    id: 6,
    title: "15TH STOREY APARTMENT site 3",
    slug: "15th-storey-apartment-site-3",
    description:
      "15 Storey Apartments, Site 3: The building skins 27 apartments per block (26 two-bedroom and 1 executive 3-bedroom penthouse). Features include a modern façade with glass and concrete, two 8-passenger lifts, basement parking and utility storage, water storage, recreational space on the 13th floor, rooftop water storage, spacious ensuite rooms, open-plan living and dining with city views, two emergency staircases, and an executive penthouse on the 14th–15th floors with family area and roof terrace. Location – Site 3, Community 1, Tema.",
    location: "Site 3, Community 1, Tema",
    status: "ongoing",
    start_date: "2024-01-01",
    completion_date: "2026-12-31",
    budget: 0,
    beneficiaries: 0,
    featured_image: "/projects/project6/site 3, 15 storey 3d/1.jpg",
    project_type: "Housing",
    featured: false,
    image_collection: [
      "/projects/project6/FLOOR PLANS/1.jpg",
      "/projects/project6/FLOOR PLANS/2.jpg",
      "/projects/project6/FLOOR PLANS/3.jpg",
      "/projects/project6/FLOOR PLANS/4.jpg",
      "/projects/project6/site 3, 15 storey 3d/1.jpg",
      "/projects/project6/site 3, 15 storey 3d/2.jpg",
      "/projects/project6/site 3, 15 storey 3d/3.png",
    ],
  },
  {
    id: 7,
    title: "EVENT CENTER",
    slug: "event-center",
    description:
      "Purpose-built event center concept with flexible spaces for conferences, ceremonies, and community functions.",
    location: "Tema, Greater Accra Region",
    status: "planning",
    start_date: "2024-01-01",
    completion_date: "2025-12-31",
    budget: 0,
    beneficiaries: 0,
    featured_image: "/projects/project7/1.jpg",
    project_type: "Community",
    featured: false,
    image_collection: ["/projects/project7/2.jpg", "/projects/project7/3.jpg"],
  },
  {
    id: 8,
    title: "kaizer Flat",
    slug: "kaizer-flat",
    description:
      "Kaizer Flat: High-rise residential development with multiple symmetrical towers and expansive balconies around a centralized vertical core. Typical floor plan arranged in a quad-unit configuration around dual staircases and twin lifts, designed for accessibility, safety, and structural efficiency.",
    location: "Tema, Greater Accra Region",
    status: "planning",
    start_date: "2024-01-01",
    completion_date: "2026-12-31",
    budget: 0,
    beneficiaries: 0,
    featured_image: "/projects/project8/kaizer 3ds/1.jpg",
    project_type: "Housing",
    featured: false,
    image_collection: [
      "/projects/project8/floor plans/1.jpg",
      "/projects/project8/floor plans/2.jpg",
      "/projects/project8/kaizer 3ds/1.jpg",
      "/projects/project8/kaizer 3ds/2.png",
      "/projects/project8/kaizer 3ds/3.png",
    ],
  },
  {
    id: 9,
    title: "ITALIAN FLAT",
    slug: "italian-flat",
    description: `Luxury Living Overlooking the Seaport

Rising elegantly in the heart of Tema Community 2, just a stone’s throw from the bustling harbor, Harbor View Residences offers a rare blend of modern architecture, coastal serenity, and city convenience. This 10-storey landmark residential development is designed for discerning homeowners and investors who value comfort, prestige, and panoramic views of the Tema seaport and the Atlantic coastline.

Architectural Elegance

With its striking façade of flowing balconies, bold red accents, and expansive glass panels, the building is not just a home but a statement of modern luxury. Its design captures abundant natural light and maximizes scenic vistas, making every apartment a front-row seat to the beauty of the sea and harbor skyline.

Spacious & Functional Layouts

Each floor hosts two premium 3-bedroom apartments (total floor area: 308.2 sqm per level), intelligently planned to balance privacy, comfort, and style.

Key apartment highlights:
- Grand Living Spaces: 35 sqm living rooms opening to wide sea-facing balconies.
- Master Suites: Luxurious 18+ sqm ensuite bedrooms offering ultimate relaxation.
- Modern Kitchens: Fully fitted 12 sqm kitchens with adjoining storage for efficiency.
- Private Dining Areas: Perfect for family meals or entertaining guests.

Lifestyle & Location

Residents will enjoy:
- Uninterrupted Harbor & Ocean Views — wake up to the breathtaking sight of ships, the coastline, and fresh ocean breezes.
- Prime Accessibility — minutes from Tema Harbor, business hubs, schools, and recreational centers.
- Secure & Comfortable Living — with central stair halls, dual staircases, and well-planned circulation for convenience and safety.

Investment Appeal

Tema’s rapidly growing demand for upscale residential housing, especially in proximity to the harbor, makes Harbor View Residences a high-potential investment opportunity. Investors can expect strong returns through both rental yields and capital appreciation, as the project’s location ensures enduring value.

Harbor View Residences: Where Modern Luxury Meets Coastal Living.
Your exclusive gateway to a lifestyle of elegance, comfort, and unmatched views in Tema Community 2.`,
    location: "Tema Community 2, Greater Accra Region",
    status: "planning",
    start_date: "2024-01-01",
    completion_date: "2026-12-31",
    budget: 0,
    beneficiaries: 0,
    featured_image: "/projects/project9/comm 2 habour view apt 3ds/3.png",
    project_type: "Housing",
    featured: false,
    facilities: [
      "Sea-facing balconies",
      "Ensuite master suites (18+ sqm)",
      "Fully fitted kitchens (12 sqm) with storage",
      "Private dining areas",
      "Central stair halls",
      "Dual staircases",
      "Well-planned circulation for safety and convenience",
    ],
    image_collection: [
      "/projects/project9/FLOOR PLAN/2.jpg",
      "/projects/project9/FLOOR PLAN/3.jpg",
      "/projects/project9/comm 2 habour view apt 3ds/1.png",
      "/projects/project9/comm 2 habour view apt 3ds/2.png",
      "/projects/project9/comm 2 habour view apt 3ds/3.png",
    ],
  },
  {
    id: 10,
    title: "TDC CLUB HOUSE",
    slug: "tdc-club-house",
    description:
      "The TDC Clubhouse is a premier lifestyle and leisure destination designed to offer members and guests a perfect blend of comfort, recreation, and luxury. Nestled in a serene environment at Community 6, Tema in the Greater Accra Region, the clubhouse provides an inviting atmosphere for relaxation, socialization, and wellness. At the heart of the facility is a well-appointed guesthouse with elegant and comfortable accommodations. The restaurant serves a diverse menu of local and international cuisine prepared by skilled chefs and complemented by exceptional service. A versatile pavilion / multi-purpose space provides an ideal venue for corporate functions, private celebrations, and community gatherings with modern amenities. For sports and fitness enthusiasts, the clubhouse features a tennis court, squash court, fully equipped gym, and a swimming pool—promoting an active, healthy lifestyle. Guests can also unwind at the spa, which offers rejuvenating treatments designed to refresh both body and mind. Additional facilities and services are thoughtfully integrated to enhance the overall experience, making the TDC Clubhouse a vibrant hub for leisure, wellness, and community living.",
    location: "Community 6, Tema, Greater Accra Region",
    status: "planning",
    start_date: "2024-01-01",
    completion_date: "2025-12-31",
    budget: 0,
    beneficiaries: 0,
    featured_image: "/projects/project10/1.jpg",
    project_type: "Hospitality",
    featured: false,
    facilities: [
      "Guest house (junior suite - 8, standard suite - 25, executive suite - 4)",
      "Pavilion / Multi-Purpose Space",
      "Recreational area (gym, spa, swimming pool, squash court & tennis court)",
      "Commercial area",
      "Back of House – Administration and general services",
      "Parking area",
      "Landscape areas",
    ],
    features: [
      "Elegant guesthouse accommodations in a serene setting",
      "Restaurant serving local and international cuisine",
      "Versatile pavilion/multi-purpose event space",
      "Fully equipped gym and swimming pool",
      "Tennis court and squash court",
      "Professional spa and wellness treatments",
      "Community-focused leisure and wellness hub",
    ],
    image_collection: [
      "/projects/project10/2.jpg",
      "/projects/project10/3.jpg",
      "/projects/project10/4.jpg",
      "/projects/project10/5.jpg",
      "/projects/project10/6.jpg",
      "/projects/project10/7.jpg",
    ],
  },

  {
    id: 11,
    title: "Oxygen City Housing Project in Ho",
    slug: "ho-residential-housing",
    description: `TDC Ghana Ltd. has announced plans to commence a residential housing project and related developments in Ho, the Volta Regional capital, marking the beginning of its nationwide expansion beyond Tema.

This initiative represents a significant milestone for the company, which until 2017 was legally restricted to operating within the 63-square-mile Tema Acquisition Area. Following a revision of its mandate, TDC can now operate across the country, with the Ho project serving as the first practical step in implementing this expanded role.

As part of preparations, a joint delegation from TDC and its sector ministry, the Ministry of Works, Housing and Water Resources, paid a courtesy call on Togbe Afede XIV, Agbogbomefia of the Asogli State. The visit was to formally brief him on the project and seek his blessing and guidance ahead of commencement.

TDC Managing Director, Mr. Courage K. M. Nunekpeku, confirmed that the Ministry has allocated part of its land stock in Ho to the company for the construction of modern residential accommodation. “We believe it is time to extend our experience nationwide. Volta Region is our starting point, and we intend to move quickly to commence work this year,” he said.

Togbe Afede XIV warmly welcomed the initiative, describing housing as a necessity across all regions. He underscored the project’s potential to ease the housing deficit, create employment opportunities, and attract investment into the Volta Region. He further expressed delight that the announcement coincides with President Mahama’s “Big Push” initiative, noting its great significance for the people of the region.

During the visit, TDC made a donation to support the Asogli State Educational Fund and the upcoming Yam Festival.

The Ho project is expected to pave the way for TDC’s broader nationwide housing programme, aimed at reducing Ghana’s housing deficit and promoting inclusive urban development. Alongside the Volta Region, TDC has earmarked the Ashanti, Western, Central, and Eastern regions for the first phase of its expansion.`,
    location: "Ho, Volta Region",
    status: "planning",
    start_date: "2025-01-01",
    completion_date: "2027-12-31",
    budget: 0,
    beneficiaries: 0,
    featured_image: "/projects/project11/1.jpg",
    project_type: "Housing",
    featured: false,
    image_collection: [
      "/projects/project11/2.jpg",
      "/projects/project11/3.jpg",
      "/projects/project11/4.jpg",
      "/projects/project11/5.jpg",
      "/projects/project11/6.jpg",
      "/projects/project11/7.jpg",
      "/projects/project11/8.jpg",
      "/projects/project11/9.jpg",
      "/projects/project11/10.jpg",
    ],
  },
];

// Helper functions
export function getActiveProjects() {
  return sampleProjects.filter((project) => project.status === "ongoing");
}

export function getFeaturedProjects() {
  return sampleProjects.filter((project) => project.featured);
}

export function getProjectBySlug(slug: string) {
  return sampleProjects.find((project) => project.slug === slug);
}

export function getProjectsByType(type: string) {
  return sampleProjects.filter((project) => project.project_type === type);
}

export function getProjectsByStatus(
  status: "completed" | "ongoing" | "planning"
) {
  return sampleProjects.filter((project) => project.status === status);
}
