import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RatingsService } from '../services/ratings.service';
import { CreateRatingDto, UpdateRatingDto } from '../dto/rating.dto';

@ApiTags('Ratings')
@Controller('ratings')
export class RatingsController {
    constructor(private readonly ratingsService: RatingsService) {}

    @Post()
    create(@Body() createRatingDto: CreateRatingDto) {
        return this.ratingsService.create(createRatingDto);
    }

    @Get()
    findAll() {
        return this.ratingsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.ratingsService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateRatingDto: UpdateRatingDto,
    ) {
        return this.ratingsService.update(id, updateRatingDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.ratingsService.remove(id);
    }

}
