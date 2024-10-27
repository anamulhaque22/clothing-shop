import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Roles } from 'src/roles/roles.decorators';
import { RoleEnum } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import { NullableType } from 'src/utils/types/nullable.type';
import { AddressesService } from './addresses.service';
import { Address } from './domain/address';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Roles(RoleEnum.user, RoleEnum.admin)
@UseGuards(AuthGuard, RolesGuard)
@Controller({
  path: '/addresses',
  version: '1',
})
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  async create(
    @Body() data: CreateAddressDto,
    @Request() request,
  ): Promise<Address> {
    return this.addressesService.create(data, request.user.id);
  }

  @Get()
  async findAll(): Promise<Address[]> {
    return this.addressesService.findAll();
  }

  @Get('user/address')
  async findByUserId(@Request() request): Promise<Address[]> {
    return this.addressesService.findByUserId(request.user.id);
  }

  @Get(':id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: () => new UnprocessableEntityException(),
      }),
    )
    id: Address['id'],
  ): Promise<NullableType<Address>> {
    return this.addressesService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: Address['id'],
    @Body() data: UpdateAddressDto,
  ): Promise<Address> {
    return this.addressesService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: Address['id']): Promise<void> {
    return this.addressesService.remove(id);
  }
}
