import { 
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    ForbiddenException,
    ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { User } from '../../auth/entities/user.entity';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';
import { ValidRoles } from '../../auth/interfaces/valid-roles.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createProductDto: CreateProductDto, userId: number) {
    const seller = await this.userRepository.findOneBy({ id: userId });
    if (!seller)
      throw new NotFoundException(`El vendedor con id ${userId} no existe.`);

    try {
      const product =
        this.productRepository.create({
          ...createProductDto,
          seller_id: userId,
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
    user: User,
    updateProductDto: UpdateProductDto,
  ) {
    const product = await this.findOne(id);

    if (product.seller_id !== user.id && user.role.name.toLowerCase() !== ValidRoles.admin) {
      throw new ForbiddenException('No tienes permiso para editar este producto');
    }

    Object.assign(product, updateProductDto);

    return this.productRepository.save(product);
  }

  async remove(
    id: number,
    user: User,
  ) {
    const product = await this.findOne(id);

    if (product.seller_id !== user.id && user.role.name.toLowerCase() !== ValidRoles.admin) {
      throw new ForbiddenException('No tienes permiso para eliminar este producto');
    }

    try {
      return await this.productRepository.remove(product);
    } catch (error) {
      if (error.code === '23503') {
        throw new ConflictException('No se puede eliminar el producto porque tiene conversaciones o calificaciones asociadas.');
      }
      throw error;
    }
  }
}