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
import { join } from 'path';
import * as fs from 'fs';

import { AuthService } from './auth.service';
import { CreateUserDto } from './create-user.dto';
import { LoginInfo } from './auth.interface';
import { UserInfo } from './../user/user-info.entity';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  publicKey = fs.readFileSync(join(__dirname, '/rsa_public_key.pem'), 'utf-8');

  constructor(private readonly authService: AuthService) {}

  @Get('/rsapubkey')
  async rsaPubKey(@Res() res): Promise<any> {
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: { pubkey: this.publicKey },
      message: 'Rsa public key',
    });
  }

  @Post('login')
  async login(
    @Req() req,
    @Res() res,
    @Body('username') username,
    @Body('password') password,
  ): Promise<any> {
    const signInIp = req.ip;
    const loginInfo: LoginInfo = {
      username,
      password,
      signInIp,
    };
    this.authService.login(loginInfo).then((token: string) =>
      res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: { token },
        message: 'Login successful',
      }),
    );
  }

  @Post('register')
  async register(
    @Res() res,
    @Body() createUserDto: CreateUserDto,
  ): Promise<any> {
    this.authService.register(createUserDto).then((user: UserInfo) =>
      res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: null,
        message: 'Register successful',
      }),
    );
  }
}
