import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Order } from './domain/order';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@Controller({
  path: 'orders',
  version: '1',
})
export class OrdersController {
  constructor(private readonly ordresService: OrdersService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createOrder(
    @Body() data: CreateOrderDto,
    @Request() request,
  ): Promise<Order> {
    return this.ordresService.createOrder({ ...data, userId: request.user.id });
  }
}
