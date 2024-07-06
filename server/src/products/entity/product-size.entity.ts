import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { Size } from './size.entity';

@Entity()
export class ProductSize {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.productSizes)
  product: Product;

  @ManyToOne(() => Size, (size) => size.productSizes)
  size: Size;
}
