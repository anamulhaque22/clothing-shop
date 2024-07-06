import { Transform } from 'class-transformer';
import { IsNumber, IsObject, IsString } from 'class-validator';

export class ProductInfo {
  @IsString()
  imageUrl: string;

  @IsString()
  color: string;

  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  colorWiseQuantity: number;

  @IsObject()
  @Transform(({ value }) => {
    console.log('Transforming colorSizeWiseQuantity:', { value });
    if (typeof value === 'string') {
      value = JSON.parse(value);
    }
    if (typeof value === 'object') {
      for (const key in value) {
        if (value.hasOwnProperty(key)) {
          value[key] = parseInt(value[key], 10);
        }
      }
    }
    return value;
  })
  colorSizeWiseQuantity: { [key: string]: number };

  @IsString()
  colorName: string;
}
