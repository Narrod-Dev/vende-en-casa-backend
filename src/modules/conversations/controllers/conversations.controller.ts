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
import { ConversationsService } from '../services/conversations.service';
import {
  CreateConversationDto,
  UpdateConversationDto,
} from '../dto/conversation.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../../auth/entities/user.entity';
import { AuthPermission } from '../../auth/decorators/auth-permission.decorator';

@ApiTags('Conversations')
@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Post()
  @AuthPermission('create-conversation')
  create(@Body() dto: CreateConversationDto, @Req() req: Request) {
    const user = req.user as User;
    return this.conversationsService.create(dto, user.id);
  }

  @Get()
   @AuthPermission('read-conversation')
  findByUser(@Req() req: Request) {
    const user = req.user as User;
    return this.conversationsService.findByUser(user.id);
  }

  @Get(':id')
   @AuthPermission('read-conversation')
  findOne(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const user = req.user as User;
    return this.conversationsService.findOneForUser(id, user.id);
  }

  @Patch(':id')
   @AuthPermission('update-conversation')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
    @Body() dto: UpdateConversationDto,
  ) {
    const user = req.user as User;
    return this.conversationsService.update(id, dto, user.id);
  }

  @Delete(':id')
  @AuthPermission('delete-conversation')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const user = req.user as User;
    return this.conversationsService.remove(id, user.id);
  }
}
