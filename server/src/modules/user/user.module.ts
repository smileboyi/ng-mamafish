import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserInfo } from './user-info.entity';
import { UserWithRole } from './user-with-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserInfo, UserWithRole])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
