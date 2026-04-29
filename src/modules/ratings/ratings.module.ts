import { Module } from '@nestjs/common';
import { RatingsController } from './controllers/ratings.controller';
import { RatingsService } from './services/ratings.service';

@Module({
  controllers: [RatingsController],
  providers: [RatingsService]
})
export class RatingsModule {}
