"use client"

import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from '@/lib/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { EyeIcon, EyeSlashIcon, EnvelopeIcon, LockClosedIcon } from '@/assets/icons'
import { useState } from 'react'

// Fix the initial state type
const initialState = {
  error: undefined,
  success: false,
}

export default function LoginForm() {
  const [state, formAction] = useActionState(signIn, initialState)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  // Handle successful login redirect
  useEffect(() => {
    if (state?.success) {
      router.push('/admin')
    }
  }, [state?.success, router])

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {state.error}
        </div>
      )}
      
      <div className="space-y-4">
        <div className="relative">
          <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            id="email"
            name="email"
            type="email"
            required
            className="pl-10"
            placeholder="Email address"
          />
        </div>
        
        <div className="relative">
          <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            required
            className="pl-10 pr-10"
            placeholder="Password"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5 text-gray-400" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
      </div>
      
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  return (
    <Button type="submit" className="w-full">
      Sign In
    </Button>
  )
}
