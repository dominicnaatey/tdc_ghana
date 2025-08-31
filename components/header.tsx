"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Dropdown, DropdownContent, DropdownTrigger, DropdownClose } from "@/components/ui/dropdown";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);
  const pathname = usePathname();

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "News", href: "/news" },
    { name: "Residential Houses", href: "/housing" },
    { name: "Serviced Plots", href: "/land" },
    { name: "Current Projects", href: "/projects" },
    { name: "Downloads", href: "/downloads" },
    { name: "Contact", href: "/contact" },
  ];

  const aboutSubmenuItems = [
    { name: "About Us", href: "/about" },
    { name: "Board of Directors", href: "/board-of-directors" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <img
                src="/tdc_logo_2.png"
                alt="TDC Ghana Logo"
                className="h-12 w-auto"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Home Link */}
            <Link
              href="/"
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive("/")
                  ? "text-accent"
                  : "text-gray-700 hover:text-accent"
              }`}
            >
              Home
            </Link>
            
            {/* About Dropdown */}
            <div 
              className="relative py-2 px-1"
              onMouseEnter={() => {
                if (hoverTimeout) {
                  clearTimeout(hoverTimeout);
                  setHoverTimeout(null);
                }
                setIsAboutDropdownOpen(true);
              }}
              onMouseLeave={() => {
                const timeout = setTimeout(() => {
                  setIsAboutDropdownOpen(false);
                }, 50);
                setHoverTimeout(timeout);
              }}
            >
              <Dropdown isOpen={isAboutDropdownOpen} setIsOpen={setIsAboutDropdownOpen}>
                <DropdownTrigger className={`flex items-center space-x-1 text-sm font-medium transition-colors duration-200 ${
                  isActive("/about") || isActive("/board-of-directors")
                    ? "text-accent"
                    : "text-gray-700 hover:text-accent"
                }`}>
                  <span>About</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                    isAboutDropdownOpen ? "rotate-180" : ""
                  }`} />
                </DropdownTrigger>
              <DropdownContent align="start" className="bg-white border border-gray-200 shadow-lg rounded-md py-2 min-w-[180px] !mt-0">
                {aboutSubmenuItems.map((item) => (
                  <DropdownClose key={item.name}>
                    <Link
                      href={item.href}
                      className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                        isActive(item.href)
                          ? "text-accent bg-gray-50"
                          : "text-gray-700 hover:text-accent hover:bg-gray-50"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </DropdownClose>
                ))}
              </DropdownContent>
            </Dropdown>
            </div>
            
            {/* Other Navigation Items */}
            {navigationItems.slice(1).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? "text-accent"
                    : "text-gray-700 hover:text-accent"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <Button className="bg-accent hover:bg-[#DA7A0B] text-white transition-colors duration-200">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <nav className="flex flex-col space-y-4 px-4 py-6">
              {/* Home Link */}
              <Link
                href="/"
                className={`text-base font-medium transition-colors duration-200 ${
                  isActive("/")
                    ? "text-accent"
                    : "text-gray-700 hover:text-accent"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              
              {/* About Submenu for Mobile */}
              <div className="border-t border-gray-100 pt-4">
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">About</div>
                {aboutSubmenuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block pl-4 py-2 text-base font-medium transition-colors duration-200 ${
                      isActive(item.href)
                        ? "text-accent"
                        : "text-gray-700 hover:text-accent"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              
              {/* Other Navigation Items */}
              {navigationItems.slice(1).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-base font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? "text-accent"
                      : "text-gray-700 hover:text-accent"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <Button className="bg-accent hover:bg-[#DA7A0B] text-white transition-colors duration-200 mt-4">
                Get Started
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
