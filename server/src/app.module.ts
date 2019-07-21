import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { mysqlConfig, redisConfig } from '@configs/db.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(mysqlConfig),
    CacheModule.register(redisConfig),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
