import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from 'src/categories/categories.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { ProductImageEntity } from './entity/image.entity';
import { ProductColor } from './entity/product-color.entity';
import { ProductSize } from './entity/product-size.entity';
import { Product } from './entity/product.entity';
import { Size } from './entity/size.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductImageEntity,
      Size,
      ProductColor,
      ProductSize,
    ]),
    CategoriesModule,
    CloudinaryModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
