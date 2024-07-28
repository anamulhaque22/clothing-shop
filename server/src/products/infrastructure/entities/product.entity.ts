import { Category } from 'src/categories/category.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { EntityHelper } from 'src/utils/entity-helper';
import { ProductColorEntity } from './product-color.entity';
import { ProductImageEntity } from './product-image.entity';
import { ProductSizeEntity } from './product-size.entity';

@Entity({
  name: 'product',
})
export class ProductEntity extends EntityHelper {
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

  @OneToMany(() => ProductColorEntity, (productColor) => productColor.product, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  productColors: ProductColorEntity[];

  @OneToMany(() => ProductSizeEntity, (productSize) => productSize.product, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  productSizes: ProductSizeEntity[];

  @OneToMany(() => ProductImageEntity, (image) => image.product, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  images: ProductImageEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
