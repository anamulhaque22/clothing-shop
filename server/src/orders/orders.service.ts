import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AddressType } from 'src/addresses/address-type.enum';
import { AddressesService } from 'src/addresses/addresses.service';
import { Address } from 'src/addresses/domain/address';
import { ProductsService } from 'src/products/products.service';
import { User } from 'src/users/domain/user';
import { UsersService } from 'src/users/users.service';
import { Order } from './domain/order';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderRepository } from './infrastructure/order.repository';
import { ORDER_STATUS } from './orders.enum';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepo: OrderRepository,
    private readonly productsService: ProductsService,
    private readonly userService: UsersService,
    private readonly addressesService: AddressesService,
  ) {}

  async createOrder(
    data: CreateOrderDto & {
      userId: User['id'];
    },
  ): Promise<Order> {
    const user = await this.userService.findById(data.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // checking the product quantity and product existence
    const products = await Promise.all(
      data.orderItems.map(async (item) => {
        const product = await this.productsService.findOne(item.productId);
        if (!product) {
          throw new NotFoundException(
            `Product not found with id: ${item.productId}`,
          );
        }

        if (product.quantity < item.quantity) {
          throw new BadRequestException(
            `Insufficient stock for product id: ${item.productId}`,
          );
        }

        return product;
      }),
    );

    //decreasing the product quantity
    data.orderItems.forEach((item) => {
      const product = products.find((p) => p.id === item.productId);
      product.quantity -= item.quantity;
    });

    //calculating the total amount
    let totalAmount = 0;
    data.orderItems.forEach((item) => {
      const product = products.find((p) => p.id === item.productId);
      totalAmount += product.sellPrice * item.quantity;
    });

    // creating billing and shipping address

    let billingAddress = new Address();
    if (data.billingAddressId) {
      const address = await this.addressesService.findOne(
        data.billingAddressId,
      );
      if (!address) {
        throw new NotFoundException('Billing address not found');
      }
      billingAddress = address;
    } else {
      const address = await this.addressesService.create(data.billingAddress);
      billingAddress = address;
    }

    let shippingAddress = new Address();
    if (data.shippingAddressId && !data.shippingAddress) {
      const address = await this.addressesService.findOne(
        data.shippingAddressId,
      );
      if (!address) {
        throw new NotFoundException('Shipping address not found');
      }
      shippingAddress = address;
    } else if (data.shippingAddress && !data.shippingAddressId) {
      const address = await this.addressesService.create({
        ...data.shippingAddress,
        addressType: AddressType.SHIPPING,
      });
      shippingAddress = address;
    } else {
      shippingAddress = billingAddress;
    }

    let newOrderItems = data.orderItems.map((item) => {
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: products.find((p) => p.id === item.productId).sellPrice,
      };
    });

    const order = await this.orderRepo.createOrder({
      ...data,
      user,
      status: ORDER_STATUS.PENDING,
      totalAmount,
      billingAddress,
      shippingAddress,
      orderItems: newOrderItems,
    });

    return order;
  }
}
