import { Injectable } from '@nestjs/common';
import { NullableType } from 'src/utils/types/nullable.type';
import { Address } from './domain/address';
import { CreateAddressDto } from './dto/create-address.dto';
import { AddressRepository } from './infrastructure/address.repository';

@Injectable()
export class AddressesService {
  constructor(private addressRepo: AddressRepository) {}
  async create(
    payload: CreateAddressDto,
    userId?: number | null,
  ): Promise<Address> {
    return this.addressRepo.create({
      ...payload,
      id: userId,
    });
  }

  async findAll() {
    return this.addressRepo.findAll();
  }

  async findByUserId(userId: number): Promise<Address[]> {
    return this.addressRepo.findByUserId(userId);
  }

  async findOne(id: Address['id']): Promise<NullableType<Address>> {
    return this.addressRepo.findById(id);
  }

  async update(id: number, updateAddressDto): Promise<NullableType<Address>> {
    return this.addressRepo.update(id, updateAddressDto);
  }

  async remove(id: Address['id']): Promise<void> {
    return this.addressRepo.deleteById(id);
  }
}
