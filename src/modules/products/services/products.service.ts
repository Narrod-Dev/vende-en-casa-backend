import { 
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product =
        this.productRepository.create(createProductDto);

      return await this.productRepository.save(product);
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException(
        'Error al crear el producto',
      );
    }
  }

  async findAll() {
    return this.productRepository.find({});
  }

  async findOne(id: number) {
    const product =
      await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException(
        'Producto no encontrado',
      );
    }

    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ) {
    const product = await this.findOne(id);

    Object.assign(product, updateProductDto);

    return this.productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);

    return this.productRepository.remove(product);
  }
}