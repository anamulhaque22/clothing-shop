import { NullableType } from 'src/utils/types/nullable.type';
import { DeepPartial } from 'typeorm';
import { Product } from '../domain/product';
import { ProductImage } from '../domain/product-image';

export abstract class ProductRepository {
  abstract create(
    data: Omit<Product, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<Product>;

  abstract uploadProductImage(
    data: Omit<ProductImage, 'id'>,
  ): Promise<ProductImage>;

  abstract removeProductImage(id: ProductImage['id']): Promise<void>;

  abstract findImageById(
    id: ProductImage['id'],
  ): Promise<NullableType<ProductImage>>;

  abstract findById(id: Product['id']): Promise<NullableType<Product>>;

  abstract findAll(): Promise<Product[]>;

  abstract update(
    id: Product['id'],
    payload: DeepPartial<Product>,
  ): Promise<Product | null>;

  abstract remove(id: Product['id']): Promise<void>;
}
