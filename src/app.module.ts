import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { UsersController } from './modules/users/controllers/users.controller';
import { MessagesModule } from './modules/messages/messages.module';

@Module({
  imports: [UsersModule, MessagesModule],
  controllers: [UsersController],
  providers: [],
})
export class AppModule {}
