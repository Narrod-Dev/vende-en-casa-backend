import { 
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { ProductImage } from '../entities/product-image.entity';
import { CreateProductDto } from '../dto/product.dto';
import { CreateProductImageDto } from '../dto/product-image.dto';


@Injectable()
export class ProductsService {
      constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
  ) {}
  
  async createProduct(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);
      return await this.productRepository.save(product);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al crear el producto');
    }
  }

  async findAllProducts() {
    return this.productRepository.find({});
  }

  async createProductImage(createProductImageDto: CreateProductImageDto) {
    try {
      const image = this.productImageRepository.create(createProductImageDto);
      return await this.productImageRepository.save(image);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al crear la imagen del producto');
    }
  }

  async findAllProductImages() {
    return this.productImageRepository.find({});
  }
}

