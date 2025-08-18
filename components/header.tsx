"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "News", href: "/news" },
    { name: "Residential Houses", href: "/housing" },
    { name: "Serviced Plots", href: "/land" },
    { name: "Current Projects", href: "/projects" },
    { name: "Downloads", href: "/downloads" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm transition-all duration-300 ${isScrolled ? 'shadow-md' : 'shadow-sm'}`}>
      <div className="w-full mx-auto px-8 sm:px-12 lg:px-16 xl:px-20 2xl:px-24">
        <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-16' : 'h-28'}`}>
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 pr-6">
            <Link href="/" className="flex items-center space-x-3">
              <div className={`flex items-center justify-center transition-all duration-300 ${isScrolled ? 'w-10 h-10' : 'w-16 h-16'}`}>
                <Image
                  src={isScrolled ? "/tdc_logo_2.png" : "/tdc_logo.png"}
                  alt="TDC Ghana Ltd Logo"
                  width={isScrolled ? 40 : 64}
                  height={isScrolled ? 40 : 64}
                  className="object-contain transition-all duration-300 w-full h-auto"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-6 2xl:space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-cyan-800 transition-colors duration-200 font-medium text-base whitespace-nowrap px-3 py-2 rounded-md hover:bg-gray-50"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block flex-shrink-0">
            <Button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-md font-medium ml-6">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-8 py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-gray-700 hover:text-cyan-800 transition-colors duration-200 font-medium py-2 px-3 rounded-md hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
