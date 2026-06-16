import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { User } from '../../users/entities/user.entity';
import {
  CreateConversationDto,
  UpdateConversationDto,
} from '../dto/conversation.dto';
import { Conversation } from '../entities/conversation.entity';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createConversationDto: CreateConversationDto) {
    try {
      const product = await this.productRepository.findOneBy({
        id: createConversationDto.product_id,
      });

      if (!product) {
        throw new NotFoundException('Producto no encontrado');
      }

      const buyer = await this.userRepository.findOneBy({
        id: createConversationDto.buyer_id,
      });

      if (!buyer) {
        throw new NotFoundException('Comprador no encontrado');
      }

      if (product.seller_id === createConversationDto.buyer_id) {
        throw new ForbiddenException(
          'El vendedor no puede crear una conversacion consigo mismo',
        );
      }

      // Cada chat se agrupa por producto y comprador; si ya existe, se reutiliza.
      const existingConversation = await this.conversationRepository.findOne({
        where: {
          product_id: createConversationDto.product_id,
          buyer_id: createConversationDto.buyer_id,
        },
      });

      if (existingConversation) {
        return existingConversation;
      }

      const conversation = this.conversationRepository.create({
        product_id: createConversationDto.product_id,
        buyer_id: createConversationDto.buyer_id,
        seller_id: product.seller_id,
      });

      return await this.conversationRepository.save(conversation);
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ForbiddenException
      ) {
        throw error;
      }

      console.error(error);
      throw new InternalServerErrorException('Error al crear la conversacion');
    }
  }

  async findAll(): Promise<Conversation[]> {
    return await this.conversationRepository.find();
  }

  async findByUser(userId: number): Promise<Conversation[]> {
    // La privacidad del chat exige mostrar solo conversaciones donde participa el usuario.
    await this.ensureUserExists(userId);

    return await this.conversationRepository.find({
      where: [{ buyer_id: userId }, { seller_id: userId }],
      order: { created_at: 'DESC' },
    });
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

  async findOneForUser(id: number, userId: number): Promise<Conversation> {
    const conversation = await this.findOne(id);
    this.ensureConversationParticipant(conversation, userId);
    return conversation;
  }

  async update(
    id: number,
    updateConversationDto: UpdateConversationDto,
    userId: number,
  ): Promise<Conversation> {
    const conversation = await this.findOneForUser(id, userId);
    Object.assign(conversation, updateConversationDto);
    return await this.conversationRepository.save(conversation);
  }

  async remove(id: number, userId: number): Promise<void> {
    const conversation = await this.findOneForUser(id, userId);
    await this.conversationRepository.remove(conversation);
  }

  private async ensureUserExists(userId: number): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException(`Usuario con id ${userId} no encontrado`);
    }
  }

  private ensureConversationParticipant(
    conversation: Conversation,
    userId: number,
  ): void {
    const isParticipant =
      conversation.buyer_id === userId || conversation.seller_id === userId;

    if (!isParticipant) {
      throw new ForbiddenException(
        'El usuario no pertenece a esta conversacion',
      );
    }
  }
}
