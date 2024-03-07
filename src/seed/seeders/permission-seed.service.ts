import { Injectable } from '@nestjs/common';
import { PermissionsService } from '../../permissions/permissions.service';

@Injectable()
export class PermissionSeedService {
  constructor(private readonly permissionService: PermissionsService) {}
  async seed() {
    await this.permissionService.seed();
  }
}
