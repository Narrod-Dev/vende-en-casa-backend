import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { UsersController } from './modules/users/controllers/users.controller';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [UsersModule, ProductsModule],
  controllers: [UsersController],
  providers: [],
})
export class AppModule {}
