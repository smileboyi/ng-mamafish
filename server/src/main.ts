import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as rateLimit from 'express-rate-limit';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import 'reflect-metadata';

declare const module: any;

// 监听unhandledRejection错误
process.on('unhandledRejection', (reason, p) => {
  // tslint:disable-next-line: no-console
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');

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

  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
