import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionProvider } from './providers/permission.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [PermissionsService, PermissionProvider],
  exports: [PermissionsService],
})
export class PermissionsModule {}
