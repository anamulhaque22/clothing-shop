import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column('jsonb')
  colorSizeWiseQuantity: { [key: string]: number };
}
