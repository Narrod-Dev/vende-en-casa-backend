import { applyDecorators } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { RoleProtected } from '../decorators/role-protected.decorator';
import { UserRoleGuard } from '../guards/user-role.guard';
import {  ValidRoles } from '../interfaces/valid-roles.interface';
import { AuthGuard } from '@nestjs/passport';

export function Auth(...roles: ValidRoles[]){
    return applyDecorators(
        RoleProtected(...roles),
        UseGuards(AuthGuard('jwt'), UserRoleGuard),
    );
}
