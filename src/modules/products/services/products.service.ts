import { 
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    ForbiddenException,
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
// Todo producto nuevo creado inicia con estado "Available"
      const product =
        this.productRepository.create({
          ...createProductDto,
          status: 'Available',
        });

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
    sellerId: number,
    updateProductDto: UpdateProductDto,
  ) {
    const product = await this.findOne(id);

// Solo el vendedor puede editar el producto
// Esto simula un sistema de autenticación real
// Si los ids no coinciden, significa que otro usuario esta
// intentando modificar un producto que no le pertenece
  if (product.seller_id !== sellerId) {
    throw new ForbiddenException(
      'No tienes permiso para editar este producto',
    );
  }

    Object.assign(product, updateProductDto);

    return this.productRepository.save(product);
  }

  async remove(
    id: number, 
    sellerId: number,
  ) {
    const product = await this.findOne(id);
// Antes de eliminar el producto comprueba que el usuario
// que realiza la solicitud sea el creador del mismo
  if (product.seller_id !== sellerId) {
    throw new ForbiddenException(
      'No tienes permiso para eliminar este producto',
    );
  }
    return this.productRepository.remove(product);
  }
}