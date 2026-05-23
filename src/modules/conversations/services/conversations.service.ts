import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from '../entities/conversation.entity';
import {
  CreateConversationDto,
  UpdateConversationDto,
} from '../dto/conversation.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
  ) {}

  async create(createConversationDto: CreateConversationDto) {
    try {
      const conversation = this.conversationRepository.create(
        createConversationDto,
      );
      await this.conversationRepository.save(conversation);
      return conversation;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al crear la conversacion');
    }
  }
  7;
  async findAll(): Promise<Conversation[]> {
    return await this.conversationRepository.find();
  }

  async findOne(id: number): Promise<Conversation> {
    const conversation = await this.conversationRepository.findOne({
      where: { id },
      relations: ['product', 'buyer', 'seller'],
    });
    if (!conversation) {
      throw new NotFoundException(`Conversacion con id ${id} no encontrada`);
    }
    return conversation;
  }

  async update(
    id: number,
    updateConversationDto: UpdateConversationDto,
  ): Promise<Conversation> {
    const conversation = await this.findOne(id);
    Object.assign(conversation, updateConversationDto);
    return await this.conversationRepository.save(conversation);
  }

  async remove(id: number): Promise<void> {
    const conversation = await this.findOne(id);
    await this.conversationRepository.remove(conversation);
  }
}
