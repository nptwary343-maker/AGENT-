export type StockStatus = 'IN_STOCK' | 'OUT_OF_STOCK'

export interface Product {
  id: string
  title: string
  slug: string
  description: string | null
  price: number
  discountPrice: number | null
  stockStatus: StockStatus
  thumbnail: string
  images: string[]
  categoryId: string
  isFlashSale: boolean
  createdAt: Date
  updatedAt: Date
  category?: Category
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string | null
  createdAt: Date
  products?: Product[]
}

export interface ProductWithCategory extends Product {
  category: Category
}

// Utility type for product card display
export interface ProductCardData {
  id: string
  title: string
  slug: string
  price: number
  discountPrice: number | null
  stockStatus: StockStatus
  thumbnail: string
  categorySlug: string
}

// Calculate discount percentage
export function calculateDiscountPercentage(
  originalPrice: number,
  discountPrice: number | null
): number | null {
  if (!discountPrice || discountPrice >= originalPrice) return null
  return Math.round(((originalPrice - discountPrice) / originalPrice) * 100)
}

// Get display price
export function getDisplayPrice(product: Pick<Product, 'price' | 'discountPrice'>): {
  currentPrice: number
  originalPrice: number | null
  hasDiscount: boolean
} {
  const hasDiscount = product.discountPrice !== null && product.discountPrice < product.price
  return {
    currentPrice: hasDiscount ? product.discountPrice! : product.price,
    originalPrice: hasDiscount ? product.price : null,
    hasDiscount,
  }
}
