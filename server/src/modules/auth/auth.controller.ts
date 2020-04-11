import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  UseGuards,
  Headers,
  Res,
  Req,
  Session,
  BadGatewayException,
  HttpCode,
  HttpStatus,
  Query,
  Inject,
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { Logger } from 'winston';
import * as uuid from 'uuid/v4';
import * as crypto from 'crypto';
import * as path from 'path';
import * as fs from 'fs';

import { redisClient } from '@services/redis-store/redis-store.service';
import { HttpResultResponse } from '@declares/response.declare';
import { AuthService } from './auth.service';
import { CreateUserDto } from './create-user.dto';
import { LoginInfo } from './auth.interface';
import { UserInfo } from './../user/user-info.entity';
import { JWT_EXPIRES } from '@configs/app.config';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  // 这里使用openssl生成的pem文件，也可以使用node-rsa生成公钥密钥
  publicKey: string;
  privateKey: string;

  constructor(
    @Inject('mamafish') private readonly logger: Logger,
    private readonly authService: AuthService,
  ) {
    try {
      this.publicKey = fs.readFileSync(
        path.join(__dirname, '/rsa_public_key.pem'),
        'utf-8',
      );
      this.privateKey = fs.readFileSync(
        path.join(__dirname, '/rsa_private_key.pem'),
        'utf-8',
      );
    } catch {
      this.logger.error({
        message: 'errror in init ras_xx_key.pem',
      });
    }
  }

  decryptHash(hash: string): string {
    const decrypt = crypto.privateDecrypt(
      {
        key: this.privateKey,
        padding: (crypto as any).constants.RSA_PKCS1_PADDING,
      },
      new Buffer(hash.replace(/\s+/g, '+'), 'base64'),
    );
    return decrypt.toString('utf-8');
  }

  @Get('rsapubkey')
  async rsaPubKey(@Res() res): Promise<HttpResultResponse> {
    try {
      const response: HttpResultResponse = {
        statusCode: HttpStatus.OK,
        data: { pubkey: this.publicKey },
        message: 'Rsa public key',
      };
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  @Post('login')
  async login(
    @Req() req,
    @Res() res,
    @Body('account') account,
    @Body('password') password,
  ): Promise<HttpResultResponse> {
    try {
      const signInIp = req.ip;

      const loginInfo: LoginInfo = {
        account,
        password: this.decryptHash(password),
        signInIp,
      };
      const result: any = await this.authService.login(loginInfo);
      // 用于日志等服务
      req.session.account = account;
      req.session.email = result.userInfo.email;
      // userRole和permissionList用于接口鉴权
      res.cookie('userRole', result.userRole, {
        maxAge: JWT_EXPIRES,
        httpOnly: true,
      });
      res.cookie('permissionList', result.permissionList, {
        maxAge: JWT_EXPIRES,
        httpOnly: true,
      });
      const response: HttpResultResponse = {
        statusCode: HttpStatus.OK,
        data: result,
        message: 'Login successful',
      };
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      if (error.status) {
        throw error;
      } else {
        throw new BadGatewayException(error);
      }
    }
  }

  @Post('register')
  async register(
    @Res() res,
    @Body() createUserDto: CreateUserDto,
  ): Promise<HttpResultResponse> {
    try {
      const dto = {
        ...createUserDto,
        password: this.decryptHash(createUserDto.password),
      };
      const result: UserInfo = await this.authService.register(dto);
      const response: HttpResultResponse = {
        statusCode: HttpStatus.OK,
        data: null,
        message: 'Register successful',
      };
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      if (error.status) {
        throw error;
      } else {
        throw new BadGatewayException(error);
      }
    }
  }

  @Post('validate-mail')
  async sendMail(
    @Req() req,
    @Res() res,
    @Query('type') type,
  ): Promise<HttpResultResponse> {
    try {
      const account: string = req.session.account;
      if (!account) {
        throw new BadGatewayException('You need to sign in');
      }
      const to: string = req.session.email;
      if (!to) {
        throw new BadGatewayException('Mail has not been set');
      }
      let captchaToken = req.session.captchaToken;
      if (!captchaToken) {
        captchaToken = uuid();
        req.session.captchaToken = captchaToken;
      }
      const captcha = Math.trunc(Math.random() * 1000000);
      // session和redis通过xxToken联系，临时的数据建立在会话基础上
      redisClient.set(captchaToken, captcha, 'EX', 60 * 30); // 30min
      const infos = await this.authService.sendVerificationMail(
        to,
        type,
        captcha,
        account,
      );
      this.logger.info(infos);
      const response: HttpResultResponse = {
        statusCode: HttpStatus.OK,
        data: null,
        message: 'Mail has been sent',
      };
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      if (error.status) {
        throw error;
      } else {
        throw new BadGatewayException(error);
      }
    }
  }
}
