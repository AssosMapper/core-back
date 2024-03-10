import { Module } from '@nestjs/common';
import { UserSeedService } from './seeders/user-seed.service';
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '@nestjs/config';
import config from '../config/config';
import { DatabaseModule } from '../database/database.module';
import { PermissionsModule } from '../permissions/permissions.module';
import { PermissionSeedService } from './seeders/permission-seed.service';
import { User } from '../users/entities/user.entity';
import { Permission } from '../permissions/entities/permission.entity';

@Module({
  providers: [UserSeedService, PermissionSeedService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    DatabaseModule.forRoot([User, Permission]),
    UsersModule,
    PermissionsModule,
  ],
})
export class SeedModule {}
