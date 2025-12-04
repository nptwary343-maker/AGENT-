'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ShoppingCart, ChevronLeft, Minus, Plus, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/lib/utils'
import { calculateDiscountPercentage, getDisplayPrice } from '@/types/product'
import { useCartStore } from '@/stores/cartStore'
import { Button } from '@/components/ui/Button'
import { Badge, StockBadge } from '@/components/ui/Badge'
import { ProductCard } from '@/components/product/ProductCard'
import type { Product } from '@/types'

interface ProductPageProps {
  params: { slug: string }
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  const addItem = useCartStore((state) => state.addItem)

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`/api/products/${params.slug}`)
        if (!response.ok) {
          setProduct(null)
          return
        }
        const data = await response.json()
        setProduct(data.product)
        setRelatedProducts(data.relatedProducts || [])
      } catch (error) {
        console.error('Failed to fetch product:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [params.slug])

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <div className="aspect-square bg-secondary-200 rounded-xl" />
          </div>
          <div className="md:w-1/2 space-y-4">
            <div className="h-8 bg-secondary-200 rounded w-3/4" />
            <div className="h-6 bg-secondary-200 rounded w-1/4" />
            <div className="h-24 bg-secondary-200 rounded" />
            <div className="h-12 bg-secondary-200 rounded w-1/2" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    notFound()
  }

  const { currentPrice, originalPrice, hasDiscount } = getDisplayPrice(product)
  const discountPercentage = calculateDiscountPercentage(product.price, product.discountPrice)
  const isOutOfStock = product.stockStatus === 'OUT_OF_STOCK'
  const allImages = [product.thumbnail, ...product.images]

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      title: product.title,
      slug: product.slug,
      price: product.price,
      discountPrice: product.discountPrice,
      thumbnail: product.thumbnail,
    }, quantity)
    
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-secondary-500 mb-6">
        <Link href="/" className="hover:text-primary-600">Home</Link>
        <span>/</span>
        <Link href="/categories" className="hover:text-primary-600">Categories</Link>
        <span>/</span>
        <Link 
          href={`/categories/${product.category?.slug}`} 
          className="hover:text-primary-600"
        >
          {product.category?.name}
        </Link>
        <span>/</span>
        <span className="text-secondary-900 truncate">{product.title}</span>
      </nav>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Images */}
        <div className="md:w-1/2">
          {/* Main Image */}
          <div className="relative aspect-square rounded-xl overflow-hidden bg-secondary-100 mb-4">
            <Image
              src={allImages[selectedImage]}
              alt={product.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {hasDiscount && discountPercentage && (
              <Badge variant="discount" className="absolute top-4 left-4">
                -{discountPercentage}%
              </Badge>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {allImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    'relative w-20 h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-colors',
                    selectedImage === index
                      ? 'border-primary-600'
                      : 'border-transparent hover:border-secondary-300'
                  )}
                >
                  <Image
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="md:w-1/2">
          {/* Category */}
          <Link
            href={`/categories/${product.category?.slug}`}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            {product.category?.name}
          </Link>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-secondary-900 mt-2">
            {product.title}
          </h1>

          {/* Stock Status */}
          <div className="mt-3">
            <StockBadge inStock={!isOutOfStock} />
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mt-4">
            <span className="text-3xl font-bold text-primary-600">
              {formatPrice(currentPrice)}
            </span>
            {originalPrice && (
              <span className="text-xl text-secondary-400 line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <p className="text-secondary-600 mt-4 leading-relaxed">
              {product.description}
            </p>
          )}

          {/* Quantity Selector */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Quantity
            </label>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-secondary-200 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-secondary-600 hover:text-primary-600 disabled:opacity-50"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(99, quantity + 1))}
                  className="p-3 text-secondary-600 hover:text-primary-600 disabled:opacity-50"
                  disabled={quantity >= 99 || isOutOfStock}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="mt-6">
            <Button
              size="lg"
              className="w-full md:w-auto"
              onClick={handleAddToCart}
              disabled={isOutOfStock || isAdded}
              leftIcon={isAdded ? <Check className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />}
            >
              {isAdded ? 'Added to Cart!' : isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-secondary-900 mb-4">
            You might also like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
