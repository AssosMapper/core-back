import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [UsersModule],
})
export class RolesModule {}
