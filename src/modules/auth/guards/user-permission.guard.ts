import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from '../entities/user.entity';
import { META_PERMISSIONS } from '../decorators/permission-protected.decorator';

@Injectable()
export class UserPermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredPermissions: string[] = this.reflector.get(META_PERMISSIONS, context.getHandler());

    if (!requiredPermissions || requiredPermissions.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user as User;

    if (!user) throw new BadRequestException('Usuario no encontrado en la petición (Revisa los Guards).');

    const userPermissions = user.role?.permissions?.map((p) => p.name) ?? [];

    const hasPermission = requiredPermissions.some((perm) => userPermissions.includes(perm));
    if (hasPermission) return true;

    throw new ForbiddenException(
      `El usuario ${user.first_name} no tiene los permisos requeridos: [${requiredPermissions}]`,
    );
  }
}