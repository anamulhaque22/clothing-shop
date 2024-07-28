import { NullableType } from 'src/utils/types/nullable.type';
import { DeepPartial } from 'typeorm';
import { Product } from '../domain/product';

export abstract class ProductRepository {
  abstract create(
    data: Omit<Product, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<Product>;

  abstract findById(id: Product['id']): Promise<NullableType<Product>>;

  abstract findAll(): Promise<Product[]>;

  abstract update(
    id: Product['id'],
    payload: DeepPartial<Product>,
  ): Promise<Product | null>;

  abstract remove(id: Product['id']): Promise<void>;
}
