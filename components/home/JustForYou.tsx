'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { Loader2 } from 'lucide-react'
import { ProductCard } from '@/components/product/ProductCard'
import { ProductGridSkeleton } from '@/components/ui/Skeleton'
import type { Product } from '@/types'

interface JustForYouProps {
  initialProducts: Product[]
  hasMore?: boolean
}

export function JustForYou({ initialProducts, hasMore: initialHasMore = true }: JustForYouProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(initialHasMore)
  const observerRef = useRef<HTMLDivElement>(null)

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return

    setIsLoading(true)
    try {
      const nextPage = page + 1
      const response = await fetch(`/api/products?page=${nextPage}&limit=12`)
      const data = await response.json()

      if (data.products && data.products.length > 0) {
        setProducts((prev) => [...prev, ...data.products])
        setPage(nextPage)
        setHasMore(data.hasMore ?? false)
      } else {
        setHasMore(false)
      }
    } catch (error) {
      console.error('Failed to load more products:', error)
    } finally {
      setIsLoading(false)
    }
  }, [isLoading, hasMore, page])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore()
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => observer.disconnect()
  }, [hasMore, isLoading, loadMore])

  return (
    <section className="py-4">
      <h2 className="text-lg font-semibold text-secondary-900 mb-4">
        Just For You
      </h2>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Loading indicator / Observer target */}
      <div ref={observerRef} className="py-8 flex justify-center">
        {isLoading && (
          <div className="flex items-center gap-2 text-secondary-500">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Loading more products...</span>
          </div>
        )}
        {!hasMore && products.length > 0 && (
          <p className="text-secondary-400 text-sm">
            You&apos;ve seen all products
          </p>
        )}
      </div>
    </section>
  )
}

// Initial skeleton for the section
export function JustForYouSkeleton() {
  return (
    <section className="py-4">
      <div className="h-6 w-28 bg-secondary-200 rounded animate-pulse mb-4" />
      <ProductGridSkeleton count={8} />
    </section>
  )
}
