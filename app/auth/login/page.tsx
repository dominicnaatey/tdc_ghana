import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import LoginForm from "@/components/login-form"

export default async function LoginPage() {
  // Check if user is already logged in
  const supabase = createServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If user is logged in, redirect to admin dashboard
  if (session) {
    redirect("/admin")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-800 to-cyan-900 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-6">
            <span className="text-cyan-800 font-bold text-xl font-serif">TDC</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Admin Login</h2>
          <p className="text-cyan-100">Sign in to access the TDC Ghana admin panel</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
