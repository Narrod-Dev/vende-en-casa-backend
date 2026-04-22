import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { UsersController } from './modules/users/controllers/users.controller';
import { RatingsModule } from './modules/ratings/ratings.module';

@Module({
  imports: [UsersModule, RatingsModule],
  controllers: [UsersController],
  providers: [],
})
export class AppModule {}
