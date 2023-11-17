import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// core

export class BaseAPIDocumentation {
  public builder;

  constructor() {
    this.builder = new DocumentBuilder();
  }

  initializeOptions() {
    return this.builder
      .setTitle('NEST APIS')
      .setVersion(process.env.npm_package_version)
      .setDescription('NEST APIS')
      .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter JWT token',
        in: 'header',
      })
      .build();
  }

  setup(app) {
    const documentOptions = this.initializeOptions();
    const document = SwaggerModule.createDocument(app, documentOptions);

    SwaggerModule.setup('api/v1/docs', app, document, {
      swaggerOptions: { defaultModelsExpandDepth: -1 },
    });
  }
}
