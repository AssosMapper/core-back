import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserProvider } from './providers/user.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [UsersController],
  imports: [DatabaseModule],
  providers: [UserProvider, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
