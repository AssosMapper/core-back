import { Module } from '@nestjs/common';
import { AssociationService } from './association.service';
import { AssociationController } from './association.controller';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [AssociationController],
  providers: [AssociationService],
  imports: [UsersModule],
})
export class AssociationModule {}
