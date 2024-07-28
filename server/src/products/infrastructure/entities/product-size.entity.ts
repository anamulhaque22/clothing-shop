import { EntityHelper } from 'src/utils/entity-helper';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';
import { SizeEntity } from './size.entity';

@Entity({
  name: 'product_size', // many to may relation maker table
})
export class ProductSizeEntity extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductEntity, (product) => product.productSizes, {
    onDelete: 'CASCADE',
  })
  product: ProductEntity;

  @ManyToOne(() => SizeEntity, (size) => size.productSizes)
  size: SizeEntity;
}
