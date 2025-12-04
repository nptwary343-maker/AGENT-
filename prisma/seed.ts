import { PrismaClient, StockStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'caps' },
      update: {},
      create: {
        name: 'Caps',
        slug: 'caps',
        icon: 'cap',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'beanies' },
      update: {},
      create: {
        name: 'Beanies',
        slug: 'beanies',
        icon: 'beanie',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'fedoras' },
      update: {},
      create: {
        name: 'Fedoras',
        slug: 'fedoras',
        icon: 'fedora',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'sun-hats' },
      update: {},
      create: {
        name: 'Sun Hats',
        slug: 'sun-hats',
        icon: 'sun',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'bucket-hats' },
      update: {},
      create: {
        name: 'Bucket Hats',
        slug: 'bucket-hats',
        icon: 'bucket',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'winter-hats' },
      update: {},
      create: {
        name: 'Winter Hats',
        slug: 'winter-hats',
        icon: 'snowflake',
      },
    }),
  ])

  console.log(`Created ${categories.length} categories`)

  // Sample products for each category
  const products = [
    // Caps
    {
      title: 'Classic Baseball Cap',
      slug: 'classic-baseball-cap',
      description: 'A timeless baseball cap with adjustable strap',
      price: 29.99,
      discountPrice: 24.99,
      stockStatus: StockStatus.IN_STOCK,
      thumbnail: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop',
      images: ['https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800'],
      categoryId: categories[0].id,
      isFlashSale: true,
    },
    {
      title: 'Vintage Trucker Cap',
      slug: 'vintage-trucker-cap',
      description: 'Retro mesh-back trucker cap',
      price: 34.99,
      discountPrice: null,
      stockStatus: StockStatus.IN_STOCK,
      thumbnail: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400&h=400&fit=crop',
      images: ['https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800'],
      categoryId: categories[0].id,
      isFlashSale: false,
    },
    {
      title: 'Premium Snapback',
      slug: 'premium-snapback',
      description: 'High-quality snapback with flat brim',
      price: 39.99,
      discountPrice: 32.99,
      stockStatus: StockStatus.IN_STOCK,
      thumbnail: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=400&h=400&fit=crop',
      images: ['https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=800'],
      categoryId: categories[0].id,
      isFlashSale: true,
    },
    // Beanies
    {
      title: 'Cozy Knit Beanie',
      slug: 'cozy-knit-beanie',
      description: 'Soft and warm knitted beanie for cold days',
      price: 24.99,
      discountPrice: 19.99,
      stockStatus: StockStatus.IN_STOCK,
      thumbnail: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=400&fit=crop',
      images: ['https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800'],
      categoryId: categories[1].id,
      isFlashSale: true,
    },
    {
      title: 'Slouchy Beanie',
      slug: 'slouchy-beanie',
      description: 'Relaxed fit slouchy beanie',
      price: 22.99,
      discountPrice: null,
      stockStatus: StockStatus.IN_STOCK,
      thumbnail: 'https://images.unsplash.com/photo-1510598969022-c4c6c5d05769?w=400&h=400&fit=crop',
      images: ['https://images.unsplash.com/photo-1510598969022-c4c6c5d05769?w=800'],
      categoryId: categories[1].id,
      isFlashSale: false,
    },
    // Fedoras
    {
      title: 'Classic Wool Fedora',
      slug: 'classic-wool-fedora',
      description: 'Elegant wool fedora with ribbon band',
      price: 59.99,
      discountPrice: 49.99,
      stockStatus: StockStatus.IN_STOCK,
      thumbnail: 'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?w=400&h=400&fit=crop',
      images: ['https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?w=800'],
      categoryId: categories[2].id,
      isFlashSale: true,
    },
    {
      title: 'Straw Fedora',
      slug: 'straw-fedora',
      description: 'Lightweight straw fedora for summer',
      price: 44.99,
      discountPrice: null,
      stockStatus: StockStatus.IN_STOCK,
      thumbnail: 'https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?w=400&h=400&fit=crop',
      images: ['https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?w=800'],
      categoryId: categories[2].id,
      isFlashSale: false,
    },
    // Sun Hats
    {
      title: 'Wide Brim Sun Hat',
      slug: 'wide-brim-sun-hat',
      description: 'UPF 50+ protection wide brim hat',
      price: 49.99,
      discountPrice: 39.99,
      stockStatus: StockStatus.IN_STOCK,
      thumbnail: 'https://images.unsplash.com/photo-1565839412428-526c7e7a9c65?w=400&h=400&fit=crop',
      images: ['https://images.unsplash.com/photo-1565839412428-526c7e7a9c65?w=800'],
      categoryId: categories[3].id,
      isFlashSale: true,
    },
    {
      title: 'Floppy Beach Hat',
      slug: 'floppy-beach-hat',
      description: 'Stylish floppy hat for beach days',
      price: 39.99,
      discountPrice: null,
      stockStatus: StockStatus.IN_STOCK,
      thumbnail: 'https://images.unsplash.com/photo-1529958030586-3aae4ca485ff?w=400&h=400&fit=crop',
      images: ['https://images.unsplash.com/photo-1529958030586-3aae4ca485ff?w=800'],
      categoryId: categories[3].id,
      isFlashSale: false,
    },
    // Bucket Hats
    {
      title: 'Canvas Bucket Hat',
      slug: 'canvas-bucket-hat',
      description: 'Durable canvas bucket hat',
      price: 32.99,
      discountPrice: 27.99,
      stockStatus: StockStatus.IN_STOCK,
      thumbnail: 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=400&h=400&fit=crop',
      images: ['https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=800'],
      categoryId: categories[4].id,
      isFlashSale: true,
    },
    {
      title: 'Reversible Bucket Hat',
      slug: 'reversible-bucket-hat',
      description: 'Two styles in one reversible bucket hat',
      price: 36.99,
      discountPrice: null,
      stockStatus: StockStatus.IN_STOCK,
      thumbnail: 'https://images.unsplash.com/photo-1622445275576-721325763afe?w=400&h=400&fit=crop',
      images: ['https://images.unsplash.com/photo-1622445275576-721325763afe?w=800'],
      categoryId: categories[4].id,
      isFlashSale: false,
    },
    // Winter Hats
    {
      title: 'Fur-Lined Trapper Hat',
      slug: 'fur-lined-trapper-hat',
      description: 'Extra warm trapper hat with faux fur',
      price: 54.99,
      discountPrice: 44.99,
      stockStatus: StockStatus.IN_STOCK,
      thumbnail: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400&h=400&fit=crop',
      images: ['https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800'],
      categoryId: categories[5].id,
      isFlashSale: true,
    },
    {
      title: 'Cable Knit Pom Beanie',
      slug: 'cable-knit-pom-beanie',
      description: 'Chunky cable knit beanie with pom pom',
      price: 29.99,
      discountPrice: null,
      stockStatus: StockStatus.OUT_OF_STOCK,
      thumbnail: 'https://images.unsplash.com/photo-1578681994506-b8f463449011?w=400&h=400&fit=crop',
      images: ['https://images.unsplash.com/photo-1578681994506-b8f463449011?w=800'],
      categoryId: categories[5].id,
      isFlashSale: false,
    },
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    })
  }

  console.log(`Created ${products.length} products`)
  console.log('Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
