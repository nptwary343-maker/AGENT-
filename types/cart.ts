import type { Product } from './product'

export interface CartItem {
  id: string
  productId: string
  product: Product
  quantity: number
}

export interface Cart {
  id: string
  userId: string
  items: CartItem[]
  updatedAt: Date
}

// For Zustand store - client-side cart item
export interface CartStoreItem {
  productId: string
  title: string
  slug: string
  price: number
  discountPrice: number | null
  thumbnail: string
  quantity: number
}

// Cart totals calculation
export interface CartTotals {
  subtotal: number
  discount: number
  total: number
  itemCount: number
}

export function calculateCartTotals(items: CartStoreItem[]): CartTotals {
  let subtotal = 0
  let discount = 0
  let itemCount = 0

  for (const item of items) {
    const originalTotal = item.price * item.quantity
    const discountedTotal = (item.discountPrice ?? item.price) * item.quantity
    
    subtotal += originalTotal
    discount += originalTotal - discountedTotal
    itemCount += item.quantity
  }

  return {
    subtotal,
    discount,
    total: subtotal - discount,
    itemCount,
  }
}
