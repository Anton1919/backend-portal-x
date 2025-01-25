import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [],
  providers: [UserResolver, UserService],
})
export class UserModule {}
