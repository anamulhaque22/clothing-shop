import { Product } from 'src/products/entity/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @ManyToOne(() => Category, (category) => category.children)
  @JoinColumn({ name: 'parentCategoryID' })
  parent: Category;

  children: Category[];
}
