import * as cacheManager from 'cache-manager';
import * as bluebird from 'bluebird';
import { RedisClient } from 'redis';

import { redisConfig } from '@configs/db.config';

export const redisCache = cacheManager.caching(
  redisConfig as cacheManager.StoreConfig,
);
export const redisClient = (redisCache as any).store.getClient() as RedisClient;
bluebird.promisifyAll(redisClient);

redisClient.on('error', error => {
  // tslint:disable-next-line: no-console
  console.log(error);
});
