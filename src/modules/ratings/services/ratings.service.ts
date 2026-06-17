import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rating } from '../entities/rating.entity';
import { CreateRatingDto, UpdateRatingDto } from '../dto/rating.dto';
import { Repository } from 'typeorm';
import { Conversation } from '../../conversations/entities/conversation.entity';
import { User } from '../../auth/entities/user.entity';
import { ValidRoles } from '../../auth/interfaces/valid-roles.interface';


@Injectable()
export class RatingsService {
        constructor(
        @InjectRepository(Rating)
        private readonly ratingRepository: Repository<Rating>,

        @InjectRepository(Conversation)
        private readonly conversationRepository: Repository<Conversation>,

    ) {}

    async create(dto: CreateRatingDto, userId: number): Promise<Rating> {
        const { reviewee_id, product_id } = dto;

        if (userId === reviewee_id) {
            throw new BadRequestException('No puedes calificarte a ti mismo.');
        }

        const resenaExistente = await this.ratingRepository.findOne({
            where: { reviewer_id: userId, product_id }
        });

        if (resenaExistente) {
            throw new BadRequestException('Ya has dejado una calificación para este producto.');
        }

        const interaccionPrevia = await this.conversationRepository.findOne({
            where: [
                { product_id, buyer_id: userId, seller_id: reviewee_id },
                { product_id, buyer_id: reviewee_id, seller_id: userId }
            ]
        });

        if (!interaccionPrevia) {
            throw new BadRequestException('Debes interactuar por mensaje con el otro usuario antes de calificar.');
        }

        const rating = this.ratingRepository.create({
            reviewer_id: userId,
            reviewee_id,
            product_id,
            score: dto.score,
            comment: dto.comment,
        });
        return await this.ratingRepository.save(rating);
    }

    // Calcular el promedio (AVG) para la reputación del usuario
    async getUserReputation(userId: number): Promise<{ averageScore: number }> {
        const result = await this.ratingRepository
            .createQueryBuilder('rating')
            .select('AVG(rating.score)', 'promedio')
            .where('rating.reviewee_id = :userId', { userId })
            .getRawOne();
        
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

    async update(id: number, updateRatingDto: UpdateRatingDto, user: User): Promise<Rating> {
        const rating = await this.findOne(id);

        if (rating.reviewer_id !== user.id && user.role.name.toLowerCase() !== ValidRoles.admin) {
            throw new ForbiddenException('No tienes permiso para editar esta calificación');
        }

        Object.assign(rating, updateRatingDto);
        return await this.ratingRepository.save(rating);
    }

    async remove(id: number, user: User): Promise<void> {
        const rating = await this.findOne(id);

        if (rating.reviewer_id !== user.id && user.role.name.toLowerCase() !== ValidRoles.admin) {
            throw new ForbiddenException('No tienes permiso para eliminar esta calificación');
        }

        await this.ratingRepository.remove(rating);
    }
}
