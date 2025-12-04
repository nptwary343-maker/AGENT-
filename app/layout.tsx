import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Asthar Hat - Premium Hats & Caps',
    template: '%s | Asthar Hat',
  },
  description: 'Discover premium hats, caps, beanies, and more at Asthar Hat. Fast delivery and exceptional quality.',
  keywords: ['hats', 'caps', 'beanies', 'fedoras', 'fashion', 'accessories'],
  authors: [{ name: 'Asthar Hat' }],
  creator: 'Asthar Hat',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://asthar-hat.vercel.app',
    siteName: 'Asthar Hat',
    title: 'Asthar Hat - Premium Hats & Caps',
    description: 'Discover premium hats, caps, beanies, and more at Asthar Hat.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Asthar Hat - Premium Hats & Caps',
    description: 'Discover premium hats, caps, beanies, and more at Asthar Hat.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#dc2626',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white font-sans">
        {children}
      </body>
    </html>
  )
}
