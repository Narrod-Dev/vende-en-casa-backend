import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rating } from '../entities/rating.entity';
import { CreateRatingDto, UpdateRatingDto } from '../dto/rating.dto';
import { Repository } from 'typeorm';
// Importación de la entidad Conversation para validar interacciones previas
import { Conversation } from '../../conversations/entities/conversation.entity';


@Injectable()
export class RatingsService {
        constructor(
        @InjectRepository(Rating)
        private readonly ratingRepository: Repository<Rating>,

        // Repositorio necesario para consultar la existencia de conversaciones
        @InjectRepository(Conversation)
        private readonly conversationRepository: Repository<Conversation>,

    ) {}

    async create(createRatingDto: CreateRatingDto): Promise<Rating> {
        const { reviewer_id, reviewee_id, product_id } = createRatingDto;

        // Restricción de Auto-reseña: Bloquea que un usuario se califique a sí mismo
        if (reviewer_id === reviewee_id) {
            throw new BadRequestException('Operación no permitida: No puedes calificarte a ti mismo.');
        }

        // Evitar Duplicidad de Reseña: Verifica si el usuario ya calificó este producto específico
        const resenaExistente = await this.ratingRepository.findOne({
            where: { reviewer_id: reviewer_id, product_id: product_id }
        });
        
        if (resenaExistente) {
            throw new BadRequestException('Ya has dejado una calificación para este producto.');
        }

        // Validación de Interacción: Verifica que exista una conversación previa entre el comprador y el vendedor para este producto
        const interaccionPrevia = await this.conversationRepository.findOne({
            where: [
                { product_id: product_id, buyer_id: reviewer_id, seller_id: reviewee_id },
                { product_id: product_id, buyer_id: reviewee_id, seller_id: reviewer_id }
            ]
        });

        if (!interaccionPrevia) {
            throw new BadRequestException('Debes interactuar por mensaje con el otro usuario antes de poder calificar.');
        }

        const rating = this.ratingRepository.create(createRatingDto);
        return await this.ratingRepository.save(rating);
    }

    async findAll(): Promise<Rating[]> {
        return await this.ratingRepository.find();
    }

    async findOne(id: number): Promise<Rating> {
        const rating = await this.ratingRepository.findOneBy({ id });

        if (!rating) {
            throw new NotFoundException(`Rating con id ${id} no encontrado.`);
        }

        return rating;
    }

    async update(id: number, updateRatingDto: UpdateRatingDto): Promise<Rating> {
        const rating = await this.findOne(id);
        Object.assign(rating, updateRatingDto);
        return await this.ratingRepository.save(rating);
    }

    async remove(id: number): Promise<void> {
        const rating = await this.findOne(id);
        await this.ratingRepository.remove(rating);
    }
}
