'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/lib/utils'
import { calculateDiscountPercentage, getDisplayPrice } from '@/types/product'
import { useCartStore } from '@/stores/cartStore'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)
  const { currentPrice, originalPrice, hasDiscount } = getDisplayPrice(product)
  const discountPercentage = calculateDiscountPercentage(product.price, product.discountPrice)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    addItem({
      productId: product.id,
      title: product.title,
      slug: product.slug,
      price: product.price,
      discountPrice: product.discountPrice,
      thumbnail: product.thumbnail,
    })
  }

  const isOutOfStock = product.stockStatus === 'OUT_OF_STOCK'

  return (
    <Link
      href={`/products/${product.slug}`}
      className={cn(
        'group flex flex-col overflow-hidden rounded-xl border border-secondary-200 bg-white transition-shadow hover:shadow-lg',
        className
      )}
    >
      {/* Image Container - 1:1 Aspect Ratio per AGENTS.md */}
      <div className="relative aspect-square overflow-hidden bg-secondary-100">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={cn(
            'object-cover transition-transform duration-300 group-hover:scale-105',
            isOutOfStock && 'opacity-50'
          )}
        />
        
        {/* Discount Badge - Top Left per AGENTS.md */}
        {hasDiscount && discountPercentage && (
          <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-primary-600 text-white text-xs font-semibold rounded">
            -{discountPercentage}%
          </span>
        )}
        
        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="px-3 py-1 bg-white text-secondary-900 text-sm font-medium rounded-full">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-3">
        {/* Title - Max 2 lines per AGENTS.md */}
        <h3 className="text-sm font-medium text-secondary-900 line-clamp-2 min-h-[2.5rem]">
          {product.title}
        </h3>

        {/* Price Section */}
        <div className="flex items-center gap-2 mt-2">
          {/* Original Price (strikethrough) if discounted */}
          {originalPrice && (
            <span className="text-sm text-secondary-400 line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
          {/* Current/Discounted Price (Bold/Primary) */}
          <span className={cn(
            'font-bold',
            hasDiscount ? 'text-primary-600' : 'text-secondary-900'
          )}>
            {formatPrice(currentPrice)}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={cn(
            'mt-3 flex items-center justify-center gap-2 w-full py-2 rounded-lg text-sm font-medium transition-colors',
            isOutOfStock
              ? 'bg-secondary-100 text-secondary-400 cursor-not-allowed'
              : 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800'
          )}
        >
          {/* Icon button on mobile, full button on desktop */}
          <ShoppingCart className="h-4 w-4" />
          <span className="hidden sm:inline">Add to Cart</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>
    </Link>
  )
}

// Product Grid Component
interface ProductGridProps {
  products: Product[]
  className?: string
}

export function ProductGrid({ products, className }: ProductGridProps) {
  return (
    <div className={cn(
      'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4',
      className
    )}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
