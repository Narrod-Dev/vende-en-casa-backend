import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ProductImagesService } from '../../services/product-images/product-images.service';
import { CreateProductImageDto, UpdateProductImageDto } from '../../dto/product-image.dto';
import { Auth } from '../../../auth/decorators/auth.decorator';
import { ValidRoles } from '../../../auth/interfaces/valid-roles.interface';

@Controller('product-images')
@Auth(ValidRoles.admin)
export class ProductImagesController {
      constructor(
    private readonly productImagesService: ProductImagesService,
  ) {}

  @Post()
  create(
    @Body() createProductImageDto: CreateProductImageDto,
  ) {
    return this.productImagesService.create(
      createProductImageDto,
    );
  }

  @Get()
  findAll() {
    return this.productImagesService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.productImagesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductImageDto: UpdateProductImageDto,
  ) {
    return this.productImagesService.update(
      id,
      updateProductImageDto,
    );
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.productImagesService.remove(id);
  }

}
