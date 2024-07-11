import { EntityHelper } from 'src/utils/entity-helper';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'user_image',
})
export class UserImage extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  image: string;
}
