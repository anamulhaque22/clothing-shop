import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/domain/product';
import { NullableType } from 'src/utils/types/nullable.type';
import { DeepPartial, Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { ProductMapper } from '../mappers/product.mapper';
import { ProductRepository } from '../product.repository';

export class ProductRepositoryImpl implements ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async create(data: Product): Promise<Product> {
    const persistenceModel = ProductMapper.toPersistence(data);
    const entities = await this.productRepository.save(
      this.productRepository.create(persistenceModel),
    );
    return ProductMapper.toDomain(entities);
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
    payload: DeepPartial<Product>,
  ): Promise<Product | null> {
    const entity = await this.productRepository.findOne({
      where: { id: Number(id) },
    });

    if (!entity) {
      throw new Error('Product Not Found!');
    }

    const updatedEntity = await this.productRepository.save(
      this.productRepository.create(
        ProductMapper.toPersistence({
          ...ProductMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ProductMapper.toDomain(updatedEntity);
  }
}
