import { Injectable, InternalServerErrorException, NotFoundException, BadRequestException, HttpException } from '@nestjs/common';
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
// Verifica cuantas imagenes tiene actualmente el producto
      const totalImages = await this.productImageRepository.count({
        where: {
          product_id: createProductImageDto.product_id,
        },
    });
// Impide agregar más de 3 imagenes por producto
      if (totalImages >= 3) {
        throw new BadRequestException(
          'El producto ya tiene el maximo de imagenes permitidas',
        );
      }
//control de portada
// Asegura que solo una imagen por producto pueda ser portada (is_main = true)
// la imagen seleccionda se establece como true y el resto pasa a ser false
    if (createProductImageDto.is_main) {
      await this.productImageRepository.update(
        { product_id: createProductImageDto.product_id },
        { is_main: false },
      );
    }

      const productImage = this.productImageRepository.create(
        createProductImageDto,
      );
      await this.productImageRepository.save(productImage);

      return productImage;
    } catch (error) {
      console.log(error);
// esto permite mantener el mensaje de error por poner más imagenes de las permitidas
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Error al agregar imagen del producto',
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

