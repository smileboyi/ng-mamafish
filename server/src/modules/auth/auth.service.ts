import {
  Injectable,
  BadGatewayException,
  HttpStatus,
  HttpException,
  Inject,
} from '@nestjs/common';
import { validate } from 'class-validator';

import { UserService } from '../user/user.service';
import { UserInfo } from './../user/user-info.entity';
import { CreateUserDto } from './create-user.dto';
import { LoginInfo } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @Inject('REDIS_CACHE_MANAGER') private readonly redisCacheManager: object,
  ) {}

  async login(loginInfo: LoginInfo): Promise<any> {
    try {
      const user = await this.userService.findByUserName(loginInfo.username);
      if (!user) {
        throw new HttpException(
          { message: `User ${loginInfo.username} not registered` },
          HttpStatus.BAD_REQUEST,
        );
      }

      if (!this.userService.comparePassword(loginInfo.password, user)) {
        throw new HttpException(
          { message: 'Incorrect username or password' },
          HttpStatus.BAD_REQUEST,
        );
      }

      user.signInCount = user.signInCount + 1;
      user.lastSignInAt = loginInfo.signInAt;
      user.lastSignInIp = loginInfo.signInIp;
      return await this.userService.createOrUpdate(user);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async register(createUserDto: CreateUserDto): Promise<any> {
    try {
      const { username, email } = createUserDto;

      let user1: UserInfo;
      let user2: UserInfo;
      if (email) {
        user1 = await this.userService.findByEmail(email);
      }
      if (username) {
        user2 = await this.userService.findByUserName(username);
      }

      if (user1 || user2) {
        throw new HttpException(
          { message: 'Username or email has been registered' },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        const newUser = new UserInfo(createUserDto);
        const validateErrors = await validate(newUser);
        if (validateErrors.length > 0) {
          throw new HttpException(
            { message: 'Input data validation failed' },
            HttpStatus.BAD_REQUEST,
          );
        }
        return await this.userService.createOrUpdate(newUser);
      }
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}
