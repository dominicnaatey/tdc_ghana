import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}
      <main>
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground font-serif mb-6">Privacy Policy</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                TDC Ghana Ltd is committed to protecting your privacy and ensuring the security of your personal
                information.
              </p>
              <p className="text-sm text-muted-foreground mt-4">Last updated: January 2024</p>
            </div>
          </div>
        </section>

        {/* Privacy Policy Content */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-foreground font-serif">
                    Information We Collect
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    TDC Ghana Ltd collects information that you provide directly to us, such as when you create an
                    account, submit inquiries, apply for housing projects, or contact us for support. This may include:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Personal identification information (name, email address, phone number)</li>
                    <li>Contact information and mailing addresses</li>
                    <li>Financial information for housing applications</li>
                    <li>Employment and income verification documents</li>
                    <li>Communications you send to us</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-foreground font-serif">
                    How We Use Your Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Process housing and land development applications</li>
                    <li>Communicate with you about our services and projects</li>
                    <li>Provide customer support and respond to inquiries</li>
                    <li>Send you updates about new projects and opportunities</li>
                    <li>Comply with legal and regulatory requirements</li>
                    <li>Improve our services and website functionality</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-foreground font-serif">Information Sharing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    TDC Ghana Ltd does not sell, trade, or otherwise transfer your personal information to third parties
                    without your consent, except in the following circumstances:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>When required by law or legal process</li>
                    <li>To protect our rights, property, or safety</li>
                    <li>With service providers who assist in our operations</li>
                    <li>In connection with a merger, acquisition, or sale of assets</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-foreground font-serif">Data Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    We implement appropriate technical and organizational measures to protect your personal information
                    against unauthorized access, alteration, disclosure, or destruction. These measures include:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Encryption of sensitive data in transit and at rest</li>
                    <li>Regular security assessments and updates</li>
                    <li>Access controls and authentication procedures</li>
                    <li>Employee training on data protection practices</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-foreground font-serif">Your Rights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>You have the right to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Access and review your personal information</li>
                    <li>Request corrections to inaccurate information</li>
                    <li>Request deletion of your personal information</li>
                    <li>Opt-out of marketing communications</li>
                    <li>File a complaint with relevant authorities</li>
                  </ul>
                  <p>
                    To exercise these rights, please contact us using the information provided in our Contact section.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-foreground font-serif">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground leading-relaxed">
                  <p>If you have questions about this Privacy Policy or our data practices, please contact us at:</p>
                  <div className="mt-4 space-y-2">
                    <p>
                      <strong>Email:</strong> privacy@tdcghana.gov.gh
                    </p>
                    <p>
                      <strong>Phone:</strong> +233 (0) 303 202 104
                    </p>
                    <p>
                      <strong>Address:</strong> TDC Ghana Ltd, Tema Industrial Area, Greater Accra Region, Ghana
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      {/* <Footer /> */}
    </div>
  )
}
