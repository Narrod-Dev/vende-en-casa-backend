import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
      // para verificar que no exista otro usuario con el mismo correo
  const existingUser = await this.userRepository.findOne({
    where: { email: createUserDto.email },
  });

  if (existingUser) {
    throw new BadRequestException(
      'El correo ya esta registrado.',
    );
  }
// La contraseña debe llegar cifrada desde AuthModule
    const user = this.userRepository.create({
      ...createUserDto,

      role: 'USER',
// se asegura que el usuario este activo al registrarse
      is_active: true,
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
//permite buscar usuario por correo electronico  
async findByEmail(email: string): Promise<User | null> {
  return await this.userRepository.findOne({
    where: { email },
  });
}
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
// Evita que el rol y la contraseña se modifiquen desde UsersModule
// Estos cambios deben gestionarse mediante AuthModule
    delete updateUserDto.role;
    delete updateUserDto.password_hash;
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }
}
