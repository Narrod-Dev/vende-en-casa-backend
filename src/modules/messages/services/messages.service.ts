import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '../entities/message.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto, UpdateMessageDto } from '../dto/message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    try {
      const message = this.messageRepository.create(createMessageDto);
      await this.messageRepository.save(message);

      return message;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al crear el mensaje');
    }
  }

  async findAll(): Promise<Message[]> {
    return await this.messageRepository.find({});
  }

  async findOne(id: number): Promise<Message> {
    const message = await this.messageRepository.findOne({
      where: { id },
      relations: ['conversation', 'sender'],
    });
    if (!message) {
      throw new NotFoundException(`Mensaje con id ${id} no encontrado`);
    }
    return message;
  }

  async update(
    id: number,
    updateMessageDto: UpdateMessageDto
  ): Promise<Message> {
    const message = await this.findOne(id);
    Object.assign(message, updateMessageDto);
    return await this.messageRepository.save(message);
  }

  async remove(id: number): Promise<void> {
    const message = await this.findOne(id);
    await this.messageRepository.remove(message);
  }
}
