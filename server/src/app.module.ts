import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import * as cacheManager from 'cache-manager';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { mysqlConfig, redisConfig } from '@configs/db.config';

const redisCache = cacheManager.caching(redisConfig);

@Module({
  imports: [
    TypeOrmModule.forRoot(mysqlConfig),
    CacheModule.register(redisConfig),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'REDIS_CACHE_MANAGER',
      useValue: redisCache,
    },
  ],
})
export class AppModule {}
