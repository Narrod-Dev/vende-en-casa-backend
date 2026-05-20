import { Module } from '@nestjs/common';
import { MessagesController } from './controllers/messages.controller';
import { MessagesService } from './services/messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from './entities/conversation.entity';
import { Message } from './entities/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation, Message])],
  controllers: [MessagesController],
  providers: [MessagesService],
  exports: [TypeOrmModule, MessagesService]
})
export class MessagesModule {}
