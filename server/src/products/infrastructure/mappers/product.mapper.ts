import { Product } from 'src/products/domain/product';
import { ProductEntity } from '../entities/product.entity';

export class ProductMapper {
  static toDomain(raw: ProductEntity): Product {
    const product = new Product();
    return product;
  }
  static toPersistence(product: Product): ProductEntity {
    const productEntity = new ProductEntity();
    return productEntity;
  }
}
