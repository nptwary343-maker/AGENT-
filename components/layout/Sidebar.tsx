'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Category } from '@/types'

interface SidebarProps {
  categories: Category[]
}

export function Sidebar({ categories }: SidebarProps) {
  const pathname = usePathname()

  const isActive = (slug: string) => {
    return pathname === `/categories/${slug}`
  }

  return (
    <aside className="hidden md:block w-64 shrink-0">
      <div className="sticky top-20 bg-white rounded-xl border border-secondary-200 overflow-hidden">
        <div className="p-4 border-b border-secondary-200 bg-secondary-50">
          <h2 className="font-semibold text-secondary-900">Categories</h2>
        </div>
        <nav className="p-2">
          <ul className="space-y-1">
            <li>
              <Link
                href="/categories"
                className={cn(
                  'flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  pathname === '/categories'
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
                )}
              >
                <span>All Categories</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/categories/${category.slug}`}
                  className={cn(
                    'flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive(category.slug)
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
                  )}
                >
                  <span>{category.name}</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  )
}

// Sidebar skeleton for loading state
export function SidebarSkeleton() {
  return (
    <aside className="hidden md:block w-64 shrink-0">
      <div className="sticky top-20 bg-white rounded-xl border border-secondary-200 overflow-hidden">
        <div className="p-4 border-b border-secondary-200 bg-secondary-50">
          <div className="h-5 w-24 bg-secondary-200 rounded animate-pulse" />
        </div>
        <nav className="p-2">
          <ul className="space-y-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <li key={i}>
                <div className="flex items-center justify-between px-3 py-2">
                  <div className="h-4 w-20 bg-secondary-200 rounded animate-pulse" />
                  <div className="h-4 w-4 bg-secondary-200 rounded animate-pulse" />
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  )
}
