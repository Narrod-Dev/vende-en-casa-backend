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
      console.error(error); // Cambiado a console.error para mejores prácticas de logs
      throw new InternalServerErrorException('Error al crear el mensaje');
    }
  }

  async findAll(): Promise<Message[]> {
    return await this.messageRepository.find();
  }

  async findOne(id: number): Promise<Message> {
    // Quitamos 'relations' explícito ya que se maneja por el 'eager: true' de la entidad
    const message = await this.messageRepository.findOne({
      where: { id },
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
    
    // Desestructuramos para ignorar los IDs y solo permitir editar content e is_read
    const { conversation_id, sender_id, ...dataToUpdate } = updateMessageDto;
    
    Object.assign(message, dataToUpdate);
    return await this.messageRepository.save(message);
  }

  async remove(id: number): Promise<void> {
    const message = await this.findOne(id);
    await this.messageRepository.remove(message);
  }
}
