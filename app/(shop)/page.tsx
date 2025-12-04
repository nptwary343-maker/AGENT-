import { Suspense } from 'react'
import { prisma } from '@/lib/prisma'
import { HeroSlider } from '@/components/home/HeroSlider'
import { QuickCategories, QuickCategoriesSkeleton } from '@/components/home/QuickCategories'
import { FlashSale, FlashSaleSkeleton } from '@/components/home/FlashSale'
import { JustForYou, JustForYouSkeleton } from '@/components/home/JustForYou'
import { HeroSliderSkeleton } from '@/components/ui/Skeleton'

// Fetch categories for quick categories section
async function getCategories() {
  return prisma.category.findMany({
    orderBy: { name: 'asc' },
  })
}

// Fetch flash sale products
async function getFlashSaleProducts() {
  return prisma.product.findMany({
    where: { isFlashSale: true },
    take: 8,
    include: {
      category: {
        select: { id: true, name: true, slug: true },
      },
    },
  })
}

// Fetch initial products for "Just For You" section
async function getInitialProducts() {
  return prisma.product.findMany({
    take: 12,
    orderBy: { createdAt: 'desc' },
    include: {
      category: {
        select: { id: true, name: true, slug: true },
      },
    },
  })
}

export default async function HomePage() {
  // Fetch all data in parallel
  const [categories, flashSaleProducts, initialProducts] = await Promise.all([
    getCategories(),
    getFlashSaleProducts(),
    getInitialProducts(),
  ])

  return (
    <div className="space-y-6">
      {/* Hero Slider - Banner Carousel with Autoplay */}
      <Suspense fallback={<HeroSliderSkeleton />}>
        <HeroSlider />
      </Suspense>

      {/* Quick Categories - Circular Icons with Horizontal Scroll */}
      <Suspense fallback={<QuickCategoriesSkeleton />}>
        <QuickCategories categories={categories} />
      </Suspense>

      {/* Flash Sale - Countdown Timer + Horizontal Product Scroll */}
      {flashSaleProducts.length > 0 && (
        <Suspense fallback={<FlashSaleSkeleton />}>
          <FlashSale products={flashSaleProducts} />
        </Suspense>
      )}

      {/* Just For You - Infinite Scroll Product Grid */}
      <Suspense fallback={<JustForYouSkeleton />}>
        <JustForYou 
          initialProducts={initialProducts} 
          hasMore={initialProducts.length >= 12}
        />
      </Suspense>
    </div>
  )
}

// Metadata for SEO
export const metadata = {
  title: 'Home | Asthar Hat',
  description: 'Discover premium hats, caps, beanies, and more. Shop the latest styles with fast delivery.',
}
