import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from '../dto/product.dto';
import { CreateProductImageDto } from '../dto/product-image.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
  ) {}
  @Post()
  createProduct(
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productsService.createProduct(
      createProductDto,
    );
  }

  @Get()
  findAllProducts() {
    return this.productsService.findAllProducts();
  }

  @Get(':id')
  findOneProduct(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.productsService.findOneProduct(id);
  }

  @Patch(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: CreateProductDto,
  ) {
    return this.productsService.updateProduct(
      id,
      updateProductDto,
    );
  }

  @Delete(':id')
  removeProduct(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.productsService.removeProduct(id);
  }
/*images*/
  @Post('images')
  createProductImage(
    @Body()
    createProductImageDto: CreateProductImageDto,
  ) {
    return this.productsService.createProductImage(
      createProductImageDto,
    );
  }

  @Get('images')
  findAllProductImages() {
    return this.productsService.findAllProductImages();
  }

  @Get('images/:id')
  findOneProductImage(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.productsService.findOneProductImage(id);
  }

  @Patch('images/:id')
  updateProductImage(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateProductImageDto: CreateProductImageDto,
  ) {
    return this.productsService.updateProductImage(
      id,
      updateProductImageDto,
    );
  }

  @Delete('images/:id')
  removeProductImage(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.productsService.removeProductImage(
      id,
    );
  }
}

