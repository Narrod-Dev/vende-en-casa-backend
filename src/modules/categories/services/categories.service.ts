import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ) {}

    async create( createCategoryDto: CreateCategoryDto): Promise<Category> {
        const category = this.categoryRepository.create(createCategoryDto);
        return await this.categoryRepository.save(category);
    }

    async findAll() {
        return this.categoryRepository.find()
    }

    async findOne( id: number): Promise<Category> {
        const category = await this.categoryRepository.findOneBy({id})
        if (!category) {
            throw new NotFoundException(`Categoria con id ${id} no encontrado.`)
        }
        return category
    }

    async update( id: number, updateCategoryDto: UpdateCategoryDto ): Promise<Category> {
        const category = await this.findOne(id);
        Object.assign(category, updateCategoryDto);
        return await this.categoryRepository.save(category);
    }

    async remove( id: number): Promise<void> {
        const category = await this.findOne(id)
        await this.categoryRepository.remove(category)
    }
}
