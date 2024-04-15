import { SetMetadata } from '@nestjs/common';

export function SetPermissions(permissions: string[]) {
  return SetMetadata('permissions', permissions);
}
