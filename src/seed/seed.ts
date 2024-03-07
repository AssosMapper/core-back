// src/seed/seed.ts
import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { UserSeedService } from './seeders/user-seed.service';
import { PermissionsService } from '../permissions/permissions.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeedModule);
  await app.get(UserSeedService).seed();
  await app.get(PermissionsService).seed();
  await app.close();
  process.exit(0);
}

bootstrap();
