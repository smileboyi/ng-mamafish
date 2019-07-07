import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Headers,
  Req,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserInfo } from './../user/user-info.entity';

@Controller('auth')
export class AuthController {
  // constructor(private authService: AuthService) {}

  @Get()
  testAuth() {
    return 'auth page';
  }

}
