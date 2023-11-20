import { MiddlewareConsumer, Module, NestModule, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbConfigModule } from './database/config.module';
import { UserModule } from './user/user.module';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { AllExceptionFilter } from './catch/error.handler';
import { AuthModule } from './auth/auth.module';
import { HealthController } from './health/health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { LoggerMiddleware } from './logger/logger.middleware';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DbConfigModule,
    TerminusModule,
    AuthModule,
    UserModule,
  ],
  controllers: [HealthController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(HealthController, UserController);
  }
}
