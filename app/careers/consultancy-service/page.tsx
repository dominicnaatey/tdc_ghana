import ConsultancyServiceClient from "./ConsultancyServiceClient"

export const metadata = {
  title: "Consultancy Services | TDC Ghana",
  description: "Professional consulting services for housing, land development, and urban planning. Explore services, pricing, and inquire directly.",
  openGraph: {
    title: "Consultancy Services | TDC Ghana",
    description: "Professional consulting services for housing and land development.",
    type: "website",
  },
}

export default function ConsultancyServicePage() {
  return <ConsultancyServiceClient />
}