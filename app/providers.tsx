"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/Layouts/sidebar/sidebar-context";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  // Lazy-load Supabase providers only for admin routes
  const AdminProviders = dynamic(() => import("./admin-providers"), {
    ssr: false,
  });

  if (isAdminRoute) {
    return <AdminProviders>{children}</AdminProviders>;
  }

  // Public routes: no Supabase auth helpers bundled
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      forcedTheme="light"
      disableTransitionOnChange
    >
      <SidebarProvider>{children}</SidebarProvider>
    </ThemeProvider>
  );
}
