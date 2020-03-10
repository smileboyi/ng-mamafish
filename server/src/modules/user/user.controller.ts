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
  BadRequestException,
  NotFoundException,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { HttpResultResponse } from '@declares/response.declare';
import { UserService } from './user.service';
import { UserInfo } from './user-info.entity';

@ApiUseTags('user')
@Controller('user')
export class UserController {
  regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

  constructor(private readonly userService: UserService) {}

  @Get()
  async findone(@Res() res, @Query() query): Promise<HttpResultResponse> {
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
    if (!canFind) {
      throw new BadRequestException('Condition validation failed');
    }

    try {
      const user: UserInfo = await this.userService.findByCondition(condition);
      if (!user) {
        throw new NotFoundException('Not found');
      }

      const response: HttpResultResponse = {
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

  @Put('layout-config')
  async saveLayoutConfig(
    @Res() res,
    @Body('username') username,
    @Body('layoutConfig') layoutConfig,
  ): Promise<HttpResultResponse> {
    try {
      const result: UserInfo = await this.userService.saveLayoutConfig(
        username,
        layoutConfig,
      );
      const response: HttpResultResponse = {
        statusCode: HttpStatus.OK,
        data: null,
        message: 'Update successful',
      };
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}
