import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { NullableType } from 'src/utils/types/nullable.type';
import { CategoriesService } from './categories.service';
import { Category } from './domain/category';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller({
  path: 'categories',
  version: '1',
})
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get(':id')
  async findById(
    @Param('id') id: Category['id'],
  ): Promise<NullableType<Category>> {
    return this.categoriesService.findById(id);
  }

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Patch(':id')
  async update(
    @Param('id') id: Category['id'],
    @Body() payload: Partial<Category>,
  ): Promise<NullableType<Category>> {
    return this.categoriesService.update(id, payload);
  }

  @Delete(':id')
  async remove(@Param('id') id: Category['id']): Promise<void> {
    return this.categoriesService.remove(id);
  }
}
