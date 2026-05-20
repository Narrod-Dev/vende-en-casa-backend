import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rating } from '../entities/rating.entity';
import { CreateRatingDto, UpdateRatingDto } from '../dto/rating.dto';
import { Repository } from 'typeorm';

@Injectable()
export class RatingsService {
        constructor(
        @InjectRepository(Rating)
        private readonly ratingRepository: Repository<Rating>,
    ) {}

    async create(createRatingDto: CreateRatingDto): Promise<Rating> {
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
