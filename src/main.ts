import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config/dist/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/');

  const configService = app.get(ConfigService);
  const port = configService.get<number>('server.port');
  const domain = configService.get<number>('server.domain');

  await app.listen(port);
  console.log(`🚀 Server running on http:${domain}:${port}`);
}
bootstrap();
