import { CategoryEntity } from 'src/categories/infrastructure/entities/category.entity';
import { ProductSizeEntity } from 'src/product-sizes/infrastructure/entities/product-size.entity';
import { Product } from 'src/products/domain/product';
import { ProductColorEntity } from '../entities/product-color.entity';
import { ProductImageEntity } from '../entities/product-image.entity';
import { ProductEntity } from '../entities/product.entity';

export class ProductMapper {
  static toDomain(raw: ProductEntity): Product {
    const product = new Product();
    product.id = raw.id;
    product.title = raw.title;
    product.description = raw.description;
    product.buyPrice = raw.buyPrice;
    product.sellPrice = raw.sellPrice;
    product.quantity = raw.quantity;
    product.discount = raw.discount;
    product.category = raw.category;
    product.sizes = raw.sizes;
    product.images = raw.images;
    product.productInfo = raw.productColors;

    return product;
  }
  static toPersistence(product: Product): ProductEntity {
    let category: CategoryEntity | undefined = undefined;
    if (product.category && product.category.id) {
      category = new CategoryEntity();
      category.id = product.category.id;
    }

    let sizes: ProductSizeEntity[] | undefined = undefined;
    if (product.sizes && product.sizes.length > 0) {
      sizes = product.sizes.map((size) => {
        const sizeEntity = new ProductSizeEntity();
        sizeEntity.id = size.id;
        return sizeEntity;
      });
    }

    let images: ProductImageEntity[] | undefined = undefined;
    if (product.images && product.images.length > 0) {
      images = product.images.map((image) => {
        const imageEntity = new ProductImageEntity();
        imageEntity.id = image.id;
        return imageEntity;
      });
    }

    let productColors: ProductColorEntity[] | undefined = undefined;
    if (product.productInfo && product.productInfo.length > 0) {
      productColors = product.productInfo.map((color) => {
        const colorEntity = new ProductColorEntity();
        colorEntity.colorCode = color.colorCode;
        colorEntity.colorName = color.colorName;
        colorEntity.colorSizeWiseQuantity = color.colorSizeWiseQuantity;
        colorEntity.colorWiseQuantity = color.colorWiseQuantity;
        if (color.id) {
          colorEntity.id = color.id;
        }
        return colorEntity;
      });
    }
    const productEntity = new ProductEntity();
    if (product.id && typeof product.id === 'number') {
      productEntity.id = product.id;
    }
    productEntity.title = product.title;
    productEntity.description = product.description;
    productEntity.buyPrice = product.buyPrice;
    productEntity.sellPrice = product.sellPrice;
    productEntity.quantity = product.quantity;
    productEntity.discount = product.discount;
    productEntity.category = category;
    productEntity.sizes = sizes;
    productEntity.images = images;
    productEntity.productColors = productColors;
    productEntity.visibility = product.visibility;

    return productEntity;
  }
}
