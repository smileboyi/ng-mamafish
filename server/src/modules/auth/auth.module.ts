import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { MailerService } from '@services/mailer/mailer.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { UserRole } from './../user/user-role.entity';
import { UserWithRole } from './../user/user-with-role.entity';
import { UserPermission } from './../user/user-permission.entity';
import { JWT_SECRET, JWT_EXPIRES } from '@configs/app.config';

@Module({
  imports: [
    UserModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      // 为了后台jwt可失效,最好每个用户拥有自己的一个secret,在用户退出登录和修改密码等操作时, 后台secret设置为空字符串
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRES },
    }),
    TypeOrmModule.forFeature([UserRole, UserWithRole, UserPermission]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, MailerService],
})
export class AuthModule {}
