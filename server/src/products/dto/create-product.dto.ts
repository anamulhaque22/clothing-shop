// create-product.dto.ts
import { OmitType } from '@nestjs/mapped-types';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ProductInfo } from './product-info.dto';
import { ProductDto } from './product.dto';

export class CreateProductDto extends OmitType(ProductDto, [
  'id',
  'sizes',
  'productInfo',
] as const) {
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  categoryId: number;

  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) =>
    typeof value === 'string' ? JSON.parse(value) : value,
  )
  sizes: string[];

  @IsEnum(['Hidden', 'Visible'])
  visibility: 'Hidden' | 'Visible';

  @IsArray()
  @Type(() => ProductInfo)
  @ValidateNested({ each: true })
  @Transform(({ value }) =>
    typeof value === 'string' ? JSON.parse(value) : value,
  )
  productInfo: ProductInfo[];
}
