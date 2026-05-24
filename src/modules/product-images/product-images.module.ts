import { Module } from '@nestjs/common';
import { ProductImagesService } from './services/product-images/product-images.service';
import { ProductImagesController } from './controllers/product-images/product-images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImage } from './entities/product-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductImage])],
  providers: [ProductImagesService],
  controllers: [ProductImagesController],
  exports: [TypeOrmModule, ProductImagesService]
})
export class ProductImagesModule {}
