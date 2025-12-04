import { Redis } from '@upstash/redis'

// Create Redis client only if environment variables are available
const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null

// Default TTL of 5 minutes (300 seconds) as per AGENTS.md spec
const DEFAULT_TTL = 300

export type CacheKey = 
  | 'products:all'
  | 'products:flash-sale'
  | 'categories:all'
  | `product:${string}`
  | `category:${string}`

/**
 * Get cached data from Redis
 */
export async function getCache<T>(key: CacheKey): Promise<T | null> {
  if (!redis) return null
  
  try {
    const data = await redis.get<T>(key)
    return data
  } catch (error) {
    console.error(`Redis GET error for key ${key}:`, error)
    return null
  }
}

/**
 * Set data in Redis cache with TTL
 */
export async function setCache<T>(
  key: CacheKey,
  data: T,
  ttl: number = DEFAULT_TTL
): Promise<void> {
  if (!redis) return
  
  try {
    await redis.set(key, data, { ex: ttl })
  } catch (error) {
    console.error(`Redis SET error for key ${key}:`, error)
  }
}

/**
 * Delete cached data from Redis
 */
export async function deleteCache(key: CacheKey): Promise<void> {
  if (!redis) return
  
  try {
    await redis.del(key)
  } catch (error) {
    console.error(`Redis DEL error for key ${key}:`, error)
  }
}

/**
 * Delete multiple cache keys by pattern
 */
export async function deleteCachePattern(pattern: string): Promise<void> {
  if (!redis) return
  
  try {
    const keys = await redis.keys(pattern)
    if (keys.length > 0) {
      await redis.del(...keys)
    }
  } catch (error) {
    console.error(`Redis DEL pattern error for ${pattern}:`, error)
  }
}

/**
 * Get or set cache with callback
 */
export async function getOrSetCache<T>(
  key: CacheKey,
  callback: () => Promise<T>,
  ttl: number = DEFAULT_TTL
): Promise<T> {
  // Try to get from cache first
  const cached = await getCache<T>(key)
  if (cached !== null) {
    return cached
  }
  
  // If not in cache, execute callback and cache result
  const data = await callback()
  await setCache(key, data, ttl)
  return data
}

export { redis }
