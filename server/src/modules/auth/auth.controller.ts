import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Headers,
  Res,
  Req,
  BadGatewayException,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { CreateUserDto } from './create-user.dto';
import { LoginInfo } from './auth.interface';
import { UserInfo } from './../user/user-info.entity';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Req() req,
    @Body('username') username,
    @Body('password') password,
  ) {
    const loginInfo: LoginInfo = {
      username,
      password,
      signInIp: req.iq,
      signInAt: new Date(),
    };
    this.authService.login(loginInfo);
  }

  @Post('register')
  async register(
    @Res() res,
    @Body() createUserDto: CreateUserDto,
  ): Promise<any> {
    this.authService.register(createUserDto).then(user =>
      res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: null,
        message: 'Register successful',
      }),
    );
  }
}
