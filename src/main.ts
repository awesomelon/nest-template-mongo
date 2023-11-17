import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { BaseAPIDocumentation } from './base.document';
import { AllExceptionFilter } from './catch/error.handler';
import { ValidationPipe } from '@nestjs/common';

// lib
import helmet from '@fastify/helmet';
import whitelist from './whitelist';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: false,
    })
  );

  app.enableCors({
    origin: whitelist,
    credentials: true,
  });

  new BaseAPIDocumentation().setup(app);

  app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });

  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(process.env.API_PORT || 3000).then(() => {
    console.log(`🚀 Server ready at http://localhost:${process.env.API_PORT || 3000}`);
    console.log(`📒 Documents at http://localhost:${process.env.API_PORT || 3000}/api/v1/docs`);
  });
}
bootstrap();
