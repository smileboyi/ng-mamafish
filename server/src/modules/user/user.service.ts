import {
  Injectable,
  BadGatewayException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';

import { UserInfo } from './user-info.entity';
import { UserWithRole } from './user-with-role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserInfo)
    private readonly userinfoRepository: Repository<UserInfo>,
    @InjectRepository(UserWithRole)
    private readonly userWithRoleRepository: Repository<UserWithRole>,
  ) {}

  async createOrUpdate(user: UserInfo) {
    try {
      return await this.userinfoRepository.save(user);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async findByEmail(email: string): Promise<UserInfo> {
    try {
      return await this.userinfoRepository.findOne({ email });
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async findByUserName(username: string): Promise<UserInfo> {
    try {
      return await this.userinfoRepository.findOne({ username });
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async findByCondition(condition: Partial<UserInfo>): Promise<UserInfo> {
    try {
      return await this.userinfoRepository.findOne(condition);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async comparePassword(password: string, user: UserInfo): Promise<boolean> {
    try {
      const hashPassword = bcrypt.hashSync(password, user.salt);
      return hashPassword === user.password;
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async setUserRole(userId: number, roleId: number): Promise<any> {
    try {
      return await this.userWithRoleRepository.save(
        new UserWithRole({
          userRole: roleId,
          userInfo: userId,
        }),
      );
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}
