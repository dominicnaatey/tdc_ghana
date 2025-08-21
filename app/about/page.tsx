import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Target, Eye, Award, Building, MapPin, Calendar, CheckCircle } from "lucide-react"

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

const initialFunctions = [
  "To Plan, Layout and Develop the Tema Acquisition Area.",
  "Construct roads and public buildings",
  "Prepare and execute housing schemes",
  "Develop industrial and commercial sites",
  "Provide public utilities such as sewage and street lights",
  "Carry on such activities as are incidental or conducive to the attainment of the objects"
]

const newObjects2017 = [
  "To carry on the objects of TDC GHANA LTD as per the TDC GHANA LTD Instrument. 1965 (L.I. 469) as amended by the TDC GHANA LTD (Amendment Instrument. 1989 (L.I. 1468)) as stated in (1) and (2) above.",
  "To acquire land both in and outside Ghana for real estate development and management.",
  "Planning, development and construction of towns and cities in and outside Ghana.",
  "Development and management of commercial and industrial areas.",
  "Consultancy services.",
  "To partner and or collaborate with other real estate developers (both local and international) and agencies for provision of the above services.",
  "Investment in real estate concerns.",
  "Any other activities incidental to the attainment of the above-stated objects."
]

const respectValues = [
  { letter: "R", value: "Responsibility" },
  { letter: "E", value: "Eco-Friendliness" },
  { letter: "S", value: "Service Excellence" },
  { letter: "P", value: "Professionalism" },
  { letter: "E", value: "Equal Opportunity" },
  { letter: "C", value: "Collaboration" },
  { letter: "T", value: "Transparency" }
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
                Tema Development Corporation has been at the forefront of Ghana's development since 1952, transforming
                communities through innovative housing, strategic land development, and essential infrastructure
                projects across the nation.
              </p>
            </div>
          </div>
        </section>

        {/* Background and History */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground font-serif mb-8 text-center">Background Of TDC Ghana Ltd.</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div>
                  <div className="flex items-center mb-6">
                    <Calendar className="h-8 w-8 text-primary mr-3" />
                    <h3 className="text-2xl font-bold text-foreground font-serif">Established 1952</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    The TDC Ghana Ltd was set up in 1952 by an Act of Parliament with the sole responsibility to plan and develop about 63 square miles of public land for various land cases and also manage the township that had been created to provide accommodation to those that would be engaged in these economic operations.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    TDC was given a 125 year lease term to manage this land area known as the Tema Acquisition Area. The Company since its birth has gone through many experiences involving structural and legislative changes that have cumulatively given it a new lease of life.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-xl font-bold text-foreground font-serif mb-4">Initial Functions</h4>
                  <div className="space-y-3">
                    {initialFunctions.map((func, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                        <p className="text-muted-foreground text-sm">{func}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 2017 Conversion */}
            <div className="bg-card rounded-2xl p-8 lg:p-12">
              <div className="flex items-center mb-6">
                <Building className="h-8 w-8 text-accent mr-3" />
                <h3 className="text-2xl font-bold text-card-foreground font-serif">2017 Transformation</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-8">
                In 2017, TDC was converted into a Limited Liability Company with enhanced mandate to expand its operational and geographical scope beyond the Tema Acquisition Area.
              </p>
              
              <h4 className="text-xl font-bold text-card-foreground font-serif mb-6">Enhanced Objects & Mandate</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {newObjects2017.map((obj, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground text-sm">{obj}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-16 lg:py-24 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <Card className="text-center border-border">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <Target className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground font-serif mb-4">Our Mission</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To create and manage unique, sustainable urban settlements that meets stakeholders expectations.
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
                    To maintain the leadership role in the real estate business in Ghana.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* RESPECT Values */}
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-card-foreground font-serif mb-4">Our Core Values</h3>
              <p className="text-lg text-muted-foreground mb-8">We live by the acronym <strong>RESPECT</strong></p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {respectValues.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary-foreground">{item.letter}</span>
                    </div>
                    <h4 className="text-lg font-bold text-card-foreground font-serif mb-2">{item.value}</h4>
                  </div>
                ))}
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
