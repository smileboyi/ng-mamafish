import { CacheModule, Module, HttpModule } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';

import {
  mysqlConfig,
  redisConfig,
  mongooseUrl,
  mongooseConfig,
} from '@configs/db.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/user/user.module';
import { LoggerModule } from './modules/logger/logger.module';
import { CommonModule } from './modules/common/common.module';
import { LoggerInterceptor } from '@interceptors/logger.interceptor';
import { HttpExceptionFilter } from '@filters/http-exception-filter.filter';

@Module({
  imports: [
    TypeOrmModule.forRoot(mysqlConfig),
    CacheModule.register(redisConfig),
    MongooseModule.forRoot(mongooseUrl, mongooseConfig),
    LoggerModule.forRoot(),
    HttpModule,
    AuthModule,
    UserModule,
    CommonModule,
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
