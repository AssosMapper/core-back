import { Module } from '@nestjs/common';
import { UserSeedService } from './seeders/user-seed.service';
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '@nestjs/config';
import config from '../config/config';
import { DatabaseModule } from '../database/database.module';

@Module({
  providers: [UserSeedService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    DatabaseModule,
    UsersModule,
  ],
})
export class SeedModule {}
