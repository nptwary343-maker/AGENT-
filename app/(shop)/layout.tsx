import { Header } from '@/components/layout/Header'
import { BottomNav } from '@/components/layout/BottomNav'
import { Sidebar } from '@/components/layout/Sidebar'
import { prisma } from '@/lib/prisma'

async function getCategories() {
  return prisma.category.findMany({
    orderBy: { name: 'asc' },
  })
}

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const categories = await getCategories()

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <Header />

      {/* Main content area */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <Sidebar categories={categories} />

          {/* Main content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Spacer for bottom nav on mobile */}
      <div className="h-16 md:hidden" />
    </div>
  )
}
