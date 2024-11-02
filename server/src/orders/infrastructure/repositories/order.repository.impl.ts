import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/orders/domain/order';
import { Product } from 'src/products/domain/product';
import { ProductEntity } from 'src/products/infrastructure/entities/product.entity';
import { ProductMapper } from 'src/products/infrastructure/mappers/product.mapper';
import { QueryRunner, Repository } from 'typeorm';
import { OrderEntity } from '../entities/order.entity';
import { OrderMapper } from '../mappers/order.mapper';
import { OrderRepository } from '../order.repository';

@Injectable()
export class OrderRepositoryImpl implements OrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepo: Repository<OrderEntity>,
  ) {}

  async createOrder(order: Order, queryRunner: QueryRunner): Promise<Order> {
    const persistenceEntity = OrderMapper.toPersistence(order);

    const entity = await queryRunner.manager.save(
      this.orderRepo.create({
        ...persistenceEntity,
      }),
    );

    return OrderMapper.toDomain(entity);
  }

  async updateProductStock(
    id: Product['id'],
    data: Partial<Product>,
    queryRunner: QueryRunner,
  ): Promise<void> {
    const clonedPayload = { ...data };
    const product = await queryRunner.manager.findOne(ProductEntity, {
      where: { id },
    });

    await queryRunner.manager.save(ProductEntity, {
      ...ProductMapper.toPersistence({
        ...ProductMapper.toDomain(product),
        ...clonedPayload,
      }),
    });
  }
}
