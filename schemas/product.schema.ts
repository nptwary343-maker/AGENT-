import { z } from 'zod'

export const productQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1))
    .pipe(z.number().min(1).default(1)),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 12))
    .pipe(z.number().min(1).max(50).default(12)),
  category: z
    .string()
    .optional(),
  search: z
    .string()
    .optional(),
  sortBy: z
    .enum(['price-asc', 'price-desc', 'newest', 'popular'])
    .optional()
    .default('newest'),
  inStock: z
    .string()
    .optional()
    .transform((val) => val === 'true'),
  flashSale: z
    .string()
    .optional()
    .transform((val) => val === 'true'),
})

export const productSlugSchema = z.object({
  slug: z
    .string()
    .min(1, 'Product slug is required')
    .regex(/^[a-z0-9-]+$/, 'Invalid product slug'),
})

export const categorySlugSchema = z.object({
  slug: z
    .string()
    .min(1, 'Category slug is required')
    .regex(/^[a-z0-9-]+$/, 'Invalid category slug'),
})

export type ProductQueryInput = z.infer<typeof productQuerySchema>
export type ProductSlugInput = z.infer<typeof productSlugSchema>
export type CategorySlugInput = z.infer<typeof categorySlugSchema>
