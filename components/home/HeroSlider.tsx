'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Slide {
  id: string
  title: string
  subtitle: string
  image: string
  href: string
  buttonText: string
}

// Static banner data - in production, this would come from CMS
const slides: Slide[] = [
  {
    id: '1',
    title: 'Summer Collection',
    subtitle: 'Up to 50% off on sun hats',
    image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=1200&h=400&fit=crop',
    href: '/categories/sun-hats',
    buttonText: 'Shop Now',
  },
  {
    id: '2',
    title: 'New Arrivals',
    subtitle: 'Check out our latest styles',
    image: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=1200&h=400&fit=crop',
    href: '/categories/caps',
    buttonText: 'Explore',
  },
  {
    id: '3',
    title: 'Winter Warmth',
    subtitle: 'Cozy beanies for cold days',
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=1200&h=400&fit=crop',
    href: '/categories/beanies',
    buttonText: 'Stay Warm',
  },
]

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  // Resume auto-play after 10 seconds of inactivity
  useEffect(() => {
    if (isAutoPlaying) return

    const timeout = setTimeout(() => setIsAutoPlaying(true), 10000)
    return () => clearTimeout(timeout)
  }, [isAutoPlaying])

  return (
    <div className="relative overflow-hidden rounded-xl bg-secondary-100">
      {/* Slides Container */}
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="relative w-full flex-shrink-0">
            <Link href={slide.href} className="block">
              <div className="relative h-40 md:h-64 lg:h-80">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={slide.id === '1'}
                  className="object-cover"
                  sizes="100vw"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12">
                  <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                    {slide.title}
                  </h2>
                  <p className="text-sm md:text-base text-white/90 mb-4 max-w-md">
                    {slide.subtitle}
                  </p>
                  <span className="inline-flex w-fit px-4 py-2 bg-white text-secondary-900 text-sm font-medium rounded-lg hover:bg-primary-600 hover:text-white transition-colors">
                    {slide.buttonText}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => {
          prevSlide()
          setIsAutoPlaying(false)
        }}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 text-secondary-700" />
      </button>
      <button
        onClick={() => {
          nextSlide()
          setIsAutoPlaying(false)
        }}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 text-secondary-700" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              'w-2 h-2 rounded-full transition-all',
              index === currentSlide
                ? 'w-6 bg-white'
                : 'bg-white/50 hover:bg-white/75'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
