'use client'

import Link from 'next/link'
import { Search, ShoppingCart, User, Menu } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useCartStore } from '@/stores/cartStore'

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const cartItemCount = useCartStore((state) => state.getItemCount())
  const openCart = useCartStore((state) => state.openCart)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-secondary-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-primary-600 shrink-0"
          >
            <span className="hidden sm:inline">Asthar Hat</span>
            <span className="sm:hidden">AH</span>
          </Link>

          {/* Search Bar - Desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md mx-8"
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for hats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-full border border-secondary-300 bg-secondary-50 text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary-400" />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 text-secondary-600 hover:text-primary-600 hover:bg-secondary-100 rounded-full transition-colors"
              aria-label="Toggle search"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative p-2 text-secondary-600 hover:text-primary-600 hover:bg-secondary-100 rounded-full transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-primary-600 text-white text-xs font-bold rounded-full">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </button>

            {/* Profile - Desktop */}
            <Link
              href="/profile"
              className="hidden md:flex p-2 text-secondary-600 hover:text-primary-600 hover:bg-secondary-100 rounded-full transition-colors"
              aria-label="Profile"
            >
              <User className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div
          className={cn(
            'md:hidden overflow-hidden transition-all duration-200',
            isSearchOpen ? 'max-h-16 pb-3' : 'max-h-0'
          )}
        >
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for hats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-full border border-secondary-300 bg-secondary-50 text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary-400" />
            </div>
          </form>
        </div>
      </div>
    </header>
  )
}
