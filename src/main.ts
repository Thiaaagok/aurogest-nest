import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TypeOrmExceptionFilter } from './TypeOrmExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new TypeOrmExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({
    /*     whitelist: true,
        forbidNonWhitelisted: true */
  }));
  app.enableCors({
    origin: [
      'http://localhost:4200'],
    credentials: true
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
