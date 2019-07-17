import {
  Injectable,
  BadGatewayException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserInfo } from './user-info.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserInfo)
    private userinfoRepository: Repository<UserInfo>,
  ) {}

  async create(user: UserInfo) {
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
}
