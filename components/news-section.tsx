import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"

const newsItems = [
  {
    id: 1,
    title: "TDC Ghana Launches New Affordable Housing Initiative",
    excerpt:
      "TDC Ghana announces new affordable housing initiative to deliver 500+ quality homes for middle-income families.",
    date: "2024-01-15",
    category: "Housing",
    image: "/ghana-housing-construction.png",
    featured: true,
  },
  {
    id: 2,
    title: "Infrastructure Development Update: New Road Networks",
    excerpt: "New road networks completed as part of TDC Ghana's ongoing infrastructure development program.",
    date: "2024-01-10",
    category: "Infrastructure",
    image: "/ghana-road-construction.png",
    featured: false,
  },
  {
    id: 3,
    title: "Community Engagement: TDC Ghana Partners with Local Schools",
    excerpt:
      "TDC Ghana partners with local schools to improve educational infrastructure and support student learning.",
    date: "2024-01-05",
    category: "Community",
    image: "/ghana-school-construction.png",
    featured: false,
  },
]

export default function NewsSection() {
  return (
    <section className="py-16 lg:py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-card-foreground font-serif mb-4">Latest News & Updates</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay informed about our latest projects, community initiatives, and development progress across Ghana.
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {newsItems.map((item) => (
            <Card
              key={item.id}
              className="group hover:shadow-lg transition-shadow duration-300 bg-background border-border"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-accent text-accent-foreground">
                    {item.category}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-center text-muted-foreground text-sm mb-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(item.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <CardTitle className="text-xl font-semibold text-foreground font-serif line-clamp-2">
                  {item.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm line-clamp-3">{item.excerpt}</p>

                <Button
                  variant="ghost"
                  className="w-full justify-between text-primary hover:text-primary-foreground hover:bg-primary group"
                >
                  Read More
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/news" className="flex items-center">
              View All News
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
