import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/orders/domain/order';
import { AllOrdersResponseDto } from 'src/orders/dto/all-orders-response.dto';
import { OrderDetailsResponseDto } from 'src/orders/dto/order-details-reponse.dto';
import { FilterOrderDto, SortOrderDto } from 'src/orders/dto/query-orders.dto';
import { Product } from 'src/products/domain/product';
import { ProductEntity } from 'src/products/infrastructure/entities/product.entity';
import { ProductMapper } from 'src/products/infrastructure/mappers/product.mapper';
import { RoleEnum } from 'src/roles/roles.enum';
import { User } from 'src/users/domain/user';
import { NullableType } from 'src/utils/types/nullable.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { FindOptionsWhere, QueryRunner, Repository } from 'typeorm';
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

  async findManyWithPagination({
    filterOptions,
    sortOptions,
    search,
    paginationOptions,
  }: {
    filterOptions?: FilterOrderDto | null;
    sortOptions?: SortOrderDto[] | null;
    search?: string | null;
    paginationOptions: IPaginationOptions;
  }): Promise<AllOrdersResponseDto[]> {
    const where: FindOptionsWhere<OrderEntity> = {};
    if (filterOptions?.status) where.status = filterOptions.status;

    if (filterOptions?.paymentStatus)
      where.payments = {
        status: filterOptions.paymentStatus,
      };

    const entities = await this.orderRepo.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
      order: sortOptions?.reduce(
        (acc, sort) => ({ ...acc, [sort.orderBy]: sort.order }),
        {},
      ),
      relations: {
        orderItems: true,
        successPayment: true,
        // billingAddress: true,
        // shippingAddress: true,
        user: true,
      },
    });

    return entities.map((e) => ({
      id: e.id,
      status: e.status,
      user: {
        email: e.user.email,
        id: e.user.id,
        firstName: e.user.firstName,
        lastName: e.user.lastName,
      },
      totalAmount: e.totalAmount,
      createdAt: e.createdAt,
      payment: {
        id: e.successPayment.id,
        status: e.successPayment.status,
      },
    }));
  }

  async findOne(
    id: Order['id'],
    user: {
      id: User['id'];
      role: User['role'];
    },
  ): Promise<NullableType<OrderDetailsResponseDto>> {
    let entity;

    console.log(user.role.id, RoleEnum.admin);
    console.log(Number(user.role.id) === Number(RoleEnum.admin));

    if (Number(user.role.id) === Number(RoleEnum.admin)) {
      entity = await this.orderRepo.findOne({
        where: {
          id: Number(id),
        },

        relations: {
          billingAddress: true,
          successPayment: true,
          user: true,
          orderItems: {
            product: true,
          },
        },
      });
    } else {
      entity = await this.orderRepo.findOne({
        where: {
          id: Number(id),
          user: {
            id: user.id,
          },
        },

        relations: {
          billingAddress: true,
          successPayment: true,
          user: true,
          orderItems: {
            product: true,
          },
        },
      });
    }

    return entity
      ? {
          id: entity.id,
          totalAmount: entity.totalAmount,
          shippingAddress: entity.shippingAddress,
          billingAddress: entity.billingAddress,
          createdAt: entity.createdAt,
          status: entity.status,
          // orderItems:
          user: entity.user,
          orderItems: entity.orderItems.map((oi) => ({
            id: oi.id,
            color: oi.color,
            price: oi.price,
            quantity: oi.quantity,
            size: oi.size,
            product: {
              id: oi.product.id,
              images: oi.product.images,
              title: oi.product.title,
              description: oi.product.description,
            },
          })),
        }
      : null;
  }
}
