import { z } from 'zod'

export const addToCartSchema = z.object({
  productId: z
    .string()
    .min(1, 'Product ID is required')
    .uuid('Invalid product ID'),
  quantity: z
    .number()
    .int('Quantity must be a whole number')
    .min(1, 'Quantity must be at least 1')
    .max(99, 'Quantity cannot exceed 99')
    .default(1),
})

export const updateCartItemSchema = z.object({
  productId: z
    .string()
    .min(1, 'Product ID is required')
    .uuid('Invalid product ID'),
  quantity: z
    .number()
    .int('Quantity must be a whole number')
    .min(0, 'Quantity cannot be negative')
    .max(99, 'Quantity cannot exceed 99'),
})

export const removeFromCartSchema = z.object({
  productId: z
    .string()
    .min(1, 'Product ID is required')
    .uuid('Invalid product ID'),
})

export type AddToCartInput = z.infer<typeof addToCartSchema>
export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>
export type RemoveFromCartInput = z.infer<typeof removeFromCartSchema>
