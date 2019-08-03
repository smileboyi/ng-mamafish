import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UserInfo } from './../user/user-info.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super({
      passReqToCallback: false,
      session: false,
    });
  }

  async validate(username: string, password: string): Promise<UserInfo> {
    try {
      return await this.authService.validateUser({ username, password });
    } catch (err) {
      throw new UnauthorizedException('Invalid username or password');
    }
  }
}
