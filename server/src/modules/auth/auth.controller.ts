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
  BadGatewayException,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import * as crypto from 'crypto';
import * as path from 'path';
import * as fs from 'fs';

import { HttpResultResponse } from '@beans/response.bean';
import { AuthService } from './auth.service';
import { CreateUserDto } from './create-user.dto';
import { LoginInfo } from './auth.interface';
import { UserInfo } from './../user/user-info.entity';
import { JWT_EXPIRES } from '@configs/app.config';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  // 编译或者打包需要把pem文件复制到dist文件夹下面去
  // 这里使用openssl生成的pem文件，也可以使用node-rsa生成公钥密钥
  publicKey = fs.readFileSync(
    path.join(__dirname, '/rsa_public_key.pem'),
    'utf-8',
  );

  privateKey = fs.readFileSync(
    path.join(__dirname, '/rsa_private_key.pem'),
    'utf-8',
  );

  constructor(private readonly authService: AuthService) {}

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
}
