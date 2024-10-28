import { Order } from '../domain/order';

export abstract class OrderRepository {
  abstract createOrder(order: Omit<Order, 'id'>): Promise<Order>;
  // abstract getOrderById(id: number): Promise<Order>;
  // abstract getOrdersByUserId(userId: number): Promise<Order[]>;
  // abstract updateOrder(order: Order): Promise<Order>;
  // abstract deleteOrder(id: number): Promise<void>;
  // abstract getOrderItemsByOrderId(orderId: number): Promise<OrderItem[]>;
  // abstract createOrderItem(orderItem: OrderItem): Promise<OrderItem>;
  // abstract updateOrderItem(orderItem: OrderItem): Promise<OrderItem>;
  // abstract deleteOrderItem(id: number): Promise<void>;
}
