import { Exclude, Expose } from 'class-transformer';
import { Role } from 'src/roles/domain/role';
import { Status } from 'src/statuses/domain/status';

export class User {
  id: number;

  @Expose({ groups: ['me', 'admin'] })
  email: string;

  @Exclude({ toPlainOnly: true })
  password: string;

  @Exclude({ toPlainOnly: true })
  previousPasswords: string;

  @Expose({ groups: ['me', 'admin'] })
  provider: string;

  @Expose({ groups: ['me', 'admin'] })
  socialId?: string | null;

  firstName: string | null;

  lastName: string | null;

  photo?: string | null;

  role?: Role | null;

  status?: Status;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date;
}
