import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MediaModule } from './media/media.module';
import { PermissionsModule } from './permissions/permissions.module';
import { User } from './users/entities/user.entity';
import { Media } from './media/entities/media.entity';
import { Permission } from './permissions/entities/permission.entity';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { validationSchema } from './config/config';
import { MeModule } from './me/me.module';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/entities/role.entity';
import { AssociationModule } from './association/association.module';
import { Staff } from './association/entities/staff.entity';
import { Association } from './association/entities/association.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: validationSchema,
    }),
    DatabaseModule.forRoot([User, Media, Role, Permission, Association, Staff]),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule], // Assurez-vous que ConfigModule est importé
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('NODE_ENV') === 'prod'
          ? [
              {
                ttl: configService.get<number>('THROTTLE_TTL') ?? 6e4,
                limit: configService.get<number>('THROTTLE_LIMIT') ?? 10,
              },
            ]
          : [
              {
                ttl: 0,
                limit: 10,
              },
            ],
    }),
    AuthModule,
    UsersModule,
    MediaModule,
    PermissionsModule,
    MeModule,
    RolesModule,
    AssociationModule,
  ],

  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
