import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseProvider } from 'src/database/config.provider';
import { DB_CONNECTION_KEY } from 'src/database/consts';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { BuiltInCacheModule } from 'src/cache/cache.module';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    BuiltInCacheModule,
    MongooseModule.forFeatureAsync(databaseProvider, DB_CONNECTION_KEY),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
