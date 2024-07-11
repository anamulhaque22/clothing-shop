import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  async create(data: CreateCategoryDto): Promise<any> {
    let parentCategory: CreateCategoryDto = null;
    if (data.parentCategoryID) {
      parentCategory = await this.categoryRepo.findOne({
        where: { id: data.parentCategoryID },
      });
      if (!parentCategory) {
        throw new NotFoundException('Parent category not found');
      }
    }
    const categoryData: DeepPartial<Category> = {
      name: data.name,
      parentCategory,
    };

    return await this.categoryRepo.save(categoryData);
  }

  async getCategories(): Promise<Category[]> {
    return this.categoryRepo.find();
  }

  async getCategoryById(id: number): Promise<Category> {
    return this.categoryRepo.findOneBy({ id });
  }
}
