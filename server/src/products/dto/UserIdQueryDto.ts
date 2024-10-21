import { Transform } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class UserIdQueryDto {
  @IsInt()
  @IsPositive()
  @Transform(({ value }) => parseInt(value, 10))
  id: number;
}
