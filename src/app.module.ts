import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { UsersController } from './modules/users/controllers/users.controller';
import { ProductsModule } from './modules/products/products.module';
import { MessagesModule } from './modules/messages/messages.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { RatingsModule } from './modules/ratings/ratings.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationsModule } from './modules/conversations/conversations.module';

@Module({
  imports: [
    UsersModule, 
    ProductsModule, 
    MessagesModule, 
    CategoriesModule, 
    RatingsModule,
    
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true
    }),

    ConversationsModule,
  ],
  controllers: [UsersController],
  providers: [],
})
export class AppModule {}