import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-secondary-200',
        className
      )}
    />
  )
}

// Product card skeleton for loading states
export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-secondary-200 bg-white">
      {/* Image skeleton */}
      <Skeleton className="aspect-square w-full" />
      
      {/* Content skeleton */}
      <div className="p-3 space-y-2">
        {/* Title skeleton - 2 lines */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        
        {/* Price skeleton */}
        <div className="flex items-center gap-2 pt-1">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-4 w-12" />
        </div>
        
        {/* Button skeleton */}
        <Skeleton className="h-9 w-full mt-2" />
      </div>
    </div>
  )
}

// Product grid skeleton
export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

// Category skeleton
export function CategorySkeleton() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Skeleton className="h-16 w-16 rounded-full" />
      <Skeleton className="h-4 w-14" />
    </div>
  )
}

// Categories row skeleton
export function CategoriesRowSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="flex gap-4 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <CategorySkeleton key={i} />
      ))}
    </div>
  )
}

// Hero slider skeleton
export function HeroSliderSkeleton() {
  return (
    <Skeleton className="h-40 md:h-64 w-full rounded-xl" />
  )
}

// Cart item skeleton
export function CartItemSkeleton() {
  return (
    <div className="flex gap-3 p-3 border-b border-secondary-100">
      <Skeleton className="h-20 w-20 rounded-lg shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex justify-between items-center pt-1">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-5 w-16" />
        </div>
      </div>
    </div>
  )
}
