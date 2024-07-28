import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductSizeEntity } from './product-size.entity';

@Entity({
  name: 'size',
})
export class SizeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sizeName: string;

  @OneToMany(() => ProductSizeEntity, (productSize) => productSize.size)
  productSizes: ProductSizeEntity[];
}
