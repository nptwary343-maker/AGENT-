import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getOrSetCache } from '@/lib/redis'

export async function GET() {
  try {
    // Try to get from cache first
    const categories = await getOrSetCache(
      'categories:all',
      async () => {
        return prisma.category.findMany({
          orderBy: { name: 'asc' },
          include: {
            _count: {
              select: { products: true },
            },
          },
        })
      },
      300 // 5 minute cache
    )

    return NextResponse.json({ categories })
  } catch (error) {
    console.error('Categories API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}
