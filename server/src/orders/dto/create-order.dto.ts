import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from 'src/addresses/dto/create-address.dto';

class OrderItemDto {
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  @IsNotEmpty()
  quantity: number;
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
