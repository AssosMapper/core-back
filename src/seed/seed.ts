// src/seed/seed.ts
import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { UserSeedService } from './seeders/user-seed.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeedModule);
  const userSeedService = app.get(UserSeedService);
  await userSeedService.seed();
  await app.close();
  process.exit(0);
}

bootstrap();
