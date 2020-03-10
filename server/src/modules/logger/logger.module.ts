import { Module, Provider, DynamicModule, Global } from '@nestjs/common';
import {
  utilities,
  WinstonModule,
  WINSTON_MODULE_PROVIDER,
  WINSTON_MODULE_NEST_PROVIDER,
} from 'nest-winston';
import { format, transports, config, Logger } from 'winston';
import { id } from 'cls-rtracer';

const { combine, timestamp, printf } = format;

// tslint:disable-next-line:no-shadowed-variable
const logFormat = printf(({ timestamp, level, message }) => {
  message = JSON.stringify(message || {});
  return `/${timestamp}/ <${id()}> [${level.toUpperCase()}] : ${message}`;
});

@Global()
@Module({
  imports: [WinstonModule],
})
export class LoggerModule {
  static forRoot(): DynamicModule {
    const module = WinstonModule.forRoot({
      level: 'verbose',
      levels: config.npm.levels,
      transports: [
        // 控制台
        new transports.Console({
          format: combine(timestamp(), utilities.format.nestLike()),
        }),
        // 持久化
        new transports.File({
          format: combine(timestamp(), logFormat),
          dirname: 'logs',
          filename: `mamafish-nest-${new Date().getFullYear()}-${new Date().getUTCMonth() +
            1}.log`,
          // 文件大小限制(b)
          maxsize: 50 * 1024 * 1024,
          maxFiles: 5,
        }),
      ],
    });
    const mamafish: Provider = {
      provide: 'mamafish',
      useFactory: (logger: Logger) => logger,
      // WINSTON_MODULE_PROVIDER被第二个依赖放前面
      inject: [WINSTON_MODULE_PROVIDER, WINSTON_MODULE_NEST_PROVIDER],
    };
    return {
      module: LoggerModule,
      providers: [...module.providers, mamafish],
      exports: [...module.providers, mamafish],
    };
  }
}
