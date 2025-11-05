"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
  DropdownClose,
} from "@/components/ui/dropdown";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef, KeyboardEvent } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isServicedPlotsDropdownOpen, setIsServicedPlotsDropdownOpen] =
    useState(false);
  const [isCareersDropdownOpen, setIsCareersDropdownOpen] = useState(false);
  const hoverTimeoutRef = useRef<number | null>(null);

  // Custom 1100px breakpoint for responsive behavior
  const [isCompact, setIsCompact] = useState<boolean>(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 1100px)");
    const applyMatch = (matches: boolean) => setIsCompact(matches);
    // Initialize
    applyMatch(mq.matches);
    // Listen for media query changes
    const mqListener = (e: MediaQueryListEvent) => applyMatch(e.matches);
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", mqListener);
    } else {
      // Fallback for older browsers
      // @ts-ignore
      mq.addListener(mqListener);
    }
    // Safety net on window resize
    const resizeListener = () => applyMatch(mq.matches);
    window.addEventListener("resize", resizeListener);
    return () => {
      if (typeof mq.removeEventListener === "function") {
        mq.removeEventListener("change", mqListener);
      } else {
        // @ts-ignore
        mq.removeListener(mqListener);
      }
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
    };
  }, []);
  const pathname = usePathname();

  // Auto-close mobile menu when switching to desktop layout
  useEffect(() => {
    if (!isCompact) {
      setIsMenuOpen(false);
    }
  }, [isCompact]);

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "News", href: "/news" },
    // Replaced Residential Houses with Careers dropdown; keep other items
    { name: "Current Projects", href: "/projects" },
    { name: "Downloads", href: "/downloads" },
    { name: "Contact", href: "/contact" },
  ];

  const aboutSubmenuItems = [
    { name: "About Us", href: "/about" },
    { name: "Board of Directors", href: "/board-of-directors" },
    { name: "Management", href: "/management" },
    { name: "Gallery", href: "/gallery" },
  ];

  const servicedPlotsSubmenuItems = [
    { name: "Serviced Plots", href: "/serviced-plots" },
    {
      name: "Residential & Commercial",
      href: "/serviced-plots/residential-commercial",
    },
    {
      name: "Plot Options & Prices",
      href: "/serviced-plots/plot-options-prices",
    },
    { name: "Why Choose TDC Plots", href: "/serviced-plots/why-choose-tdc" },
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
              <span className="text-lg md:text-xl font-semibold text-gray-900 whitespace-nowrap">
                TDC Ghana Ltd.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className={`${isCompact ? "hidden" : "flex"} items-center space-x-8 ml-auto`}
            role="navigation"
            aria-label="Primary"
          >
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
                if (hoverTimeoutRef.current) {
                  clearTimeout(hoverTimeoutRef.current);
                  hoverTimeoutRef.current = null;
                }
                setIsAboutDropdownOpen(true);
              }}
              onMouseLeave={() => {
                hoverTimeoutRef.current = window.setTimeout(() => {
                  setIsAboutDropdownOpen(false);
                }, 150);
              }}
            >
              <Dropdown
                isOpen={isAboutDropdownOpen}
                setIsOpen={setIsAboutDropdownOpen}
              >
                <DropdownTrigger
                  className={`flex items-center space-x-1 text-sm font-medium transition-colors duration-200 ${
                    isActive("/about") ||
                    isActive("/board-of-directors") ||
                    isActive("/management")
                      ? "text-accent"
                      : "text-gray-700 hover:text-accent"
                  }`}
                >
                  <span>About</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isAboutDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </DropdownTrigger>

                <DropdownContent
                  align="start"
                  className={`bg-white border border-gray-200 shadow-lg rounded-md py-2 min-w-[200px] !mt-0 transition-all duration-200 ease-out transform origin-top ${
                    isAboutDropdownOpen
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
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

            {/* Serviced Plots Dropdown */}
            <div
              className="relative py-2 px-1"
              onMouseEnter={() => {
                if (hoverTimeoutRef.current) {
                  clearTimeout(hoverTimeoutRef.current);
                  hoverTimeoutRef.current = null;
                }
                setIsServicedPlotsDropdownOpen(true);
              }}
              onMouseLeave={() => {
                hoverTimeoutRef.current = window.setTimeout(() => {
                  setIsServicedPlotsDropdownOpen(false);
                }, 120);
              }}
            >
              <Dropdown
                isOpen={isServicedPlotsDropdownOpen}
                setIsOpen={setIsServicedPlotsDropdownOpen}
              >
                <DropdownTrigger
                  className={`flex items-center space-x-1 text-sm font-medium transition-colors duration-200 ${
                    isActive("/serviced-plots")
                      ? "text-accent"
                      : "text-gray-700 hover:text-accent"
                  }`}
                >
                  <span>Serviced Plots</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isServicedPlotsDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </DropdownTrigger>
                <DropdownContent
                  align="start"
                  className={`bg-white border border-gray-200 shadow-lg rounded-md py-2 min-w-[200px] !mt-0 transition-all duration-200 ease-out transform origin-top ${
                    isServicedPlotsDropdownOpen
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  {servicedPlotsSubmenuItems.map((item) => (
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
            {navigationItems
              .slice(1)
              .filter((item) => item.name !== "Contact")
              .map((item) => (
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

            {/* Careers Dropdown (positioned before Contact) */}
            <div
              className="relative py-2 px-1"
              onMouseEnter={() => {
                if (hoverTimeoutRef.current) {
                  clearTimeout(hoverTimeoutRef.current);
                  hoverTimeoutRef.current = null;
                }
                setIsCareersDropdownOpen(true);
              }}
              onMouseLeave={() => {
                hoverTimeoutRef.current = window.setTimeout(() => {
                  setIsCareersDropdownOpen(false);
                }, 120);
              }}
            >
              <Dropdown isOpen={isCareersDropdownOpen} setIsOpen={setIsCareersDropdownOpen}>
                <DropdownTrigger
                  className={`flex items-center space-x-1 text-sm font-medium transition-colors duration-200 ${
                    isActive("/careers")
                      ? "text-accent"
                      : "text-gray-700 hover:text-accent"
                  }`}
                >
                  <span>Careers</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isCareersDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </DropdownTrigger>
                <DropdownContent
                  align="start"
                  className={`bg-white border border-gray-200 shadow-lg rounded-md py-2 min-w-[200px] !mt-0 transition-all duration-200 ease-out transform origin-top ${
                    isCareersDropdownOpen
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <DropdownClose>
                    <Link
                      href="/careers/job-openings"
                      className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                        isActive("/careers/job-openings")
                          ? "text-accent bg-gray-50"
                          : "text-gray-700 hover:text-accent hover:bg-gray-50"
                      }`}
                    >
                      Job Openings
                    </Link>
                  </DropdownClose>
                  <DropdownClose>
                    <Link
                      href="/careers/consultancy-service"
                      className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                        isActive("/careers/consultancy-service")
                          ? "text-accent bg-gray-50"
                          : "text-gray-700 hover:text-accent hover:bg-gray-50"
                      }`}
                    >
                      Consultancy Service
                    </Link>
                  </DropdownClose>
                </DropdownContent>
              </Dropdown>
            </div>

            {/* Contact Link (last) */}
            {navigationItems.find((i) => i.name === "Contact") && (
              <Link
                href={navigationItems.find((i) => i.name === "Contact")!.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive("/contact")
                    ? "text-accent"
                    : "text-gray-700 hover:text-accent"
                }`}
              >
                Contact
              </Link>
            )}
          </nav>

          {/* CTA Button - removed as requested */}

          {/* Mobile Menu Button */}
          <button
            className={`p-2 ${isCompact ? "" : "hidden"}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-haspopup="true"
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
            onKeyDown={(e: KeyboardEvent<HTMLButtonElement>) => {
              if (e.key === "Escape") setIsMenuOpen(false);
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setIsMenuOpen((prev) => !prev);
              }
            }}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

          {/* Mobile Navigation */}
          {isCompact && (
            <div
              id="mobile-menu"
              className={`border-t border-gray-200 bg-white transition-all duration-300 ease-out transform origin-top ${
                isMenuOpen
                  ? "opacity-100 scale-100 max-h-[100vh]"
                  : "opacity-0 scale-95 max-h-0 pointer-events-none"
              } overflow-hidden`}
              aria-hidden={!isMenuOpen}
            >
              <nav
                className="flex flex-col space-y-4 px-4 py-6"
                role="navigation"
                aria-label="Mobile Primary"
              >
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
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  About
                </div>
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

              {/* Serviced Plots Submenu for Mobile */}
              <div className="border-t border-gray-100 pt-4">
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Serviced Plots
                </div>
                {servicedPlotsSubmenuItems.map((item) => (
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

              {/* Other Navigation Items before Contact */}
              {navigationItems
                .slice(1)
                .filter((item) => item.name !== "Contact")
                .map((item) => (
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

              {/* Careers Submenu for Mobile (positioned before Contact) */}
              <div className="border-t border-gray-100 pt-4">
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Careers
                </div>
                {[
                  { name: "Job Openings", href: "/careers/job-openings" },
                  { name: "Consultancy Service", href: "/careers/consultancy-service" },
                ].map((item) => (
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

              {/* Contact Link (last) */}
              {navigationItems.find((i) => i.name === "Contact") && (
                <Link
                  href={navigationItems.find((i) => i.name === "Contact")!.href}
                  className={`text-base font-medium transition-colors duration-200 ${
                    isActive("/contact")
                      ? "text-accent"
                      : "text-gray-700 hover:text-accent"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              )}

              {/* Mobile CTA Button - removed as requested */}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
