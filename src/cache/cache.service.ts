import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';

// lib
import { Cache } from 'cache-manager';

@Injectable()
export class BuiltInCacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async setCache({ key, value, ttl = -1 }): Promise<void> {
    return this.cacheManager.set(key, value, ttl);
  }

  async getCache(key): Promise<string> {
    return await this.cacheManager.get(key);
  }

  async delCache(key): Promise<void> {
    return this.cacheManager.del(key);
  }

  async flushCache(): Promise<void> {
    return this.cacheManager.reset();
  }
}
