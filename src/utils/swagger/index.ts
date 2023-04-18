import { INestApplication } from "@nestjs/common";
import {
  DocumentBuilder,
  OpenAPIObject,
  SwaggerModule,
} from "@nestjs/swagger";

const swaggerCreate = (app: INestApplication) => {
  const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle("Book Catalog API")
    .setDescription("")
    .addBearerAuth()
    .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/docs", app, document);
};

export default swaggerCreate;
