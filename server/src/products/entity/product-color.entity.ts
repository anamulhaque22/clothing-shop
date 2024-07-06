import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ColorSizeQuantity } from './color-size-quantity.entity';

import { Product } from './product.entity';

@Entity()
export class ProductColor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  colorName: string;

  @Column()
  colorCode: string;

  @ManyToOne(() => Product, (product) => product.productColors)
  product: Product;

  @Column()
  colorWiseQuantity: number;

  @OneToMany(
    () => ColorSizeQuantity,
    (colorSizeQuantity) => colorSizeQuantity.productColor,
  )
  colorSizeQuantities: ColorSizeQuantity[];
}
