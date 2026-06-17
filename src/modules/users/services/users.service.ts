import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../auth/entities/user.entity';
import { Role } from '../../auth/entities/role.entity';
import { ValidRoles } from '../../auth/interfaces/valid-roles.interface';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  private async getDefaultRole(): Promise<Role> {
    let role = await this.roleRepository.findOneBy({ name: ValidRoles.user });
    if (role) return role;

    role = this.roleRepository.create({ name: ValidRoles.user, description: 'Usuario' });
    return this.roleRepository.save(role);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, roleId, ...userData } = createUserDto;

    const foundRole = roleId
      ? await this.roleRepository.findOneBy({ id: roleId })
      : await this.getDefaultRole();

    if (!foundRole)
      throw new NotFoundException(`El rol ${roleId ? `con id ${roleId}` : 'por defecto "User"'} no existe.`);

    const user = this.userRepository.create({
      ...userData,
      password_hash: bcrypt.hashSync(password, 10),
      role: foundRole,
    });

    return await this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado.`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    const { password, roleId, ...userData } = updateUserDto;

    if (password) {
      (userData as any).password_hash = bcrypt.hashSync(password, 10);
    }

    if (roleId) {
      const role = await this.roleRepository.findOneBy({ id: roleId });
      if (role) user.role = role;
    }

    Object.assign(user, userData);
    return await this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }
}