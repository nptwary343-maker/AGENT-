'use client'

import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { User, Package, LogOut, ChevronRight, LogIn } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    await signOut({ callbackUrl: '/' })
  }

  // Loading state
  if (status === 'loading') {
    return (
      <div className="max-w-md mx-auto animate-pulse">
        <div className="h-24 w-24 rounded-full bg-secondary-200 mx-auto mb-4" />
        <div className="h-6 w-32 bg-secondary-200 rounded mx-auto mb-2" />
        <div className="h-4 w-48 bg-secondary-200 rounded mx-auto" />
      </div>
    )
  }

  // Not logged in
  if (!session) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <div className="w-24 h-24 rounded-full bg-secondary-100 flex items-center justify-center mx-auto mb-6">
          <User className="h-12 w-12 text-secondary-400" />
        </div>
        <h1 className="text-xl font-semibold text-secondary-900 mb-2">
          Welcome to Asthar Hat
        </h1>
        <p className="text-secondary-500 mb-6">
          Sign in to view your profile and orders
        </p>
        <div className="flex flex-col gap-3">
          <Link href="/login">
            <Button className="w-full" leftIcon={<LogIn className="h-4 w-4" />}>
              Sign In
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="outline" className="w-full">
              Create Account
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  // Logged in user
  return (
    <div className="max-w-md mx-auto">
      {/* Profile Header */}
      <div className="text-center mb-8">
        <div className="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl font-bold text-primary-600">
            {session.user?.name?.[0]?.toUpperCase() || session.user?.email?.[0]?.toUpperCase() || 'U'}
          </span>
        </div>
        <h1 className="text-xl font-semibold text-secondary-900">
          {session.user?.name || 'User'}
        </h1>
        <p className="text-secondary-500">{session.user?.email}</p>
      </div>

      {/* Menu Items */}
      <div className="bg-white rounded-xl border border-secondary-200 divide-y divide-secondary-100">
        <Link
          href="/profile/orders"
          className="flex items-center justify-between p-4 hover:bg-secondary-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary-100 flex items-center justify-center">
              <Package className="h-5 w-5 text-secondary-600" />
            </div>
            <div>
              <p className="font-medium text-secondary-900">My Orders</p>
              <p className="text-sm text-secondary-500">View order history</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-secondary-400" />
        </Link>

        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center justify-between p-4 w-full hover:bg-secondary-50 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <LogOut className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="font-medium text-red-600">
                {isLoggingOut ? 'Signing out...' : 'Sign Out'}
              </p>
              <p className="text-sm text-secondary-500">Log out of your account</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}
