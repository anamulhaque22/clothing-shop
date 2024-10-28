import { Module } from '@nestjs/common';
import { AddressesModule } from 'src/addresses/addresses.module';
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/users.module';
import { OrderTypeOrmModule } from './infrastructure/order-typeorm.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [OrderTypeOrmModule, UsersModule, ProductsModule, AddressesModule],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
