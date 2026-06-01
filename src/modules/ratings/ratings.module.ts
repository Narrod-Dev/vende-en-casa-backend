import { Module } from '@nestjs/common';
import { RatingsController } from './controllers/ratings.controller';
import { RatingsService } from './services/ratings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './entities/rating.entity';
import { Conversation } from '../conversations/entities/conversation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rating, Conversation])],
  controllers: [RatingsController],
  providers: [RatingsService],
  exports: [TypeOrmModule, RatingsService]
})
export class RatingsModule {}
