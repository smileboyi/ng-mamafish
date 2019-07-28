import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtPayload } from './auth.interface';
import { JWT_SECRET } from '@configs/app.config';
import { UserInfo } from './../user/user-info.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: false,
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<UserInfo> {
    const user = await this.userService.findByUserName(payload.username);
    if (!user) {
      throw new UnauthorizedException('Unable to find given user');
    }
    return user;
  }
}
