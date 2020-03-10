import { Controller, Get, Headers, BadGatewayException } from '@nestjs/common';
import { id } from 'cls-rtracer';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  getTest(@Headers() header): string {
    // console.log(id())
    throw new BadGatewayException('error test');
  }
}
