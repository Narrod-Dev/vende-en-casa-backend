import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PermissionProtected } from './permission-protected.decorator';
import { UserPermissionGuard } from '../guards/user-permission.guard';

export function AuthPermission(...permissions: string[]) {
  return applyDecorators(
    PermissionProtected(...permissions),
    UseGuards(AuthGuard('jwt'), UserPermissionGuard),
  );
}