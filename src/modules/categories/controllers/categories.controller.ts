import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dto';
import { UserPermissionGuard } from '../../auth/guards/user-permission.guard';
import { AuthPermission } from '../../auth/decorators/auth-permission.decorator';

@ApiTags('Categories')
@Controller('categories')
@UseGuards(UserPermissionGuard)
export class CategoriesController {
    constructor(private readonly categoriesServices: CategoriesService) {}

    @Post()
    @AuthPermission('create-category')
    create( @Body() createCategoryDto: CreateCategoryDto) {
        return this.categoriesServices.create(createCategoryDto);
    }

    @Get()
    @AuthPermission('read-category')

    findAll() {
        return this.categoriesServices.findAll();
    }

    @Get(':id')
    @AuthPermission('read-category')
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
