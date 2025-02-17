import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.enableCors({
    origin: 'http://localhost:4200',
    methods: '*',
    allowedHeaders: '*',
    credentials: true,
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('server.port');
  const domain = configService.get<number>('server.domain');

  await app.listen(port);
  console.log(`🚀 Server running on http:${domain}:${port}`);
}
bootstrap();
