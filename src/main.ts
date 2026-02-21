import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const frontendUrl = configService.get<string>('FRONTEND_URL');

  app.enableCors({
    origin: frontendUrl,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  // Habilitar el pipe de validación de forma global
  app.useGlobalPipes(
    new ValidationPipe({
<<<<<<< HEAD
      whitelist: true, // Elimina propiedades que no están en el DTO
      forbidNonWhitelisted: true, // Lanza error si hay propiedades extra
      transform: true, // <--- Habilita la transformación de class-transformer
=======
      whitelist: true,       // Elimina propiedades que no estén en el DTO
      transform: true,       // ¡CLAVE! Transforma los tipos automáticamente
      transformOptions: {
        enableImplicitConversion: true,
      },
>>>>>>> desarrollo
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
