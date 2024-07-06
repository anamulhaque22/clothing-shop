import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ColorSizeQuantity } from './color-size-quantity.entity';
import { ProductSize } from './product-size.entity';

@Entity()
export class Size {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sizeName: string;

  @OneToMany(() => ProductSize, (productSize) => productSize.size)
  productSizes: ProductSize[];

  @OneToMany(
    () => ColorSizeQuantity,
    (colorSizeQuantity) => colorSizeQuantity.size,
  )
  colorSizeQuantities: ColorSizeQuantity[];
}
