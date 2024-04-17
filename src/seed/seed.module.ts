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
import { Role } from '../roles/entities/role.entity';
import { RoleSeedService } from './seeders/role-seed.service';
import { AssociationSeedService } from './seeders/association-seed.service';
import { Association } from '../association/entities/association.entity';

@Module({
  providers: [
    UserSeedService,
    RoleSeedService,
    PermissionSeedService,
    AssociationSeedService,
    DatabaseProvider,
  ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: validationSchema,
    }),
    DatabaseModule.forRoot([User, Role, Permission, Association]),
    UsersModule,
  ],
})
export class SeedModule {}
