import { Module } from '@nestjs/common';
import { UserSeedService } from './seeders/user-seed.service';
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '@nestjs/config';
import config from '../config/config';
import { DatabaseModule } from '../database/database.module';
import { PermissionsModule } from '../permissions/permissions.module';
import { PermissionSeedService } from './seeders/permission-seed.service';

@Module({
  providers: [UserSeedService, PermissionSeedService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    DatabaseModule,
    UsersModule,
    PermissionsModule,
  ],
})
export class SeedModule {}
