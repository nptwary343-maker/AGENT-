'use client'

import { useState, useEffect } from 'react'
import { Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getTimeRemaining } from '@/lib/utils'
import { ProductCard } from '@/components/product/ProductCard'
import type { Product } from '@/types'

interface FlashSaleProps {
  products: Product[]
  endTime?: Date
}

// Default: Flash sale ends at midnight tonight
function getDefaultEndTime(): Date {
  const now = new Date()
  const endTime = new Date(now)
  endTime.setHours(23, 59, 59, 999)
  return endTime
}

export function FlashSale({ products, endTime = getDefaultEndTime() }: FlashSaleProps) {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(endTime))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining(endTime))
    }, 1000)

    return () => clearInterval(timer)
  }, [endTime])

  // Don't render if flash sale has ended
  if (timeLeft.total <= 0) {
    return null
  }

  return (
    <section className="py-4">
      {/* Header with countdown */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary-600 fill-primary-600" />
          <h2 className="text-lg font-semibold text-secondary-900">Flash Sale</h2>
        </div>
        
        {/* Countdown Timer */}
        <div className="flex items-center gap-1 text-sm">
          <span className="text-secondary-500">Ends in:</span>
          <div className="flex gap-1">
            <TimeBlock value={timeLeft.hours} label="h" />
            <span className="text-secondary-400">:</span>
            <TimeBlock value={timeLeft.minutes} label="m" />
            <span className="text-secondary-400">:</span>
            <TimeBlock value={timeLeft.seconds} label="s" />
          </div>
        </div>
      </div>

      {/* Horizontal scroll product list */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4">
        {products.map((product) => (
          <div key={product.id} className="w-40 sm:w-48 shrink-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  )
}

// Time block component for countdown
function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex items-center gap-0.5 bg-secondary-900 text-white px-1.5 py-0.5 rounded">
      <span className="font-mono font-bold">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-xs text-secondary-300">{label}</span>
    </div>
  )
}

// Skeleton for flash sale section
export function FlashSaleSkeleton() {
  return (
    <section className="py-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 bg-secondary-200 rounded animate-pulse" />
          <div className="h-6 w-24 bg-secondary-200 rounded animate-pulse" />
        </div>
        <div className="flex gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-7 w-10 bg-secondary-200 rounded animate-pulse" />
          ))}
        </div>
      </div>
      <div className="flex gap-4 overflow-hidden -mx-4 px-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="w-40 sm:w-48 shrink-0">
            <div className="aspect-square bg-secondary-200 rounded-t-xl animate-pulse" />
            <div className="p-3 space-y-2 border border-t-0 border-secondary-200 rounded-b-xl">
              <div className="h-4 bg-secondary-200 rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-secondary-200 rounded animate-pulse" />
              <div className="h-5 w-1/2 bg-secondary-200 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
