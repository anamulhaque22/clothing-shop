import { AddressEntity } from 'src/addresses/infrastructure/entities/address.entity';
import { ORDER_STATUS } from 'src/orders/orders.enum';
import { PaymentEntity } from 'src/payment/infrastructure/entities/payment.entity';
import { UserEntity } from 'src/users/infrastructure/entities/user.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItemEntity } from './order-item.entity';

@Entity({
  name: 'orders',
})
export class OrderEntity extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('numeric', { precision: 10, scale: 2 })
  totalAmount: number;

  @Column({
    type: 'enum',
    enum: ['PENDING', 'SHIPPED', 'DELIVERED'],
    default: ORDER_STATUS.PENDING,
  })
  status: ORDER_STATUS;

  @ManyToOne(() => AddressEntity)
  billingAddress: AddressEntity;

  @ManyToOne(() => AddressEntity)
  shippingAddress: AddressEntity;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order, {
    cascade: true,
  })
  orderItems: OrderItemEntity[];

  @OneToMany(() => PaymentEntity, (payment) => payment.order, { cascade: true })
  payments: PaymentEntity[];

  @OneToOne(() => PaymentEntity, (payment) => payment.order)
  successPayment: PaymentEntity;
}
