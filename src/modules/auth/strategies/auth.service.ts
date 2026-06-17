import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from '../dto/create-user.dto';
import { CreateRoleDto } from '../dto/create-role.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';
import { Permission } from '../entities/permission.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { ValidRoles } from '../interfaces/valid-roles.interface';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
    private readonly jwtService: JwtService,
  ) {}

  async onModuleInit() {
    const roleCount = await this.roleRepository.count();
    if (roleCount === 0) {
      let permission = await this.permissionRepository.findOneBy({ name: 'create-vehicle' });
      if (!permission) {
        permission = this.permissionRepository.create({ name: 'create-vehicle', module: 'products' });
        await this.permissionRepository.save(permission);
      }

      const adminRole = this.roleRepository.create({ name: ValidRoles.admin, description: 'Administrador' });
      const userRole = this.roleRepository.create({ name: ValidRoles.user, description: 'Usuario' });
      await this.roleRepository.save([adminRole, userRole]);

      adminRole.permissions = [permission];
      await this.roleRepository.save(adminRole);
    }

    const adminRole = await this.roleRepository.findOneBy({ name: ValidRoles.admin });
    if (adminRole) {
      const adminCount = await this.userRepository.count({ where: { role: { id: adminRole.id } } });
      if (adminCount === 0) {
        const adminUser = this.userRepository.create({
          first_name: 'Admin',
          last_name: 'Admin',
          email: 'admin@admin.com',
          password_hash: bcrypt.hashSync('Admin123', 10),
          role: adminRole,
        });
        await this.userRepository.save(adminUser);
      }
    }
  }

  private async getDefaultRole(): Promise<Role> {
    let role = await this.roleRepository.findOneBy({ name: ValidRoles.user });
    if (role) return role;

    role = this.roleRepository.create({ name: ValidRoles.user, description: 'Usuario' });
    return this.roleRepository.save(role);
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const role = await this.getDefaultRole();

      const user = this.userRepository.create({
        ...userData,
        password_hash: bcrypt.hashSync(password, 10),
        role,
      });

      await this.userRepository.save(user);

      const { password_hash, ...userWithoutPassword } = user;

      return {
        ...userWithoutPassword,
        token: this.getJwtToken({ id: user.id }),
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userRepository.findOneBy({ email });
    if (!user)
      throw new UnauthorizedException('Credenciales incorrectas (Email).');

    if (!bcrypt.compareSync(password, user.password_hash)) {
      throw new UnauthorizedException('Credenciales incorrectas (Password).');
    }

    if (user.is_blocked) throw new UnauthorizedException('Usuario bloqueado.');

    const { password_hash, ...userWithoutPassword } = user;

    return {
      ...userWithoutPassword,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  async getProfile(id: number) {
    const user = await this.userRepository.findOne({ where: { id }, relations: ['role'] });
    if (!user) throw new NotFoundException('Usuario no encontrado.');
    const { password_hash, ...profile } = user;
    return profile;
  }

  async toggleBlock(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('Usuario no encontrado.');

    user.is_blocked = !user.is_blocked;
    await this.userRepository.save(user);

    return {
      id: user.id,
      is_blocked: user.is_blocked,
      message: user.is_blocked ? 'Usuario bloqueado.' : 'Usuario desbloqueado.',
    };
  }

  async createRole(dto: CreateRoleDto) {
    const permissions = dto.permissionIds?.length
      ? await this.permissionRepository.findByIds(dto.permissionIds)
      : [];

    const role = this.roleRepository.create({
      name: dto.name,
      description: dto.description,
      permissions,
    });

    return this.roleRepository.save(role);
  }

  async findAllRoles() {
    return this.roleRepository.find({ relations: ['permissions'] });
  }

  async findOneRole(id: number) {
    const role = await this.roleRepository.findOne({ where: { id }, relations: ['permissions'] });
    if (!role) throw new NotFoundException(`Rol con id ${id} no encontrado.`);
    return role;
  }

  async updateRole(id: number, dto: CreateRoleDto) {
    const role = await this.findOneRole(id);

    const permissions = dto.permissionIds?.length
      ? await this.permissionRepository.findByIds(dto.permissionIds)
      : [];

    role.name = dto.name;
    if (dto.description !== undefined) role.description = dto.description;
    role.permissions = permissions;

    return this.roleRepository.save(role);
  }

  async removeRole(id: number) {
    const role = await this.findOneRole(id);
    return this.roleRepository.remove(role);
  }

  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  private handleDBErrors(error: any): never {
    if (error.status === 404) throw new NotFoundException(error.message);
    if (error.code === '23505')
      throw new BadRequestException('El correo ya existe.');
    console.log(error);
    throw new InternalServerErrorException(
      'Error del servidor, revisa los logs.',
    );
  }
}