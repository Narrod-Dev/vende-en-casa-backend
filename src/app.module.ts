import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { UsersController } from './modules/users/controllers/users.controller';
import { ProductsModule } from './modules/products/products.module';
import { MessagesModule } from './modules/messages/messages.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { RatingsModule } from './modules/ratings/ratings.module';

@Module({
  imports: [UsersModule, ProductsModule, MessagesModule, CategoriesModule, RatingsModule],
  controllers: [UsersController],
  providers: [],
})
export class AppModule {}