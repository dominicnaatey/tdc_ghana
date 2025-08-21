'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')

  // For admin routes, allow full theme functionality
  if (isAdminRoute) {
    return (
      <NextThemesProvider 
        {...props}
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </NextThemesProvider>
    )
  }

  // For non-admin routes, force light mode
  return (
    <NextThemesProvider 
      {...props}
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      forcedTheme="light"
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}
