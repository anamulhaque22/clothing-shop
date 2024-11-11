import { AddressType } from 'src/addresses/address-type.enum';
import { UserEntity } from 'src/users/infrastructure/entities/user.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'addresses',
})
export class AddressEntity extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  streetAddress: string;

  @Column({ nullable: true })
  aptSuiteUnit: string;

  @Column()
  city: string;

  @Column()
  phone: string;

  @Column({
    type: 'enum',
    enum: AddressType,
    default: AddressType.HOME,
  })
  addressType: AddressType;

  @ManyToOne(() => UserEntity, (user) => user.addresses, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @Column({ default: false })
  isDefaultShipping: boolean;

  @Column({ default: false })
  isDefaultBilling: boolean;

  @Column({ default: false })
  isOrderAddress: boolean;

  @DeleteDateColumn()
  deletedAt: Date;
}
