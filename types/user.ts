export interface User {
  id: string
  email: string
  name: string | null
  createdAt: Date
  updatedAt: Date
}

export interface UserSession {
  id: string
  email: string
  name: string | null
}

export type OrderStatus = 'PENDING' | 'ACCEPTED' | 'PICKED' | 'DELIVERED'

export interface Order {
  id: string
  userId: string
  total: number
  status: OrderStatus
  createdAt: Date
  updatedAt: Date
  items: OrderItem[]
  tracking: OrderTracking[]
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  quantity: number
  price: number
}

export interface OrderTracking {
  id: string
  orderId: string
  riderId: string | null
  gpsLat: number | null
  gpsLng: number | null
  status: OrderStatus
  timestamp: Date
}

// Order status display helpers
export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: 'Order Placed',
  ACCEPTED: 'Order Confirmed',
  PICKED: 'Out for Delivery',
  DELIVERED: 'Delivered',
}

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  ACCEPTED: 'bg-blue-100 text-blue-800',
  PICKED: 'bg-purple-100 text-purple-800',
  DELIVERED: 'bg-green-100 text-green-800',
}
