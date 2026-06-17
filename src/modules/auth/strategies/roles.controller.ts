import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateRoleDto } from '../dto/create-role.dto';
import { Auth } from '../decorators/auth.decorator';
import { ValidRoles } from '../interfaces/valid-roles.interface';
import { AuthPermission } from '../decorators/auth-permission.decorator';

@Controller('roles')
export class RolesController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @Auth(ValidRoles.admin)
  create(@Body() dto: CreateRoleDto) {
    return this.authService.createRole(dto);
  }

  @Get()
  @Auth(ValidRoles.admin)
  findAll() {
    return this.authService.findAllRoles();
  }

  @Get(':id')
  @Auth(ValidRoles.admin)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.authService.findOneRole(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateRoleDto) {
    return this.authService.updateRole(id, dto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.authService.removeRole(id);
  }
}
