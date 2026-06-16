import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MessagesService } from '../services/messages.service';
import { CreateMessageDto, UpdateMessageDto } from '../dto/message.dto';
import { ApiTags } from '@nestjs/swagger'; // Importamos ApiTags

@ApiTags('Messages') // Agrupa este CRUD en la documentación de Swagger
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @Get('conversation/:conversationId')
  findByConversation(
    @Param('conversationId', ParseIntPipe) conversationId: number,
    @Query('user_id', ParseIntPipe) userId: number,
  ) {
    return this.messagesService.findByConversation(conversationId, userId);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('user_id', ParseIntPipe) userId: number,
  ) {
    return this.messagesService.findOneForUser(id, userId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Query('user_id', ParseIntPipe) userId: number,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    return this.messagesService.update(id, updateMessageDto, userId);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('user_id', ParseIntPipe) userId: number,
  ) {
    return this.messagesService.remove(id, userId);
  }
}
