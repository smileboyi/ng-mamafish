import {
  Injectable,
  HttpStatus,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { MailerService } from '@services/mailer/mailer.service';
import { UserInfo } from './../user/user-info.entity';
import { UserRole } from './../user/user-role.entity';
import { UserPermission } from './../user/user-permission.entity';
import { UserWithRole } from './../user/user-with-role.entity';
import { JWT_EXPIRES } from '@configs/app.config';
import { CreateUserDto } from './create-user.dto';
import { LoginInfo, JwtToken, JwtPayload } from './auth.interface';
import { redisClient } from '@services/redis-store/redis-store.service';

@Injectable()
export class AuthService {
  // 角色为User的UserRole id
  roleUserId: number;
  regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly mailerService: MailerService,
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
    @InjectRepository(UserWithRole)
    private readonly userWithRoleRepository: Repository<UserWithRole>,
    @InjectRepository(UserPermission)
    private readonly userPermissionRepository: Repository<UserPermission>,
  ) {
    this.getRoleUserId();
  }

  private async getRoleUserId(): Promise<any> {
    const role: UserRole = await this.userRoleRepository.findOne({
      role: 'User',
    });
    this.roleUserId = role.id;
  }

  private async getRole(uid: any): Promise<UserRole> {
    const userWithRole: UserWithRole = await this.userWithRoleRepository.findOne(
      {
        userInfo: uid,
      },
      {
        relations: ['userRole'],
      },
    );
    return userWithRole.userRole;
  }

  private async getPermissions(rid: any): Promise<string[]> {
    // 如果有临时权限,可以将临时权限存在mongodb里
    const userPermissions: UserPermission[] = await this.userPermissionRepository.find(
      {
        userRole: rid,
      },
    );
    const permissions = userPermissions.map(item => item.permission);
    return permissions;
  }

 async validateUser({
    username,
    email,
    password,
  }: CreateUserDto): Promise<UserInfo> {
    if (!(username || email)) {
      throw new BadRequestException('Input data validation failed');
    }
    let user;
    if (username) {
      user = await this.userService.findByUserName(username);
    } else {
      user = await this.userService.findByEmail(email);
    }
    if (!user) {
      throw new HttpException(
        { message: `User ${username || email} not registered` },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!(await this.userService.comparePassword(password, user))) {
      throw new HttpException(
        { message: `Invalid ${username ? 'username' : 'email'} or password` },
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }

   async sendVerificationMail(
    to,
    type,
    captcha,
    account,
  ): Promise<any> {
    return await this.mailerService.sendVerificationMail(
      to,
      type,
      captcha,
      account,
    );
  }

  async createToken(signedUser: Partial<UserInfo>): Promise<JwtToken> {
    const user: JwtPayload = {
      sub: signedUser.id,
      username: signedUser.username,
    };
    return {
      expiresIn: JWT_EXPIRES,
      accessToken: await this.jwtService.sign(user),
    };
  }

  async login(loginInfo: LoginInfo): Promise<any> {
    let user: UserInfo;
    if (this.regEmail.test(loginInfo.account)) {
      user = await this.validateUser({
        email: loginInfo.account,
        password: loginInfo.password,
      });
    } else {
      user = await this.validateUser({
        username: loginInfo.account,
        password: loginInfo.password,
      });
    }

    user.signInCount = user.signInCount + 1;
    user.lastSignInIp = loginInfo.signInIp;
    await this.userService.createOrUpdate(user);
    const token: JwtToken = await this.createToken({
      id: user.id,
      username: user.username,
    });
    delete user.salt;
    delete user.password;
    const userRole: UserRole = await this.getRole(user.id);
    const permissionList = await this.getPermissions(userRole.id);
    return {
      token,
      userInfo: user,
      userRole,
      permissionList,
    };
  }

  async register(createUserDto: CreateUserDto): Promise<UserInfo> {
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
        { message: 'Username or email had been registered' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser = new UserInfo(createUserDto);
    const validateErrors = await validate(newUser);
    if (validateErrors.length > 0) {
      // 这里可以把validateErrors的错误信息提取出来传给前端
      throw new BadRequestException('Input data validation failed');
    }

    const dbUser: UserInfo = await this.userService.createOrUpdate(newUser);
    this.userService.setUserRole(dbUser.id, this.roleUserId);
    return dbUser;
  }
}
