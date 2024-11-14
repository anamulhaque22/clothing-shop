import { Product } from 'src/products/domain/product';
import { User } from 'src/users/domain/user';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { QueryRunner } from 'typeorm';
import { Order } from '../domain/order';
import { AllOrdersResponseDto } from '../dto/all-orders-response.dto';
import { OrderDetailsResponseDto } from '../dto/order-details-reponse.dto';
import { FilterOrderDto, SortOrderDto } from '../dto/query-orders.dto';

export abstract class OrderRepository {
  abstract createOrder(
    order: Omit<Order, 'id'>,
    queryRunner: QueryRunner,
  ): Promise<Order>;

  abstract updateProductStock(
    id: Product['id'],
    data: Partial<Product>,
    queryRunner: QueryRunner,
  ): Promise<void>;

  abstract findManyWithPagination({
    userId,
    filterOptions,
    sortOptions,
    search,
    paginationOptions,
  }: {
    userId?: User['id'] | null;
    filterOptions?: FilterOrderDto | null;
    sortOptions?: SortOrderDto[] | null;
    search?: string | null;
    paginationOptions: IPaginationOptions;
  }): Promise<AllOrdersResponseDto[]>;

  abstract findOne(
    id: Order['id'],
    user: { id: User['id']; role: User['role'] },
  ): Promise<OrderDetailsResponseDto>;
  // abstract getOrderById(id: number): Promise<Order>;
  // abstract getOrdersByUserId(userId: number): Promise<Order[]>;
  // abstract updateOrder(order: Order): Promise<Order>;
  // abstract deleteOrder(id: number): Promise<void>;
  // abstract getOrderItemsByOrderId(orderId: number): Promise<OrderItem[]>;
  // abstract createOrderItem(orderItem: OrderItem): Promise<OrderItem>;
  // abstract updateOrderItem(orderItem: OrderItem): Promise<OrderItem>;
  // abstract deleteOrderItem(id: number): Promise<void>;
}
