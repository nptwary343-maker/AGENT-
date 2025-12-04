import { cn } from '@/lib/utils'

export interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'discount'
  size?: 'sm' | 'md'
  className?: string
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
}: BadgeProps) {
  const variants = {
    default: 'bg-secondary-100 text-secondary-700',
    primary: 'bg-primary-100 text-primary-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    danger: 'bg-red-100 text-red-700',
    discount: 'bg-primary-600 text-white',
  }

  const sizes = {
    sm: 'px-1.5 py-0.5 text-xs',
    md: 'px-2 py-1 text-xs',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center font-semibold rounded',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  )
}

// Specialized discount badge for product cards
export function DiscountBadge({
  percentage,
  className,
}: {
  percentage: number
  className?: string
}) {
  return (
    <Badge variant="discount" size="sm" className={cn('absolute top-2 left-2', className)}>
      -{percentage}%
    </Badge>
  )
}

// Stock status badge
export function StockBadge({
  inStock,
  className,
}: {
  inStock: boolean
  className?: string
}) {
  return (
    <Badge
      variant={inStock ? 'success' : 'danger'}
      size="sm"
      className={className}
    >
      {inStock ? 'In Stock' : 'Out of Stock'}
    </Badge>
  )
}
