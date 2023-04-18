import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { CfgService } from './module/configuration/cfg.service';
import swaggerCreate from './utils/swagger';

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);

  swaggerCreate(app);
  app.enableCors();

  const cfg = app.get(CfgService);
  const PORT = cfg.APP_PORT;
  await app.listen(PORT);

  console.log(`Server listen port: ${PORT}`);
}
bootstrap();
