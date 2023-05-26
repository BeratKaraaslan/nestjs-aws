import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import configurations from './core/settings/configurations';
import { ValidationPipe } from '@nestjs/common';
import { ValidationFilter } from './core/validations/validations';
import { GlobalExceptionFilter } from './core/validations/general.exception';
import validation_config from './core/validations/validation_config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['error'],
  });
  app.enableCors({ origin: '*' });

  const configService = app.get(ConfigService);
  const config = configurations(configService);

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalFilters(new ValidationFilter());
  app.useGlobalPipes(new ValidationPipe(validation_config()));

  const swaggerConfig = new DocumentBuilder()
    .setTitle(config.open_api_title)
    .setVersion(config.open_api_version)
    .setExternalDoc('openapi.json', `/${config.swagger_path}-json`)
    .addSecurity('bearer', {
      type: 'http',
      scheme: 'bearer',
    })
    .build();

  const customOptions = {
    explorer: false,
    swaggerOptions: {
      validatorUrl: null,
      defaultModelsExpandDepth: -1,
    },
    customSiteTitle: config.open_api_title,
  };

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(
    config.swagger_path,
    app,
    document,
    customOptions,
  );

  await app.listen(config.port || 3000);
}

bootstrap();
