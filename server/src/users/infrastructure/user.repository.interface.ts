import { User, UserImage } from 'src/users/domain/user';
import { NullableType } from 'src/utils/types/nullable.type';
import { DeepPartial } from 'typeorm';
import { UserImageEntity } from './entities/user-image.entity';

export interface IUserRepository {
  create(
    data: Omit<User, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
  ): Promise<User>;

  // findManyWithPagination({
  //   filterOptions,
  //   sortOptions,
  //   paginationOptions,
  // }: {
  //   filterOptions: FilterUserDto | null;
  //   sortOptions: SortUserDto;
  //   paginationOptions: IPaginationOptions;
  // }): Promise<User[]>;

  findById(id: User['id']): Promise<NullableType<User>>;

  findByEmail(email: User['email']): Promise<NullableType<User>>;

  findBySocialIdAndProvider({
    socialId,
    provider,
  }: {
    socialId: User['socialId'];
    provider: User['provider'];
  }): Promise<NullableType<User>>;

  update(id: User['id'], payload: DeepPartial<User>): Promise<User | null>;
  remove(id: User['id']): Promise<void>;

  uploadUserImage(data: Omit<UserImage, 'id'>): Promise<UserImage>;
  removeUserImage(id: UserImage['id']): Promise<UserImageEntity['publicId']>;
}
export const USERS_REPOSITORY_TOKEN = 'users-repository-token';
