import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { RoleDto } from 'src/roles/dto/role.dto';
import { User } from '../domain/user';

export class FilterUserDto {
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => RoleDto)
  roles?: RoleDto[] | null;
}

export class SortUserDto {
  @Type(() => String)
  @IsString()
  orderBy: keyof User;

  @IsString()
  order: string;
}
