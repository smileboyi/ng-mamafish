import { CacheModule, Module, HttpModule } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/user/user.module';
import { LoggerModule } from './modules/logger/logger.module';
import { mysqlConfig, redisConfig } from '@configs/db.config';
import { LoggerInterceptor } from '@interceptors/logger.interceptor';
import { HttpExceptionFilter } from '@filters/http-exception-filter.filter';

@Module({
  imports: [
    TypeOrmModule.forRoot(mysqlConfig),
    CacheModule.register(redisConfig),
    LoggerModule.forRoot(),
    HttpModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
