import { Injectable } from '@nestjs/common';
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

  async createOrUpdate(user: UserInfo): Promise<UserInfo> {
    return await this.userinfoRepository.save(user);
  }

  async findByEmail(email: string): Promise<UserInfo> {
    return await this.userinfoRepository.findOne({ email });
  }

  async findByUserName(username: string): Promise<UserInfo> {
    return await this.userinfoRepository.findOne({ username });
  }

  async findByCondition(condition: Partial<UserInfo>): Promise<UserInfo> {
    return await this.userinfoRepository.findOne(condition);
  }

  async comparePassword(password: string, user: UserInfo): Promise<boolean> {
    return bcrypt.compareSync(password, user.password);
  }

  async setUserRole(userId: number, roleId: number): Promise<UserWithRole> {
    return await this.userWithRoleRepository.save(
      new UserWithRole({
        userRole: roleId,
        userInfo: userId,
      }),
    );
  }

  async saveLayoutConfig(
    username: string,
    layoutConfig: string,
  ): Promise<UserInfo> {
    const user: UserInfo = await this.findByUserName(username);
    user.layoutConfig = layoutConfig;
    return await this.createOrUpdate(user);
  }
}
