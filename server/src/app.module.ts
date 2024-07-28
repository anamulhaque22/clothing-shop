import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import authConfig from './auth/config/auth.config';
import { CategoriesModule } from './categories/categories.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import appConfig from './config/app.config';
import databaseConfig from './database/config/database.config';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { SessionModule } from './session/session.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig, authConfig],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    AuthModule,
    ProductsModule,
    CategoriesModule,
    UsersModule,
    OrdersModule,
    CloudinaryModule,
    SessionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
