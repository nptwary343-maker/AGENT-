'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Grid3X3, ShoppingCart, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCartStore } from '@/stores/cartStore'

interface NavItem {
  href: string
  label: string
  icon: React.ReactNode
  badge?: number
}

export function BottomNav() {
  const pathname = usePathname()
  const cartItemCount = useCartStore((state) => state.getItemCount())

  const navItems: NavItem[] = [
    {
      href: '/',
      label: 'Home',
      icon: <Home className="h-5 w-5" />,
    },
    {
      href: '/categories',
      label: 'Categories',
      icon: <Grid3X3 className="h-5 w-5" />,
    },
    {
      href: '/cart',
      label: 'Cart',
      icon: <ShoppingCart className="h-5 w-5" />,
      badge: cartItemCount,
    },
    {
      href: '/profile',
      label: 'Profile',
      icon: <User className="h-5 w-5" />,
    },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-secondary-200 pb-safe">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex flex-col items-center justify-center gap-1 w-full h-full text-xs font-medium transition-colors',
              isActive(item.href)
                ? 'text-primary-600'
                : 'text-secondary-500 hover:text-secondary-700'
            )}
          >
            <div className="relative">
              {item.icon}
              {item.badge !== undefined && item.badge > 0 && (
                <span className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center bg-primary-600 text-white text-[10px] font-bold rounded-full">
                  {item.badge > 99 ? '99+' : item.badge}
                </span>
              )}
            </div>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
