import { Injectable, Inject } from '@nestjs/common';
import { Logger } from 'winston';

@Injectable()
export class AppService {
  constructor(@Inject('mamafish') private readonly logger: Logger) {
    // console.log(this.logger.error);
    // console.log(this.logger.warn);
    // console.log(this.logger.info);
    // console.log(this.logger.http);
    // console.log(this.logger.verbose);
    // console.log(this.logger.debug);
    // console.log(this.logger.silly);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
