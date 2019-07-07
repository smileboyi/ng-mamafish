import { Injectable } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { UserInfo } from './../user/user-info.entity';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async register(user: UserInfo): Promise<any> {
    return await this.userService.create(user);
  }
}
