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

import { UserService } from './user.service';
import { UserInfo } from './user-info.entity';

@ApiUseTags('user')
@Controller('user')
export class UserController {
  regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

  constructor(private readonly userService: UserService) {}

  @Get()
  async findone(@Res() res, @Query() query): Promise<any> {
    const { id, username, email } = query;
    const condition: {
      id?: number;
      email?: string;
      username?: string;
    } = {};
    let canFind = 0;
    if (id && !isNaN(+id)) {
      condition.id = (+id).toFixed(0) as any;
      canFind += 1;
    }
    if (email && this.regEmail.test(email)) {
      condition.email = email;
      canFind += 1;
    }
    const name = String(username);
    if (username && name && name.length >= 2 && name.length <= 15) {
      condition.username = name;
      canFind += 1;
    }
    if (canFind) {
      const user: UserInfo = await this.userService.findByCondition(condition);
      if (user) {
        res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          data: {
            user: {
              id: user.id,
              username: user.username,
              avatar: user.avatar,
              email: user.email,
            },
          },
          message: 'Find successful',
        });
      } else {
        res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          data: {
            user: null,
          },
          message: 'Not found',
        });
      }
    } else {
      res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.BAD_REQUEST,
        data: null,
        message: 'Condition validation failed',
      });
    }
  }

  @Post('layout-config')
  async saveLayoutConfig(
    @Res() res,
    @Body('username') username,
    @Body('layoutConfig') layoutConfig,
  ): Promise<any> {
    const result = await this.userService.saveLayoutConfig(username, layoutConfig);
    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: null,
      message: 'Update successful',
    });
  }
}
