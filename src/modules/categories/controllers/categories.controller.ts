import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dto';
import { Auth } from '../../auth/decorators/auth.decorator';
import { ValidRoles } from '../../auth/interfaces/valid-roles.interface';

@ApiTags('Categories')
@Controller('categories')
@Auth(ValidRoles.admin)
export class CategoriesController {
    constructor(private readonly categoriesServices: CategoriesService) {}

    @Post()
    create( @Body() createCategoryDto: CreateCategoryDto) {
        return this.categoriesServices.create(createCategoryDto);
    }

    @Get()
    findAll() {
        return this.categoriesServices.findAll();
    }

    @Get(':id')
    findOne( @Param( 'id', ParseIntPipe) id: number) {
        return this.categoriesServices.findOne(id);
    }

    @Patch(':id')
    update(
        @Param( 'id', ParseIntPipe) id:number,
        @Body() updateCategoryDto: UpdateCategoryDto
    ) {
        return this.categoriesServices.update(id, updateCategoryDto);
    }

    @Delete(':id')
    remove( @Param( 'id', ParseIntPipe) id: number ) {
        return this.categoriesServices.remove(id)
    }
}
