// create-product.dto.ts
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ProductInfo } from './product-info.dto';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  buyPrice: number;

  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  sellPrice: number;

  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  categoryId: number;

  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  quantity: number;

  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  discount: number;

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
