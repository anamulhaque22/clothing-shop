import { Module } from '@nestjs/common';

import { UserPersistenceModule } from './infrastructure/user-persistence.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [UserPersistenceModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
