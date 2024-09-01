import { ProductSizeDto } from 'src/product-sizes/dto/product-size.dto';
import { NullableType } from 'src/utils/types/nullable.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { DeepPartial } from 'typeorm';
import { Product } from '../domain/product';
import { ProductImage } from '../domain/product-image';
import { QueryCategoryDto } from '../dto/query-product.dto';

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

  abstract findManyWithPagination({
    // filterOptions,
    // sortOptions,
    category,
    search,
    paginationOptions,
    size,
    minPrice,
    maxPrice,
  }: {
    // filterOptions: FilterUserDto | null;
    // sortOptions: SortUserDto[] | null;
    size: ProductSizeDto | null;
    minPrice: number | null;
    maxPrice: number | null;
    search: string;
    category: QueryCategoryDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Product[]>;

  abstract update(
    id: Product['id'],
    payload: DeepPartial<Product>,
  ): Promise<Product | null>;

  abstract remove(id: Product['id']): Promise<void>;
}
