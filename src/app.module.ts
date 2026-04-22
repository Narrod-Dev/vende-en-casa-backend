import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { UsersController } from './modules/users/controllers/users.controller';

@Module({
  imports: [UsersModule],
  controllers: [UsersController],
  providers: [],
})
export class AppModule {}