import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ProductColor } from './product-color.entity';
import { Size } from './size.entity';

@Entity()
export class ColorSizeQuantity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => ProductColor,
    (productColor) => productColor.colorSizeQuantities,
  )
  productColor: ProductColor;

  @ManyToOne(() => Size, (size) => size.colorSizeQuantities)
  size: Size;

  @Column()
  quantity: number;
}
