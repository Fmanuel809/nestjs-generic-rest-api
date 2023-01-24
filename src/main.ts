import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors();
  
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const config = new DocumentBuilder()
    .setTitle(configService.get('API_TITLE'))
    .setDescription(configService.get('API_DESCRIPTION'))
    .setVersion(configService.get('API_VERSION'))
    .addServer(configService.get('API_SERVER_URL'))
    .build();
  const document = SwaggerModule.createDocument(app, config, options);

  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
