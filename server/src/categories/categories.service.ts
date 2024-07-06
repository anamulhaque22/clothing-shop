import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  async createCategory(name: string): Promise<Category> {
    const category = this.categoryRepo.create({ name });
    return this.categoryRepo.save(category);
  }

  async getCategories(): Promise<Category[]> {
    return this.categoryRepo.find();
  }

  async getCategoryById(id: number): Promise<Category> {
    return this.categoryRepo.findOneBy({ id });
  }
}
