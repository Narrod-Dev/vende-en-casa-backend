import { Controller, Post, Body, Get, Param, ParseIntPipe, Patch, Req } from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { Auth } from '../decorators/auth.decorator';
import { ValidRoles } from '../interfaces/valid-roles.interface';
import { AuthPermission } from '../decorators/auth-permission.decorator';
import { User } from '../entities/user.entity';
import { Public } from '../../../common/decorators/public.decorator';

@Controller('auth')
export class AuthController{
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Public()
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('profile')
  getProfile(@Req() req: Request) {
    const user = req.user as User;
    return this.authService.getProfile(user.id);
  }

  @Patch('block/:id')
  @Auth(ValidRoles.admin)
  toggleBlock(@Param('id', ParseIntPipe) id: number) {
    return this.authService.toggleBlock(id);
  }

  @Get('vehicles/create-test')
  @AuthPermission('create-vehicle')
  testingPrivateRoute() {
    return {
      ok: true,
      message: 'Si puedes ver esto es porque eres Administrador y estás autenticado correctamente.',
    };
  }
}