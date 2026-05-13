import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) 
        private usersRepository: Repository<User>,
    ){}

    async create(userDto: UserDto) {
        try {
            const user = this.usersRepository.create(userDto);
            await this.usersRepository.save(user);
            return user;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException
            ('Error al crear el usuario');
        }
    }
    async findAll() {
        return this.usersRepository.find({});
    }

}
