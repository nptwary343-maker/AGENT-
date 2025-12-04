'use client'

import Link from 'next/link'
import { 
  CircleDot, 
  Snowflake, 
  Sun, 
  CloudSun, 
  Umbrella,
  Crown 
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Category } from '@/types'

interface QuickCategoriesProps {
  categories: Category[]
}

// Map category icons to Lucide components
const iconMap: Record<string, React.ReactNode> = {
  cap: <CircleDot className="h-6 w-6" />,
  beanie: <CloudSun className="h-6 w-6" />,
  fedora: <Crown className="h-6 w-6" />,
  sun: <Sun className="h-6 w-6" />,
  bucket: <Umbrella className="h-6 w-6" />,
  snowflake: <Snowflake className="h-6 w-6" />,
}

export function QuickCategories({ categories }: QuickCategoriesProps) {
  return (
    <section className="py-4">
      <h2 className="text-lg font-semibold text-secondary-900 mb-3 px-1">
        Shop by Category
      </h2>
      
      {/* Horizontal scroll container */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="flex flex-col items-center gap-2 shrink-0 group"
          >
            {/* Circular icon container */}
            <div className={cn(
              'w-16 h-16 rounded-full flex items-center justify-center',
              'bg-secondary-100 text-secondary-600',
              'group-hover:bg-primary-100 group-hover:text-primary-600',
              'transition-colors duration-200'
            )}>
              {category.icon && iconMap[category.icon] 
                ? iconMap[category.icon] 
                : <CircleDot className="h-6 w-6" />}
            </div>
            
            {/* Category name */}
            <span className="text-xs font-medium text-secondary-700 group-hover:text-primary-600 transition-colors text-center max-w-[80px] truncate">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}

// Skeleton loader for categories
export function QuickCategoriesSkeleton() {
  return (
    <section className="py-4">
      <div className="h-6 w-36 bg-secondary-200 rounded animate-pulse mb-3" />
      <div className="flex gap-4 overflow-hidden -mx-4 px-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2 shrink-0">
            <div className="w-16 h-16 rounded-full bg-secondary-200 animate-pulse" />
            <div className="h-4 w-14 bg-secondary-200 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </section>
  )
}
