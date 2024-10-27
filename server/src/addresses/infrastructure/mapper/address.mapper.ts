import { Address } from 'src/addresses/domain/address';
import { AddressEntity } from '../entities/address.entity';

export class AddressMapper {
  static toDomain(raw: AddressEntity): Address {
    const address = new Address();
    address.id = raw.id;
    address.firstName = raw.firstName;
    address.lastName = raw.lastName;
    address.streetAddress = raw.streetAddress;
    address.aptSuiteUnit = raw.aptSuiteUnit;
    address.city = raw.city;
    address.phone = raw.phone;
    return address;
  }

  static toPersistence(domain: Address): AddressEntity {
    const addressEntity = new AddressEntity();

    if (domain.id && typeof domain.id === 'number') {
      addressEntity.id = domain.id;
    }

    addressEntity.id = domain.id;
    addressEntity.firstName = domain.firstName;
    addressEntity.lastName = domain.lastName;
    addressEntity.streetAddress = domain.streetAddress;
    addressEntity.aptSuiteUnit = domain.aptSuiteUnit;
    addressEntity.city = domain.city;
    addressEntity.phone = domain.phone;
    return addressEntity;
  }
}
