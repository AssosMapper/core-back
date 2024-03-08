import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../users/users.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.get<string>(
      'permissions',
      context.getHandler(),
    );
    if (!requiredPermissions) {
      return true; // ou false, selon votre logique d'authentification
    }

    const request = context.switchToHttp().getRequest();
    const userId = request.user?.userId;
    const user = await this.userService.findOne(userId);
    if (!user) {
      return false;
    } else {
      let permissions = user.permissions.map((p) => p.permission);
      if (permissions.includes('*')) return true;
      for (const permission of requiredPermissions) {
        if (!permissions.includes(permission)) {
          return false;
        }
      }
    }
    return true;
  }
}
