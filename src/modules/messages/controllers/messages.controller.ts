import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';
import { MessagesService } from '../services/messages.service';
import { CreateMessageDto, UpdateMessageDto } from '../dto/message.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../../auth/entities/user.entity';

@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() dto: CreateMessageDto, @Req() req: Request) {
    const user = req.user as User;
    return this.messagesService.create(dto, user.id);
  }

  @Get('conversation/:conversationId')
  findByConversation(
    @Param('conversationId', ParseIntPipe) conversationId: number,
    @Req() req: Request,
  ) {
    const user = req.user as User;
    return this.messagesService.findByConversation(conversationId, user.id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const user = req.user as User;
    return this.messagesService.findOneForUser(id, user.id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    const user = req.user as User;
    return this.messagesService.update(id, updateMessageDto, user.id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const user = req.user as User;
    return this.messagesService.remove(id, user.id);
  }
}
