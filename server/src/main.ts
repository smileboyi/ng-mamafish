import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as rateLimit from 'express-rate-limit';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import * as connectRedis from 'connect-redis';
import * as session from 'express-session';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import 'reflect-metadata';

import { redisClient } from '@services/redis-store/redis-store.service';
import { HttpExceptionFilter } from '@filters/http-exception-filter.filter';

declare const module: any;

// 监听unhandledRejection错误
process.on('unhandledRejection', (reason, p) => {
  // tslint:disable-next-line: no-console
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

const RedisStore = connectRedis(session);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');

  app.use(
    session({
      name: 'Mamafish',
      secret: 'mamafish',
      resave: false, // 只有session被修改时才保存
      saveUninitialized: false,
      store: new RedisStore({
        client: redisClient,
        prefix: 'rid:',
      }),
      cookie: {
        httpOnly: true, // readonly
        secure: false, // only https
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      },
    }),
  );

  app.use(helmet());
  app.use(cookieParser());
  // app.use(csurf({ cookie: true }));
  app.use(
    rateLimit({
      windowMs: 5 * 60 * 1000,
      max: 22,
    }),
  );
  app.use(compression());

  app.useGlobalFilters(new HttpExceptionFilter());

  const options = new DocumentBuilder()
    .setTitle('Mamafish Api Swagger')
    .setDescription('Mamafish backend server api')
    .setVersion('1.0.0')
    .setContactEmail('15215212143@163.com')
    .addBearerAuth('Authorization', 'header', 'apiKey')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-doc', app, document);

  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
