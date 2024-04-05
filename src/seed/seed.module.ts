import { Module } from '@nestjs/common';
import { UserSeedService } from './seeders/user-seed.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module';
import { PermissionSeedService } from './seeders/permission-seed.service';
import { User } from '../users/entities/user.entity';
import { Permission } from '../permissions/entities/permission.entity';
import { validationSchema } from '../config/config';
import { DatabaseProvider } from '../database/databaseProvider';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [UserSeedService, PermissionSeedService, DatabaseProvider],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: validationSchema,
    }),
    DatabaseModule.forRoot([User, Permission]),
    UsersModule,
  ],
})
export class SeedModule {}
