import { Module } from '@nestjs/common';
import { BuiltInCacheService } from './cache.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register()],
  providers: [BuiltInCacheService],
  exports: [BuiltInCacheService],
})
export class BuiltInCacheModule {}
