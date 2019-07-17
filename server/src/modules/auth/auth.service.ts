import {
  Injectable,
  BadGatewayException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { validate } from 'class-validator';

import { UserService } from '../user/user.service';
import { UserInfo } from './../user/user-info.entity';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  // async login(){
  //   try{

  //   }  catch (error) {
  //     throw new BadGatewayException(error);
  //   }
  // }

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
        return await this.userService.create(newUser);
      }
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}
