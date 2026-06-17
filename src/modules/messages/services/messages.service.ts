import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from '../../conversations/entities/conversation.entity';
import { CreateMessageDto, UpdateMessageDto } from '../dto/message.dto';
import { Message } from '../entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
  ) {}

  async create(dto: CreateMessageDto, userId: number): Promise<Message> {
    try {
      await this.validateConversationParticipant(dto.conversation_id, userId);

      const message = this.messageRepository.create({
        conversation_id: dto.conversation_id,
        sender_id: userId,
        content: dto.content,
      });
      return await this.messageRepository.save(message);
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ForbiddenException
      ) {
        throw error;
      }

      console.error(error);
      throw new InternalServerErrorException('Error al crear el mensaje');
    }
  }

  async findAll(): Promise<Message[]> {
    return await this.messageRepository.find({
      order: { sent_at: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Message> {
    const message = await this.messageRepository.findOne({
      where: { id },
    });

    if (!message) {
      throw new NotFoundException(`Mensaje con id ${id} no encontrado`);
    }

    return message;
  }

  async findOneForUser(id: number, userId: number): Promise<Message> {
    const message = await this.findOne(id);
    await this.validateConversationParticipant(message.conversation_id, userId);
    return message;
  }

  async findByConversation(
    conversationId: number,
    userId: number,
  ): Promise<Message[]> {
    // Solo comprador o vendedor pueden consultar los mensajes de la conversacion.
    await this.validateConversationParticipant(conversationId, userId);

    return await this.messageRepository.find({
      where: { conversation_id: conversationId },
      order: { sent_at: 'ASC' },
    });
  }

  async update(
    id: number,
    updateMessageDto: UpdateMessageDto,
    userId: number,
  ): Promise<Message> {
    const message = await this.findOneForUser(id, userId);

    // El DTO de actualizacion solo permite contenido y estado de lectura.
    Object.assign(message, updateMessageDto);
    return await this.messageRepository.save(message);
  }

  async remove(id: number, userId: number): Promise<void> {
    const message = await this.findOneForUser(id, userId);
    await this.messageRepository.remove(message);
  }

  private async validateConversationParticipant(
    conversationId: number,
    userId: number,
  ): Promise<Conversation> {
    const conversation = await this.conversationRepository.findOne({
      where: { id: conversationId },
    });

    if (!conversation) {
      throw new NotFoundException(
        `Conversacion con id ${conversationId} no encontrada`,
      );
    }

    const isParticipant =
      conversation.buyer_id === userId || conversation.seller_id === userId;

    if (!isParticipant) {
      throw new ForbiddenException(
        'El usuario no pertenece a esta conversacion',
      );
    }

    return conversation;
  }
}
