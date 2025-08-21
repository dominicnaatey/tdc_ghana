import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#0D3562] border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 relative">
                <Image
                  src="/tdc_logo.png"
                  alt="TDC Ghana Ltd Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-serif">TDC Ghana Ltd</h3>
                <p className="text-sm text-blue-100">Tema Development Corporation</p>
              </div>
            </div>
            <p className="text-blue-100 mb-4 max-w-md">
              Leading Ghana's development through innovative housing projects, strategic land development, and essential
              infrastructure initiatives that transform communities and improve lives.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-blue-100 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-blue-100 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-blue-100 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/housing" className="text-blue-100 hover:text-white transition-colors">
                  Housing Projects
                </Link>
              </li>
              <li>
                <Link href="/land" className="text-blue-100 hover:text-white transition-colors">
                  Land Development
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-blue-100 hover:text-white transition-colors">
                  Development Projects
                </Link>
              </li>
              <li>
                <Link href="/downloads" className="text-blue-100 hover:text-white transition-colors">
                  Downloads & Resources
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-blue-100 hover:text-white transition-colors">
                  News & Updates
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-blue-100 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-blue-100 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-200 mt-0.5 flex-shrink-0" />
                <span className="text-blue-100 text-sm">
                  TDC Head Office<br />
                  Tema, Greater Accra Region<br />
                  Ghana
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-200 flex-shrink-0" />
                <span className="text-blue-100 text-sm">+233 (0) 303 202 104</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-200 flex-shrink-0" />
                <span className="text-blue-100 text-sm">info@tdcghana.gov.gh</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-blue-500 mt-8 pt-8 text-center">
          <p className="text-blue-100 text-sm">
            © 2024 TDC Ghana Ltd. All rights reserved. |
            <Link href="/privacy" className="hover:text-white transition-colors ml-1">
              Privacy Policy
            </Link>{" "}
            |
            <Link href="/terms" className="hover:text-white transition-colors ml-1">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
