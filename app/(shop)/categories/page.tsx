import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { 
  CircleDot, 
  Snowflake, 
  Sun, 
  CloudSun, 
  Umbrella,
  Crown,
  ChevronRight
} from 'lucide-react'

// Map category icons to Lucide components
const iconMap: Record<string, React.ReactNode> = {
  cap: <CircleDot className="h-8 w-8" />,
  beanie: <CloudSun className="h-8 w-8" />,
  fedora: <Crown className="h-8 w-8" />,
  sun: <Sun className="h-8 w-8" />,
  bucket: <Umbrella className="h-8 w-8" />,
  snowflake: <Snowflake className="h-8 w-8" />,
}

async function getCategories() {
  return prisma.category.findMany({
    orderBy: { name: 'asc' },
    include: {
      _count: {
        select: { products: true },
      },
    },
  })
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div>
      <h1 className="text-2xl font-bold text-secondary-900 mb-6">
        All Categories
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="flex items-center gap-4 p-4 bg-white rounded-xl border border-secondary-200 hover:border-primary-300 hover:shadow-md transition-all group"
          >
            {/* Icon */}
            <div className="w-14 h-14 rounded-full bg-secondary-100 flex items-center justify-center text-secondary-600 group-hover:bg-primary-100 group-hover:text-primary-600 transition-colors">
              {category.icon && iconMap[category.icon] 
                ? iconMap[category.icon] 
                : <CircleDot className="h-8 w-8" />}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors">
                {category.name}
              </h2>
              <p className="text-sm text-secondary-500">
                {category._count.products} products
              </p>
            </div>

            {/* Arrow */}
            <ChevronRight className="h-5 w-5 text-secondary-400 group-hover:text-primary-600 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Categories | Asthar Hat',
  description: 'Browse all hat categories - caps, beanies, fedoras, sun hats, and more.',
}
