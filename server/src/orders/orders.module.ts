import { Module } from '@nestjs/common';
import { AddressesModule } from 'src/addresses/addresses.module';
import { QueryRunnerFactory } from 'src/database/query-runner-factory';
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/users.module';
import { OrderTypeOrmModule } from './infrastructure/order-typeorm.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    OrderTypeOrmModule,
    UsersModule,
    ProductsModule,
    AddressesModule,
    // StripeModule,
  ],
  providers: [OrdersService, QueryRunnerFactory],
  controllers: [OrdersController],
  exports: [OrdersService],
})
export class OrdersModule {}
