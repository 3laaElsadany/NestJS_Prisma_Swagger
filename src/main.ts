import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  
  // http://localhost:3000/api
  const config = new DocumentBuilder()
    .setTitle('NestJS With Prisma API')
    .setDescription(`Product & Category Management System API
    A RESTful API built with NestJS, Prisma, and Swagger for managing 
    products and categories with full CRUD operations, validation, 
    and relational data handling.`)
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
