import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import type { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { RatingsService } from '../services/ratings.service';
import { CreateRatingDto, UpdateRatingDto } from '../dto/rating.dto';
import { User } from '../../auth/entities/user.entity';
import { Auth } from '../../auth/decorators/auth.decorator';
import { ValidRoles } from '../../auth/interfaces/valid-roles.interface';
import { AuthPermission } from '../../auth/decorators/auth-permission.decorator';

@ApiTags('Ratings')
@Controller('ratings')
export class RatingsController {
    constructor(private readonly ratingsService: RatingsService) {}

    @Post()
     @AuthPermission('create-rating')
    create(@Body() dto: CreateRatingDto, @Req() req: Request) {
        const user = req.user as User;
        return this.ratingsService.create(dto, user.id);
    }

    @Get()
    @AuthPermission('read-rating')
    findAll() {
        return this.ratingsService.findAll();
    }

    @Get('reputation/:userId')
    @AuthPermission('read-rating')
    getUserReputation(@Param('userId', ParseIntPipe) userId: number) {
        return this.ratingsService.getUserReputation(userId);
    }

    @Get(':id')
    @AuthPermission('read-rating')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.ratingsService.findOne(id);
    }

    @Patch(':id')
    @AuthPermission('update-rating')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateRatingDto, @Req() req: Request) {
        const user = req.user as User;
        return this.ratingsService.update(id, dto, user);
    }

    @Delete(':id')
    @AuthPermission('delete-rating')
    remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
        const user = req.user as User;
        return this.ratingsService.remove(id, user);
    }
}
