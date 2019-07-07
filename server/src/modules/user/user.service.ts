import { Injectable } from '@nestjs/common';

import { UserInfo } from './user-info.entity';

@Injectable()
export class UserService {
  create(user: UserInfo) {
    return user;
  }
}
