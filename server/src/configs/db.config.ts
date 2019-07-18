import * as redisStore from 'cache-manager-redis-store';
import { ConnectionOptions } from 'typeorm';
import { join } from 'path';

import { UserPermission } from '../modules/user/user-permission.entity';
import { UserRole } from '../modules/user/user-role.entity';
import { UserInfo } from '../modules/user/user-info.entity';
import { UserWithRole } from '../modules/user/user-with-role.entity';

export const mysqlConfig: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'mamafish',
  charset: 'utf8',
  // entities: [join(__dirname, '**/**.entity{.ts,.js}')],
  entities: [UserPermission, UserRole, UserInfo, UserWithRole],

  // We are using migrations, synchronize should be set to false.
  synchronize: true,

  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: false,
  logging: true,
  logger: 'file',

  // Allow both start:prod and start:dev to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev.
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    // Location of migration should be inside src folder
    // to be compiled into dist/ folder.
    migrationsDir: 'src/migrations',
  },
};

export const redisConfig = {
  store: redisStore,
  host: 'localhost',
  port: 6379,
  auth_pass: '123456',
  ttl: 20, // seconds
  max: 15, // maximum number of items in cache
};
