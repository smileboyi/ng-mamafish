import { Injectable } from '@nestjs/common';
import { a } from '@filters/index';

@Injectable()
export class AppService {
  getHello(): string {
    return 'hello smileboyi!' + a;
  }
}
