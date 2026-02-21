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
      whitelist: true,       // Elimina propiedades que no estén en el DTO
      transform: true,       // ¡CLAVE! Transforma los tipos automáticamente
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
