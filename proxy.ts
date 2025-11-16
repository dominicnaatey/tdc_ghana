import { updateSession } from "./lib/supabase/middleware"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

const ENABLE_MIDDLEWARE = String(process.env.ENABLE_MIDDLEWARE || "").toLowerCase() === "true"

export async function proxy(request: NextRequest) {
  if (!ENABLE_MIDDLEWARE) {
    return NextResponse.next()
  }
  return await updateSession(request)
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/auth/:path*",
  ],
}