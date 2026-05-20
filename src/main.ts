import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  )

  const config = new DocumentBuilder()
  .setTitle('API de VendeEnCasa')
  .setDescription('API para la venta de objetos de segunda mano en VendeEnCasa')
  .setVersion('1.0')
  .build();

  const documnt = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documnt);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
