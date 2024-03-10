import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MediaModule } from './media/media.module';
import { PermissionsModule } from './permissions/permissions.module';
import config from './config/config';
import { User } from './users/entities/user.entity';
import { Media } from './media/entities/media.entity';
import { Permission } from './permissions/entities/permission.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    DatabaseModule.forRoot([User, Media, Permission]),
    AuthModule,
    UsersModule,
    MediaModule,
    PermissionsModule,
  ],
})
export class AppModule {}
