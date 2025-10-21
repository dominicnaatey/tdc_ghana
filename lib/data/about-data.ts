import { Users, Award, Building, MapPin } from "lucide-react";

export const leadership = [
  {
    name: "Dr. Kwame Asante",
    position: "Managing Director",
    image: "/leadership-md.png",
    bio: "Dr. Asante brings over 20 years of experience in urban development and infrastructure management to TDC Ghana.",
  },
  {
    name: "Eng. Akosua Mensah",
    position: "Director of Development",
    image: "/leadership-dev.png",
    bio: "Eng. Mensah oversees all housing and infrastructure projects with expertise in sustainable development practices.",
  },
  {
    name: "Mr. Joseph Osei",
    position: "Director of Operations",
    image: "/leadership-ops.png",
    bio: "Mr. Osei manages day-to-day operations and ensures efficient delivery of all TDC Ghana initiatives.",
  },
];

export const achievements = [
  { icon: Building, title: "500+ Housing Units", description: "Delivered across Greater Accra Region" },
  { icon: MapPin, title: "1,200+ Land Plots", description: "Developed for residential and commercial use" },
  { icon: Users, title: "10,000+ Families", description: "Benefited from our housing programs" },
  { icon: Award, title: "15+ Awards", description: "Recognition for excellence in development" },
];

export const initialFunctions = [
  "To Plan, Layout and Develop the Tema Acquisition Area.",
  "Construct roads and public buildings",
  "Prepare and execute housing schemes",
  "Develop industrial and commercial sites",
  "Provide public utilities such as sewage and street lights",
  "Carry on such activities as are incidental or conducive to the attainment of the objects"
];

export const newObjects2017 = [
  "To carry on the objects of TDC GHANA LTD as per the TDC GHANA LTD Instrument. 1965 (L.I. 469) as amended by the TDC GHANA LTD (Amendment Instrument. 1989 (L.I. 1468)) as stated in (1) and (2) above.",
  "To acquire land both in and outside Ghana for real estate development and management.",
  "Planning, development and construction of towns and cities in and outside Ghana.",
  "Development and management of commercial and industrial areas.",
  "Consultancy services.",
  "To partner and or collaborate with other real estate developers (both local and international) and agencies for provision of the above services.",
  "Investment in real estate concerns.",
  "Any other activities incidental to the attainment of the above-stated objects."
];

export const respectValues = [
  { letter: "S", value: "Sustainability" },
  { letter: "P", value: "Professionalism" },
  { letter: "I", value: "Innovation" },
  { letter: "C", value: "Community-Centricity" },
  { letter: "E", value: "Excellence" },
  { letter: "I", value: "Integrity" },
  { letter: "T", value: "Transparency" }
];

export type LeadershipMember = {
  name: string;
  position: string;
  image: string;
  bio: string;
};

export type Achievement = {
  icon: any;
  title: string;
  description: string;
};

export type RespectValue = {
  letter: string;
  value: string;
};