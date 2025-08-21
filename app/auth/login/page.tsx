import LoginForm from '@/components/login-form'
import Image from 'next/image'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <Image
            src="/tdc_logo.png"
            alt="TDC Logo"
            width={120}
            height={60}
            className="mx-auto mb-4"
          />
          <h2 className="text-3xl font-bold text-gray-900">Admin Login</h2>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
