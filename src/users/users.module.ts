import { Global, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../database/database.module';
import { UserProvider } from './providers/user.provider';

@Global()
@Module({
  controllers: [UsersController],
  imports: [DatabaseModule],
  providers: [UserProvider, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
