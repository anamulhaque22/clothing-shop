import { InjectRepository } from '@nestjs/typeorm';
import { Product, ProductInfo } from 'src/products/domain/product';
import { ProductImage } from 'src/products/domain/product-image';
import { NullableType } from 'src/utils/types/nullable.type';
import { Repository } from 'typeorm';
import { ProductImageEntity } from '../entities/product-image.entity';
import { ProductEntity } from '../entities/product.entity';
import { ProductMapper } from '../mappers/product.mapper';
import { ProductRepository } from '../product.repository';

export class ProductRepositoryImpl implements ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(ProductImageEntity)
    private readonly productImageRepository: Repository<ProductImageEntity>,
  ) {}

  async create(data: Product): Promise<Product> {
    const persistenceModel = ProductMapper.toPersistence(data);

    const entities = await this.productRepository.save(
      this.productRepository.create(persistenceModel),
    );
    return ProductMapper.toDomain(entities);
  }

  async uploadProductImage(
    data: Omit<ProductImage, 'id'>,
  ): Promise<ProductImage> {
    const newImage = new ProductImageEntity();
    newImage.imageUrl = data.imageUrl;
    newImage.publicId = data.publicId;
    return this.productImageRepository.save(
      this.productImageRepository.create(newImage),
    );
  }

  async removeProductImage(id: ProductImage['id']): Promise<void> {
    const image = await this.productImageRepository.findOne({
      where: { id },
    });
    await this.productImageRepository.remove(image);
    return;
  }

  async findImageById(
    id: ProductImage['id'],
  ): Promise<NullableType<ProductImage>> {
    return this.productImageRepository.findOne({
      where: {
        id,
      },
    });
  }
  async findAll(): Promise<Product[]> {
    const entities = await this.productRepository.find();
    return entities.map((product) => ProductMapper.toDomain(product));
  }

  async findById(id: Product['id']): Promise<NullableType<Product>> {
    const entity = await this.productRepository.findOne({
      where: { id: Number(id) },
    });
    return entity ? ProductMapper.toDomain(entity) : null;
  }

  async remove(id: Product['id']): Promise<void> {
    await this.productRepository.softDelete(id);
  }
  async update(
    id: Product['id'],
    payload: Partial<Product>,
  ): Promise<Product | null> {
    const entity = await this.productRepository.findOne({
      where: { id: Number(id) },
    });

    if (!entity) {
      throw new Error('Product Not Found!');
    }

    const mappedProductInfo: ProductInfo[] = entity.productColors.map((pc) => {
      const matchingInfo = payload.productInfo.find((pf) => pf?.id === pc.id);
      return matchingInfo
        ? {
            ...pc,
            ...matchingInfo,
            colorSizeWiseQuantity: {
              ...pc.colorSizeWiseQuantity,
              ...matchingInfo.colorSizeWiseQuantity,
            },
          }
        : pc;
    });

    payload.productInfo.map((pi) => {
      if (!pi.id) {
        mappedProductInfo.push(pi);
      }
    });

    const updatedEntity = await this.productRepository.save(
      this.productRepository.create(
        ProductMapper.toPersistence({
          ...ProductMapper.toDomain(entity),
          ...payload,
          // productInfo: [...mappedProductInfo],
        }),
      ),
    );

    return ProductMapper.toDomain(updatedEntity);
  }
}
