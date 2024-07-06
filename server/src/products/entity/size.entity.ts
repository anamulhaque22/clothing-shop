import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductSize } from './product-size.entity';

@Entity()
export class Size {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sizeName: string;

  @OneToMany(() => ProductSize, (productSize) => productSize.size)
  productSizes: ProductSize[];
}
