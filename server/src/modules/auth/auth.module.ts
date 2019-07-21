import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { UserRole } from './../user/user-role.entity';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([UserRole])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
