import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Headers,
  Req,
  BadGatewayException,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDto } from './create-user.dto';

import { UserInfo } from './../user/user-info.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    this.authService.register(createUserDto);
  }
}
