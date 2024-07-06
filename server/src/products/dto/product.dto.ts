import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

class SizeDto {
  @IsNumber()
  id: number;

  @IsString()
  sizeName: string;
}

class ImageDto {
  @IsNumber()
  id: number;

  @IsString()
  imageUrl: string;
}

class ProductInfoDto {
  @IsString()
  colorName: string;

  @IsString()
  colorCode: string;

  @IsNumber()
  colorWiseQuantity: number;

  @IsObject()
  colorSizeWiseQuantity: { [key: string]: number };
}
export class ProductDto {
  @IsNumber()
  id: number;

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
  quantity: number;

  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  discount: number;

  @IsArray()
  @Type(() => SizeDto)
  @ValidateNested({ each: true })
  sizes: SizeDto[];

  @IsArray()
  @Type(() => ImageDto)
  @ValidateNested({ each: true })
  images: ImageDto[];

  @IsArray()
  @Type(() => ProductInfoDto)
  @ValidateNested({ each: true })
  productInfo: ProductInfoDto[];
}
