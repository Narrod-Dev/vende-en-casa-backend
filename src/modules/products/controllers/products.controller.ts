import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import type { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService } from '../services/products.service';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';
import { User } from '../../auth/entities/user.entity';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
  ) {}

  @Post()
  create(
    @Body() createProductDto: CreateProductDto,
    @Req() req: Request,
  ) {
    const user = req.user as User;
    return this.productsService.create(createProductDto, user.id);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const user = req.user as User;
    return this.productsService.update(id, user, updateProductDto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
  ) {
    const user = req.user as User;
    return this.productsService.remove(id, user);
  }
}
