import { Module } from '@nestjs/common';
import { RatingsController } from './controllers/ratings.controller';
import { RatingsService } from './services/ratings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './entities/rating.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rating])],
  controllers: [RatingsController],
  providers: [RatingsService],
  exports: [TypeOrmModule, RatingsService]
})
export class RatingsModule {}
