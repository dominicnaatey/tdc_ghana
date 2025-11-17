"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faFacebook, faTwitter, faInstagram, faLinkedin, faYoutube, faTiktok } from "@fortawesome/free-brands-svg-icons";

export default function ContactContent() {
  const iconSize = "clamp(18px, 2.5vw, 20px)";
  const socialIconSize = "clamp(16px, 2.2vw, 18px)";
  const iconStyle = { width: iconSize, height: iconSize };
  const socialIconStyle = { width: socialIconSize, height: socialIconSize };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    inquiryType: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        setErrorMsg(String(body?.error || "failed"))
        setStatus("error")
        return
      }
      setStatus("success")
      setFormData({ name: "", email: "", phone: "", subject: "", inquiryType: "", message: "" })
    } catch {
      setErrorMsg("network")
      setStatus("error")
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        {/* Hero Section */}
        <section className="relative py-4 lg:py-4 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="/bg-primary.jpg"
              alt="TDC Ghana Building"
              className="w-full h-full object-cover object-center"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/30 to-black/90"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end h-[40vh]">
            <div className="text-center mb-8 w-full">
              <h1 className="text-4xl lg:text-5xl font-bold text-white font-serif mb-6">
                Contact Us
              </h1>
              <p className="text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
                Get in touch with TDC Ghana Ltd for inquiries about housing
                projects, land development opportunities, or general information
                about our services.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="max-w-md w-full order-2 lg:order-1">
                <h1 className="text-2xl font-bold mb-7 font-serif text-foreground">
                  Get In Touch
                </h1>

                {/* Call us */}
                <section className="mb-6">
                  <div className="flex items-start">
                    <Phone
                      style={iconStyle}
                      className="mt-0.5 mr-2 shrink-0 text-blue-500 transition-all duration-200 ease-out motion-reduce:transition-none"
                    />
                    <div>
                      <h2 className="text-base font-bold border-b border-black mb-2 font-serif inline-block">
                        Call us
                      </h2>
                      <ul className="space-y-1 text-base">
                        <li>
                          <a href="tel:+233596914432" className="hover:underline text-foreground">
                            +233 30 320 2731
                          </a>
                        </li>
                        <li>
                          <a href="tel:+233504895302" className="hover:underline text-foreground">
                            +233 50 489 5302
                          </a>
                        </li>
                        <li>
                          <a href="tel:+233303202731" className="hover:underline text-foreground">
                            +233 59 691 4432 
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* WhatsApp */}
                <section className="mb-6">
                  <div className="flex items-start">
                    <FontAwesomeIcon
                      icon={faWhatsapp}
                      style={iconStyle}
                      className="mt-0.5 mr-2 shrink-0 text-[#25D366] transition-all duration-200 ease-out motion-reduce:transition-none"
                    />
                    <div>
                      <h2 className="text-base font-bold border-b border-black mb-2 font-serif inline-block">
                        WhatsApp
                      </h2>
                      <p className="text-base">
                        <a
                          href="https://wa.me/233552569887"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline text-foreground"
                        >
                          055 256 9887
                        </a>
                      </p>
                    </div>
                  </div>
                </section>

                {/* Email */}
                <section className="mb-6">
                  <div className="flex items-start">
                    <Mail
                      style={iconStyle}
                      className="mt-0.5 mr-2 shrink-0 text-red-600 transition-all duration-200 ease-out motion-reduce:transition-none"
                    />
                    <div>
                      <h2 className="text-base font-bold border-b border-black mb-2 font-serif inline-block">
                        Email
                      </h2>
                      <p className="text-base">
                        <a href="mailto:info@tdc.gov.gh" className="block hover:underline text-foreground">
                          info@tdc.gov.gh
                        </a>
                        <a href="mailto:info@tdc.gov.gh" className="block hover:underline text-foreground">
                          marketing@tdc.gov.gh
                        </a>
                      </p>
                    </div>
                  </div>
                </section>

                {/* Post Address */}
                <section>
                  <div className="flex items-start">
                    <MapPin
                      style={iconStyle}
                      className="mt-0.5 mr-2 shrink-0 text-gray-600 transition-all duration-200 ease-out motion-reduce:transition-none"
                    />
                    <div>
                      <h2 className="text-base font-bold border-b border-black mb-2 font-serif inline-block">
                        Post Address
                      </h2>
                      <address className="not-italic text-base leading-snug text-foreground">
                        <p>TDC GHANA LTD</p>
                        <p>P. O. Box CO 46</p>
                        <p>Tema - Ghana</p>
                      </address>
                      {/* Social Icons */}
                      <div className="mt-6">
                        <h3 className="text-sm font-semibold font-serif text-foreground mb-2">Connect with us</h3>
                        <div className="flex items-center gap-3">
                          {/* Facebook */}
                          <a
                            href="https://www.facebook.com/tdcghanaltd/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                            className="w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:bg-gray-50 transition"
                          >
                            <span className="sr-only">Facebook</span>
                            <FontAwesomeIcon icon={faFacebook} style={socialIconStyle} className="text-[#1877F2] transition-all duration-200 ease-out motion-reduce:transition-none" />
                          </a>
                          {/* X/Twitter */}
                          <a
                            href="https://x.com/tdcghanaltd?lang=en"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Twitter"
                            className="w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:bg-gray-50 transition"
                          >
                            <span className="sr-only">Twitter</span>
                            <FontAwesomeIcon icon={faTwitter} style={socialIconStyle} className="text-black transition-all duration-200 ease-out motion-reduce:transition-none" />
                          </a>
                          {/* LinkedIn */}
                          <a
                            href="https://www.linkedin.com/company/tdcghanaltd/posts/?feedView=all"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:bg-gray-50 transition"
                          >
                            <span className="sr-only">LinkedIn</span>
                            <FontAwesomeIcon icon={faLinkedin} style={socialIconStyle} className="text-[#0A66C2] transition-all duration-200 ease-out motion-reduce:transition-none" />
                          </a>
                          {/* YouTube */}
                          <a
                            href="https://www.youtube.com/@TDCGHANALTD"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="YouTube"
                            className="w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:bg-gray-50 transition"
                          >
                            <span className="sr-only">YouTube</span>
                            <FontAwesomeIcon icon={faYoutube} style={socialIconStyle} className="text-[#FF0000] transition-all duration-200 ease-out motion-reduce:transition-none" />
                          </a>
                          {/* TikTok */}
                          <a
                            href="https://www.tiktok.com/@tdcghanaltd"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="TikTok"
                            className="w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:bg-gray-50 transition"
                          >
                            <span className="sr-only">TikTok</span>
                            <FontAwesomeIcon icon={faTiktok} style={socialIconStyle} className="text-black transition-all duration-200 ease-out motion-reduce:transition-none" />
                          </a>
                          {/* Instagram */}
                          <a
                            href="https://www.instagram.com/tdcghanaltd/?hl=en"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className="w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:bg-gray-50 transition"
                          >
                            <span className="sr-only">Instagram</span>
                            <FontAwesomeIcon icon={faInstagram} style={socialIconStyle} className="text-[#E4405F] transition-all duration-200 ease-out motion-reduce:transition-none" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* Contact Form */}
              <div className="order-1 lg:order-2">
                <Card className="bg-white border border-gray-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="font-serif font-bold text-2xl">Send us a message</CardTitle>
                  </CardHeader>
                  <CardContent className="bg-white">
                    <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
                      <Input className="bg-white border border-gray-300 focus-visible:ring-gray-400" placeholder="Full Name" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} />
                      <Input className="bg-white border border-gray-300 focus-visible:ring-gray-400" type="email" placeholder="Email Address" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} />
                      <Input className="bg-white border border-gray-300 focus-visible:ring-gray-400" type="tel" placeholder="Phone Number" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} />
                      <Input className="bg-white border border-gray-300 focus-visible:ring-gray-400" placeholder="Subject" value={formData.subject} onChange={(e) => handleInputChange("subject", e.target.value)} />
                      {/* <Select value={formData.inquiryType} onValueChange={(v) => handleInputChange("inquiryType", v)}>
                        <SelectTrigger className="bg-white border border-gray-300">
                          <SelectValue placeholder="Select Inquiry Type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="housing">Housing Projects</SelectItem>
                          <SelectItem value="land">Serviced Plots / Land</SelectItem>
                          <SelectItem value="general">General Inquiry</SelectItem>
                        </SelectContent>
                      </Select> */}
                      <Textarea className="bg-white border border-gray-300 focus-visible:ring-gray-400" placeholder="Your Message" value={formData.message} onChange={(e) => handleInputChange("message", e.target.value)} rows={6}/>
                      <Button type="submit" className="w-full" disabled={status === "loading"}>
                        <Send className="mr-2 h-4 w-4" />
                        {status === "loading" ? "Sending..." : status === "success" ? "Sent" : "Send Message"}
                      </Button>
                      {status === "error" && (
                        <div className="mt-2 text-sm text-red-600">Submission failed{errorMsg ? `: ${errorMsg}` : ""}</div>
                      )}
                      {status === "success" && (
                        <div className="mt-2 text-sm text-green-700">Message sent</div>
                      )}
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}