import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rating } from '../entities/rating.entity';
import { CreateRatingDto, UpdateRatingDto } from '../dto/rating.dto';
import { Repository } from 'typeorm';
import { Conversation } from '../../conversations/entities/conversation.entity';

@Injectable()
export class RatingsService {
        constructor(
        @InjectRepository(Rating)
        private readonly ratingRepository: Repository<Rating>,
    

    // Repositorio para consultar la existencia de conversaciones
    @InjectRepository(Conversation)
    private readonly conversationRepository: 
    Repository<Conversation>,
    ) {}

    async create(createRatingDto: CreateRatingDto): 
    Promise<Rating> {
        const { reviewer_id, reviewee_id, product_id }
        = createRatingDto;

        // Restriccion de Auto-reseña: 
        // Bloquea que un usuario se califique asi mismo
        if (reviewer_id === reviewee_id) {
            throw new 
            BadRequestException('Operacion no permitida: No puedes calificarte a ti mismo.');
        }

        // Evitar Duplicidad de Reseña: Verifica si el usuario ya
        // califico este producto especifico
        const resenaExistente = await 
        this.ratingRepository.findOne({ where:{ reviewer_id: reviewer_id}
        });

        if (resenaExistente) {
            throw new BadRequestException('Ya has dejado una calificacion para este producto');
        }

        // Validacion de interaccion: 
        // Verifica que exista una conversacion entre el comprador
        //  y el vendedor para el producto
        const interaccionPrevia = await
        this.conversationRepository.findOne({
            where: [
                { product_id: product_id, buyer_id:
                    reviewer_id, seller_id: reviewee_id },
                { product_id: product_id, buyer_id:
                    reviewee_id, seller_id: reviewer_id }
            ]
        });

        if (!interaccionPrevia) {
            throw new BadRequestException('Debes interactuar por mensaje con el otro usuario antes de poder calificar.');
        }


        const rating = this.ratingRepository.create(createRatingDto);
        return await this.ratingRepository.save(rating);
    }

    // ENDPOINT de reputacion: Calcula el promedio (AVG) del score de
    // un usuario para su calificacion general
    async getUserReputation(userId: number): 
    Promise<{ averageScore: number }> {
        const result = await this.ratingRepository
            .createQueryBuilder('rating')
            .select('AVG(rating.score)', 'promedio')
            .where('rating.reviewee_id = :userId', { userId })
            .getRawOne();
 
    // Convierte el promedio a numero y lo redondea
    // a un decimal 
    const avg = result.promedio ? parseFloat(result.promedio) : 0;
    return { averageScore: Math.round(avg * 10) / 10 };
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

    async update(id: number, updateRatingDto: 
        UpdateRatingDto): Promise<Rating> {
        const rating = await this.findOne(id);
        Object.assign(rating, updateRatingDto);
        return await this.ratingRepository.save(rating);
    }

    async remove(id: number): Promise<void> {
        const rating = await this.findOne(id);
        await this.ratingRepository.remove(rating);
    }
}
