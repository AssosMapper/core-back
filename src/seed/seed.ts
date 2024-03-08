// src/seed/seed.ts
import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { UserSeedService } from './seeders/user-seed.service';
import { PermissionSeedService } from './seeders/permission-seed.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeedModule);
  await app.get(PermissionSeedService).seed();
  await app.get(UserSeedService).seed();
  await app.close();
  process.exit(0);
}

bootstrap();
