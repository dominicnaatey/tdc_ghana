import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}
      <main>
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground font-serif mb-6">Terms of Service</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Please read these terms and conditions carefully before using TDC Ghana Ltd services.
              </p>
              <p className="text-sm text-muted-foreground mt-4">Last updated: January 2024</p>
            </div>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-foreground font-serif">Acceptance of Terms</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    By accessing and using the TDC Ghana Ltd website and services, you accept and agree to be bound by
                    the terms and provision of this agreement. If you do not agree to abide by the above, please do not
                    use this service.
                  </p>
                  <p>
                    These terms apply to all visitors, users, and others who access or use our services, including our
                    website, housing projects, land development services, and related offerings.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-foreground font-serif">Use of Services</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>TDC Ghana Ltd grants you a limited, non-exclusive, non-transferable license to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Access and use our website for informational purposes</li>
                    <li>Apply for housing projects and land development opportunities</li>
                    <li>Submit inquiries and communicate with our team</li>
                    <li>Download publicly available documents and forms</li>
                  </ul>
                  <p>You agree not to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Use our services for any unlawful purpose</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Interfere with or disrupt our services</li>
                    <li>Submit false or misleading information</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-foreground font-serif">
                    Housing and Land Applications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Applications for housing projects and land development opportunities are subject to our internal
                    review processes and eligibility criteria. TDC Ghana Ltd reserves the right to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Review and verify all submitted information</li>
                    <li>Request additional documentation as needed</li>
                    <li>Accept or reject applications at our discretion</li>
                    <li>Modify project terms and conditions as necessary</li>
                  </ul>
                  <p>
                    All applications must be submitted with accurate and complete information. False or misleading
                    information may result in application rejection and potential legal action.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-foreground font-serif">Payment and Pricing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Pricing for housing projects and land plots is subject to change without notice. All prices are
                    quoted in Ghana Cedis (GHS) unless otherwise specified. Payment terms and conditions will be
                    outlined in individual project agreements.
                  </p>
                  <p>
                    TDC Ghana Ltd reserves the right to modify pricing, payment schedules, and terms based on project
                    requirements, market conditions, and regulatory changes.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-foreground font-serif">Intellectual Property</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    The content, organization, graphics, design, compilation, magnetic translation, digital conversion,
                    and other matters related to the TDC Ghana Ltd website are protected under applicable copyrights,
                    trademarks, and other proprietary rights.
                  </p>
                  <p>
                    You may not modify, copy, distribute, transmit, display, perform, reproduce, publish, license,
                    create derivative works from, transfer, or sell any information, software, products, or services
                    obtained from this website without our express written permission.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-foreground font-serif">
                    Limitation of Liability
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    TDC Ghana Ltd shall not be liable for any direct, indirect, incidental, special, or consequential
                    damages that result from the use of, or the inability to use, our services or materials on this
                    website, even if we have been advised of the possibility of such damages.
                  </p>
                  <p>
                    Our liability is limited to the maximum extent permitted by applicable law. Some jurisdictions do
                    not allow the exclusion of certain warranties or the limitation of liability for consequential or
                    incidental damages.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-foreground font-serif">Governing Law</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    These terms and conditions are governed by and construed in accordance with the laws of Ghana. Any
                    disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts of
                    Ghana.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-foreground font-serif">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground leading-relaxed">
                  <p>If you have any questions about these Terms of Service, please contact us at:</p>
                  <div className="mt-4 space-y-2">
                    <p>
                      <strong>Email:</strong> legal@tdcghana.gov.gh
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
