'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react'
import { useCartStore } from '@/stores/cartStore'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

export default function CartPage() {
  const items = useCartStore((state) => state.items)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)
  const clearCart = useCartStore((state) => state.clearCart)
  const getTotals = useCartStore((state) => state.getTotals)

  const totals = getTotals()

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-24 h-24 rounded-full bg-secondary-100 flex items-center justify-center mb-6">
          <ShoppingBag className="h-12 w-12 text-secondary-400" />
        </div>
        <h1 className="text-xl font-semibold text-secondary-900 mb-2">
          Your cart is empty
        </h1>
        <p className="text-secondary-500 text-center mb-6">
          Looks like you haven&apos;t added any items yet.
        </p>
        <Link href="/">
          <Button>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-secondary-900">
          Shopping Cart ({totals.itemCount})
        </h1>
        <button
          onClick={clearCart}
          className="text-sm text-secondary-500 hover:text-red-600 transition-colors"
        >
          Clear all
        </button>
      </div>

      {/* Cart Items */}
      <div className="bg-white rounded-xl border border-secondary-200 divide-y divide-secondary-100">
        {items.map((item) => {
          const itemPrice = item.discountPrice ?? item.price
          const itemTotal = itemPrice * item.quantity

          return (
            <div key={item.productId} className="flex gap-4 p-4">
              {/* Product Image */}
              <Link 
                href={`/products/${item.slug}`}
                className="relative w-20 h-20 rounded-lg overflow-hidden bg-secondary-100 shrink-0"
              >
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </Link>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <Link 
                  href={`/products/${item.slug}`}
                  className="font-medium text-secondary-900 hover:text-primary-600 line-clamp-2"
                >
                  {item.title}
                </Link>

                {/* Price */}
                <div className="flex items-center gap-2 mt-1">
                  {item.discountPrice && (
                    <span className="text-sm text-secondary-400 line-through">
                      {formatPrice(item.price)}
                    </span>
                  )}
                  <span className="font-semibold text-primary-600">
                    {formatPrice(itemPrice)}
                  </span>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-secondary-200 rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="p-2 text-secondary-600 hover:text-primary-600 disabled:opacity-50"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-10 text-center font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="p-2 text-secondary-600 hover:text-primary-600 disabled:opacity-50"
                      disabled={item.quantity >= 99}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-secondary-900">
                      {formatPrice(itemTotal)}
                    </span>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="p-2 text-secondary-400 hover:text-red-600 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Order Summary */}
      <div className="mt-6 bg-white rounded-xl border border-secondary-200 p-4">
        <h2 className="font-semibold text-secondary-900 mb-4">Order Summary</h2>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-secondary-500">Subtotal</span>
            <span className="text-secondary-900">{formatPrice(totals.subtotal)}</span>
          </div>
          
          {totals.discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-{formatPrice(totals.discount)}</span>
            </div>
          )}
          
          <div className="flex justify-between pt-2 border-t border-secondary-100">
            <span className="font-semibold text-secondary-900">Total</span>
            <span className="font-bold text-lg text-primary-600">
              {formatPrice(totals.total)}
            </span>
          </div>
        </div>

        <Button className="w-full mt-4" size="lg">
          Proceed to Checkout
        </Button>

        <p className="text-xs text-secondary-400 text-center mt-3">
          Shipping and taxes calculated at checkout
        </p>
      </div>

      {/* Continue Shopping */}
      <div className="mt-4 text-center">
        <Link 
          href="/"
          className="text-sm text-primary-600 hover:text-primary-700 inline-flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}
