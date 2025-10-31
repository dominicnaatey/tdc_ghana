"use client";

import type React from "react";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWhatsapp, faFacebook, faTwitter, faInstagram, faLinkedin, faYoutube, faTiktok } from "@fortawesome/free-brands-svg-icons"
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    inquiryType: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header /> */}
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
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/90"></div>
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
              <div className="max-w-md w-full">
                <h1 className="text-2xl font-bold mb-7 font-serif text-foreground">
                  Get In Touch
                </h1>

                {/* Call us */}
                <section className="mb-6">
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 mt-0.5 mr-2 shrink-0 text-blue-500" />
                    <div>
                      <h2 className="text-base font-bold border-b-1 border-black mb-2 font-serif inline-block">
                        Call us
                      </h2>
                      <ul className="space-y-1 text-base">
                    <li>
                      <a
                        href="tel:+233596914432"
                        className="hover:underline text-foreground"
                      >
                        +233 30 320 2731
                      </a>
                    </li>
                    <li>
                      <a
                        href="tel:+233504895302"
                        className="hover:underline text-foreground"
                      >
                        +233 50 489 5302
                      </a>
                    </li>
                    <li>
                      <a
                        href="tel:+233303202731"
                        className="hover:underline text-foreground"
                      >
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
                    <FontAwesomeIcon icon={faWhatsapp} className="mt-0.5 mr-2 shrink-0 text-[20px] text-[#25D366]"/>
                    <div>
                      <h2 className="text-base font-bold border-b-1 border-black mb-2 font-serif inline-block">
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
                    <Mail className="h-5 w-5 mt-0.5 mr-2 shrink-0 text-red-600" />
                    <div>
                      <h2 className="text-base font-bold border-b-1 border-black mb-2 font-serif inline-block">
                        Email
                      </h2>
                      <p className="text-base">
                        <a
                          href="mailto:info@tdc.gov.gh"
                          className="block hover:underline text-foreground"
                        >
                          info@tdc.gov.gh
                        </a>
                        <a
                          href="mailto:info@tdc.gov.gh"
                          className="block hover:underline text-foreground"
                        >
                          marketing@tdc.gov.gh
                        </a>
                      </p>
                    </div>
                  </div>
                </section>

                {/* Post Address */}
                <section>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mt-0.5 mr-2 shrink-0 text-gray-600" />
                    <div>
                      <h2 className="text-base font-bold border-b-1 border-black mb-2 font-serif inline-block">
                        Post Address
                      </h2>
                      <address className="not-italic text-base leading-snug text-foreground">
                        <p>TDC GHANA LTD</p>
                        <p>P. O. Box CO 46</p>
                        <p>Tema - Ghana</p>
                      </address>
                      {/* Social Icons */}
                      <div className="mt-4">
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
                            <FontAwesomeIcon icon={faFacebook} className="text-[#1877F2] text-[18px]" />
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
                            <FontAwesomeIcon icon={faTwitter} className="text-black text-[18px]" />
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
                            <FontAwesomeIcon icon={faLinkedin} className="text-[#0A66C2] text-[18px]" />
                          </a>
                          {/* YouTube */}
                          <a
                            href="https://www.youtube.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="YouTube"
                            className="w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:bg-gray-50 transition"
                          >
                            <span className="sr-only">YouTube</span>
                            <FontAwesomeIcon icon={faYoutube} className="text-[#FF0000] text-[18px]" />
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
                            <FontAwesomeIcon icon={faTiktok} className="text-black text-[18px]" />
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
                            <FontAwesomeIcon icon={faInstagram} className="text-[#E4405F] text-[18px]" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* Contact Form */}
              <div>
                <Card className="border-border bg-white drop-shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-foreground font-serif">
                      Send Us a Message
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          className="bg-gray-50 border-1 border-gray-500"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-foreground mb-2"
                          >
                            Email Address *
                          </label>
                          <Input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                            className="bg-gray-50 border-1 border-gray-500"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-foreground mb-2"
                          >
                            Phone Number
                          </label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              handleInputChange("phone", e.target.value)
                            }
                            className="bg-gray-50 border-1 border-gray-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Subject *
                        </label>
                        <Input
                          id="subject"
                          type="text"
                          required
                          value={formData.subject}
                          onChange={(e) =>
                            handleInputChange("subject", e.target.value)
                          }
                          className="bg-input border-1 border-gray-500"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Message *
                        </label>
                        <Textarea
                          id="message"
                          required
                          rows={16}
                          value={formData.message}
                          onChange={(e) =>
                            handleInputChange("message", e.target.value)
                          }
                          className="bg-gray-50 border-1 border-gray-500 min-h-[10rem]"
                          placeholder="Please provide details about your inquiry..."
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-16">
              <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg border-5 border-gray-300">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.4558550255815!2d-0.007311099999999999!3d5.646992199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf80ad2225bcdb%3A0x3324131c8dfae273!2sTDC%20GHANA%20LTD!5e0!3m2!1sen!2sgh!4v1758330053874!5m2!1sen!2sgh"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="TDC GHANA LTD Location - P.O. Box CO 46, Tema, Ghana"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
