import { 
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { ProductImage } from '../entities/product-image.entity';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';
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
async findOneProduct(id: number) {
  const product = await this.productRepository.findOneBy({ id });

  if (!product) {
    throw new NotFoundException('Product not found');
  }

  return product;
}
async updateProduct(id: number, updateDto: UpdateProductDto) {
  const product = await this.findOneProduct(id);

  Object.assign(product, updateDto);

  return this.productRepository.save(product);
}
async removeProduct(id: number) {
  const product = await this.findOneProduct(id);
  return this.productRepository.remove(product);
}

/*images*/
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
  async findOneProductImage(id: number) {
  const image = await this.productImageRepository.findOneBy({ id });

  if (!image) {
    throw new NotFoundException('Image not found');
  }

  return image;
}

async updateProductImage(id: number, dto: any) {
  const image = await this.findOneProductImage(id);
  Object.assign(image, dto);
  return this.productImageRepository.save(image);
}

async removeProductImage(id: number) {
  const image = await this.findOneProductImage(id);
  return this.productImageRepository.remove(image);
}
}

