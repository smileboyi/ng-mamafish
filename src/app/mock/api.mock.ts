import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Mock from 'mockjs';
import qs from 'qs';

import { messages, files, schedules } from './data.mock';

const mock: MockAdapter = new MockAdapter(axios);

export default {
  // 开启mock接口
  start(): void {
    mock.onGet('/mockapi/user/message').reply((config) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([
            200,
            {
              messages,
              files,
              schedules,
            },
          ]);
        }, 200);
      });
    });
  },
};
