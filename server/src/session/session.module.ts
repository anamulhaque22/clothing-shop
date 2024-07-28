import { Module } from '@nestjs/common';
import { SessionTypeormModule } from './infrastructure/session.typeorm.module';

@Module({
  imports: [SessionTypeormModule],
  providers: [],
  exports: [SessionTypeormModule],
})
export class SessionModule {}
