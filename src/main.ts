import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  OpenAPIObject,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { CfgService } from './module/configuration/cfg.service';

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);

  const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle("Book Catalog API")
    .setDescription("")
    .addBearerAuth()
    .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/docs", app, document);

  app.enableCors();

  const cfg = app.get(CfgService);
  const PORT = cfg.APP_PORT;
  await app.listen(PORT);

  console.log(`Server listen port: ${PORT}`);
}
bootstrap();
