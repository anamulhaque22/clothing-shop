import { Transform } from 'class-transformer';

export class Product {
  id: number;
  title: string;
  description: string;

  @Transform(({ value }) => {
    return parseFloat(value);
  })
  buyPrice: number;

  @Transform(({ value }) => parseFloat(value))
  sellPrice: number;

  quantity: number;

  @Transform(({ value }) => parseFloat(value))
  discount: number;

  //   @Type(() => SizeDto)
  //   @ValidateNested({ each: true })
  //   sizes: SizeDto[];

  //   @IsArray()
  //   @Type(() => ImageDto)
  //   @ValidateNested({ each: true })
  //   images: ImageDto[];

  //   @IsArray()
  //   @Type(() => ProductInfoDto)
  //   @ValidateNested({ each: true })
  //   productInfo: ProductInfoDto[];
}
