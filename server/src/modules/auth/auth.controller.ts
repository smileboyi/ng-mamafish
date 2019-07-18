import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Headers,
  Req,
  BadGatewayException,
  HttpCode,
  Res,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDto } from './create-user.dto';
import { LoginInfo } from './auth.interface';
import { UserInfo } from './../user/user-info.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Req() req: Request, @Body() loginInfo: LoginInfo) {
    this.authService.login(loginInfo);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    this.authService.register(createUserDto);
  }
}
