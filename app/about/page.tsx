import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Target, Eye, Award, Building, MapPin } from "lucide-react"

const leadership = [
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
]

const achievements = [
  { icon: Building, title: "500+ Housing Units", description: "Delivered across Greater Accra Region" },
  { icon: MapPin, title: "1,200+ Land Plots", description: "Developed for residential and commercial use" },
  { icon: Users, title: "10,000+ Families", description: "Benefited from our housing programs" },
  { icon: Award, title: "15+ Awards", description: "Recognition for excellence in development" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}
      <main>
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground font-serif mb-6">About TDC Ghana Ltd</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Tema Development Corporation has been at the forefront of Ghana's development for decades, transforming
                communities through innovative housing, strategic land development, and essential infrastructure
                projects.
              </p>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center border-border">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <Target className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground font-serif mb-4">Our Mission</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To provide quality, affordable housing and develop strategic infrastructure that enhances the
                    quality of life for Ghanaians while promoting sustainable economic growth.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-border">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                    <Eye className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground font-serif mb-4">Our Vision</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To be the leading development corporation in West Africa, recognized for excellence in creating
                    sustainable communities and transformative infrastructure projects.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-border">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground font-serif mb-4">Our Values</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Integrity, Excellence, Innovation, and Community Focus guide everything we do as we work to build a
                    better Ghana for all citizens.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* History Section */}
        <section className="py-16 lg:py-24 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-card-foreground font-serif mb-6">Our History</h2>
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <p>
                    Established as a key government corporation, TDC Ghana Ltd has played a pivotal role in Ghana's
                    development landscape for over three decades. Our journey began with a simple yet powerful vision:
                    to create quality housing and infrastructure that would transform communities across Ghana.
                  </p>
                  <p>
                    From our headquarters in Tema, we have expanded our operations throughout the Greater Accra Region
                    and beyond, consistently delivering projects that meet the highest standards of quality and
                    sustainability. Our commitment to excellence has earned us recognition as one of Ghana's most
                    trusted development corporations.
                  </p>
                  <p>
                    Today, we continue to innovate and adapt to meet the evolving needs of Ghana's growing population,
                    always staying true to our core mission of building a better future for all Ghanaians.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/tdc-history-building.png"
                  alt="TDC Ghana Historical Building"
                  className="w-full h-96 object-cover rounded-2xl border border-border"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground font-serif mb-4">Leadership Team</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Meet the experienced professionals leading TDC Ghana's mission to transform communities across Ghana.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {leadership.map((leader, index) => (
                <Card key={index} className="text-center border-border">
                  <CardContent className="p-8">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-muted">
                      <img
                        src={leader.image || "/placeholder.svg"}
                        alt={leader.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-foreground font-serif mb-2">{leader.name}</h3>
                    <Badge variant="secondary" className="mb-4 bg-accent text-accent-foreground">
                      {leader.position}
                    </Badge>
                    <p className="text-muted-foreground text-sm leading-relaxed">{leader.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-16 lg:py-24 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-card-foreground font-serif mb-4">Our Achievements</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Proud milestones that demonstrate our commitment to Ghana's development and community transformation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <achievement.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground font-serif mb-2">{achievement.title}</h3>
                  <p className="text-muted-foreground text-sm">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      {/* <Footer /> */}
    </div>
  )
}
