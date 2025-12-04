import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { ProductGrid } from '@/components/product/ProductCard'

interface CategoryPageProps {
  params: { slug: string }
}

async function getCategory(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
  })
}

async function getCategoryProducts(categoryId: string) {
  return prisma.product.findMany({
    where: { categoryId },
    orderBy: { createdAt: 'desc' },
    include: {
      category: {
        select: { id: true, name: true, slug: true },
      },
    },
  })
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await getCategory(params.slug)

  if (!category) {
    notFound()
  }

  const products = await getCategoryProducts(category.id)

  return (
    <div>
      {/* Category Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-secondary-900">
          {category.name}
        </h1>
        <p className="text-secondary-500 mt-1">
          {products.length} product{products.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <div className="text-center py-12">
          <p className="text-secondary-500">No products in this category yet.</p>
        </div>
      )}
    </div>
  )
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const category = await getCategory(params.slug)
  
  if (!category) {
    return { title: 'Category Not Found' }
  }

  return {
    title: `${category.name} | Asthar Hat`,
    description: `Shop ${category.name} at Asthar Hat. Find the perfect hat for any occasion.`,
  }
}
