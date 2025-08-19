"use client";

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebarContext } from './SidebarContext';
import Image from 'next/image';

// Navigation data for TDC Ghana admin
const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Overview",
        url: "/admin",
        icon: "📊",
      },
      {
        title: "News & Updates",
        url: "/admin/news",
        icon: "📰",
      },
      {
        title: "Housing Projects",
        url: "/admin/housing",
        icon: "🏠",
      },
      {
        title: "Land Plots",
        url: "/admin/land",
        icon: "🏞️",
      },
      {
        title: "Inquiries",
        url: "/admin/inquiries",
        icon: "📧",
      },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { setIsOpen, isOpen, isMobile, toggleSidebar } = useSidebarContext();

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "max-w-[290px] overflow-hidden border-r border-gray-200 bg-white transition-[width] duration-200 ease-linear dark:border-gray-800 dark:bg-gray-900",
          isMobile ? "fixed bottom-0 top-0 z-50" : "sticky top-0 h-screen",
          isOpen ? "w-full" : "w-0",
        )}
        aria-label="Main navigation"
        aria-hidden={!isOpen}
      >
        <div className="flex h-full flex-col py-10 pl-[25px] pr-[7px]">
          <div className="relative pr-4.5">
            <Link
              href={"/"}
              onClick={() => isMobile && toggleSidebar()}
              className="px-0 py-2.5 min-[850px]:py-0 flex items-center gap-2"
            >
              <Image
                src="/tdc_logo.png"
                alt="TDC Ghana"
                width={32}
                height={32}
                className="rounded"
              />
              <span className="font-bold text-lg">TDC Admin</span>
            </Link>

            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="absolute left-3/4 right-4.5 top-1/2 -translate-y-1/2 text-right"
              >
                <span className="sr-only">Close Menu</span>
                <span className="text-2xl">←</span>
              </button>
            )}
          </div>

          {/* Navigation */}
          <div className="custom-scrollbar mt-6 flex-1 overflow-y-auto pr-3 min-[850px]:mt-10">
            {NAV_DATA.map((section) => (
              <div key={section.label} className="mb-6">
                <h2 className="mb-5 text-sm font-medium text-gray-500 dark:text-gray-400">
                  {section.label}
                </h2>

                <nav role="navigation" aria-label={section.label}>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item.title}>
                        <Link
                          href={item.url}
                          className={cn(
                            "flex items-center gap-3 py-3 px-4 rounded-lg transition-colors",
                            pathname === item.url
                              ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                              : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                          )}
                          onClick={() => isMobile && toggleSidebar()}
                        >
                          <span className="text-xl" aria-hidden="true">
                            {item.icon}
                          </span>
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}