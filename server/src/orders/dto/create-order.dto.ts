import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from 'src/addresses/dto/create-address.dto';

class Color {
  @IsNumber()
  id: number;
}

class Size {
  @IsNumber()
  id: number;
}

class OrderItemDto {
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsObject()
  @ValidateNested()
  @Type(() => Size)
  size: Size;

  @IsObject()
  @ValidateNested()
  @Type(() => Color)
  color: Color;
}

export class CreateOrderDto {
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  orderItems: OrderItemDto[];

  @IsOptional()
  @IsNumber()
  billingAddressId?: number | null;

  @ValidateIf((o) => !o.billingAddressId)
  @ValidateNested()
  @Type(() => CreateAddressDto)
  @IsNotEmpty({ message: 'Billing address is required' })
  billingAddress?: CreateAddressDto | null;

  @IsOptional()
  @IsNumber()
  shippingAddressId?: number | null;

  @ValidateIf(
    (o) => !o.shippingAddressId && !o.billingAddress && !o.billingAddressId,
  )
  @ValidateNested()
  @Type(() => CreateAddressDto)
  @IsNotEmpty({ message: 'Shipping address is required' })
  shippingAddress?: CreateAddressDto | null;
}
