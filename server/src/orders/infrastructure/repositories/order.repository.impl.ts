import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/orders/domain/order';
import { Repository } from 'typeorm';
import { OrderEntity } from '../entities/order.entity';
import { OrderMapper } from '../mappers/order.mapper';
import { OrderRepository } from '../order.repository';

@Injectable()
export class OrderRepositoryImpl implements OrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepo: Repository<OrderEntity>,
  ) {}

  async createOrder(order: Order): Promise<Order> {
    const persistenceEntity = OrderMapper.toPersistence(order);
    // console.log(order.billingAddress.id);
    // console.log(persistenceEntity.billingAddress.id);
    const entity = await this.orderRepo.save(
      this.orderRepo.create({
        ...persistenceEntity,
        paymentIntentId: 'pi_1J2e',
      }),
    );

    return OrderMapper.toDomain(entity);
  }
}
