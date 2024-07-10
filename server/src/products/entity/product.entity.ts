import { Category } from 'src/categories/category.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Image } from './image.entity';
import { ProductColor } from './product-color.entity';
import { ProductSize } from './product-size.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  buyPrice: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  sellPrice: number;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @Column()
  quantity: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  discount: number;

  @Column({ type: 'enum', enum: ['Hidden', 'Visible'] })
  visibility: 'Hidden' | 'Visible';

  @OneToMany(() => ProductColor, (productColor) => productColor.product, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  productColors: ProductColor[];

  @OneToMany(() => ProductSize, (productSize) => productSize.product, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  productSizes: ProductSize[];

  @OneToMany(() => Image, (image) => image.product, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  images: Image[];
}
