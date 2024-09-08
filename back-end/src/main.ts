import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    credentials: true,
     // If you need to send cookies or other credentials
  });

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(8000);
}
bootstrap();
