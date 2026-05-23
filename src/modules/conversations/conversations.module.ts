import { Module } from '@nestjs/common';
import { ConversationsService } from './services/conversations.service';
import { ConversationsController } from './controllers/conversations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from './entities/conversation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation])],
  providers: [ConversationsService],
  controllers: [ConversationsController],
  exports: [TypeOrmModule, ConversationsService],
})
export class ConversationsModule {}
