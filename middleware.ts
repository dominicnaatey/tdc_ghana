import { updateSession } from "@/lib/supabase/middleware"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
const ENABLE_MIDDLEWARE = String(process.env.ENABLE_MIDDLEWARE || "").toLowerCase() === "true"

export async function middleware(request: NextRequest) {
  if (!ENABLE_MIDDLEWARE) {
    return NextResponse.next({ request })
  }
  return await updateSession(request)
}

export const config = {
  // Narrow scope to admin and auth routes; keeps public pages free from middleware
  matcher: [
    "/admin/:path*",
    "/auth/:path*",
  ],
}
