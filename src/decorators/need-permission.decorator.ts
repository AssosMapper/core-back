import { applyDecorators, UseGuards } from '@nestjs/common';
import { PermissionGuard } from '../guards/permission.guard';
import { SetPermissions } from './set-permissions.decorator';

export function NeedPermissions(...permissions: string[]) {
  return applyDecorators(
    SetPermissions(permissions),
    UseGuards(PermissionGuard),
  );
}
