import { logDebug } from './logger.js';

interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class Cache {
  private cache: Map<string, CacheItem<any>> = new Map();
  private readonly defaultTTL = 5 * 60 * 1000; // 5 minutes

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }

    const now = Date.now();
    if (now > item.timestamp + item.ttl) {
      this.cache.delete(key);
      logDebug(`Cache expired for key: ${key}`);
      return null;
    }

    logDebug(`Cache hit for key: ${key}`);
    return item.data as T;
  }

  set<T>(key: string, data: T, ttl?: number): void {
    const item: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL
    };

    this.cache.set(key, item);
    logDebug(`Cache set for key: ${key}, TTL: ${item.ttl}ms`);
  }

  clear(): void {
    this.cache.clear();
    logDebug('Cache cleared');
  }

  delete(key: string): boolean {
    const deleted = this.cache.delete(key);
    if (deleted) {
      logDebug(`Cache deleted for key: ${key}`);
    }
    return deleted;
  }

  size(): number {
    return this.cache.size;
  }
}

export const cache = new Cache();