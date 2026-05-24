import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ProductImage } from '../../entities/product-image.entity';
import { Repository } from 'typeorm';
import { CreateProductImageDto, UpdateProductImageDto } from '../../dto/product-image.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductImagesService {
      constructor(
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
  ) {}

  async create(createProductImageDto: CreateProductImageDto) {
    try {
      const productImage = this.productImageRepository.create(
        createProductImageDto,
      );

      await this.productImageRepository.save(productImage);

      return productImage;
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException(
        'Error al crear la imagen del producto',
      );
    }
  }

  async findAll(): Promise<ProductImage[]> {
    return await this.productImageRepository.find({});
  }

  async findOne(id: number): Promise<ProductImage> {
    const productImage = await this.productImageRepository.findOne({
      where: { id },
      relations: ['product'],
    });

    if (!productImage) {
      throw new NotFoundException(
        `Imagen de producto con id ${id} no encontrada`,
      );
    }

    return productImage;
  }

  async update(
    id: number,
    updateProductImageDto: UpdateProductImageDto,
  ): Promise<ProductImage> {
    const productImage = await this.findOne(id);

    Object.assign(productImage, updateProductImageDto);

    return await this.productImageRepository.save(productImage);
  }

  async remove(id: number): Promise<void> {
    const productImage = await this.findOne(id);

    await this.productImageRepository.remove(productImage);
  }
}

