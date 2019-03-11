import Mock from 'mockjs';

import { Message, File, Schedule, UserInfo, PersonInfo } from '@declare';

export const messages: Array<Message> = [
  {
    name: 'ashley',
    avatar: '//zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    text:
      'After you get up and running, you can place Font Awesome icons just about...',
    time: '1 min ago'
  },
  {
    name: 'michael',
    avatar: '//zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    text:
      'You asked, Font Awesome dPelivers with 40 shiny new icons in version 4.2.',
    time: '2 hrs ago'
  },
  {
    name: 'julia',
    avatar: '//zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    text: 'Want to request new icons? Need vectors or want to use on the...',
    time: '10 hrs ago'
  },
  {
    name: 'bruno',
    avatar: '//zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    text:
      'Explore your passions and discover new ones by getting involved. Stretch your...',
    time: '1 day ago'
  },
  {
    name: 'tereza',
    avatar: '//zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    text:
      'Get to know who we are - from the inside out. From our history and culture, to the...',
    time: '1 day ago'
  },
  {
    name: 'adam',
    avatar: '//zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    text:
      'Need some support to reach your goals? Apply for scholarships across...',
    time: '2 days ago'
  }
];

// 颜色可以单独配置成变量
export const files: Array<File> = [
  {
    name: 'annular.zip',
    size: '~6.2 MB',
    value: '47',
    color: '#303f9f'
  },
  {
    name: 'documentation.pdf',
    size: '~14.6 MB',
    value: '33',
    color: '#f53d7c'
  },
  {
    name: 'wallpaper.jpg',
    size: '~558 KB',
    value: '60',
    color: '#f44336'
  },
  {
    name: 'letter.doc',
    size: '~57 KB',
    value: '80',
    color: '#2e3d99'
  },
  {
    name: 'azimuth.zip',
    size: '~10.2 MB',
    value: '55',
    color: '#f44336'
  },
  {
    name: 'contacts.xlsx',
    size: '~96 KB',
    value: '75',
    color: '#f53d7c'
  }
];

export const schedules: Array<Schedule> = [
  {
    day: '09',
    month: 'May',
    title: 'Meeting with Bruno',
    text:
      'Fusce ut condimentum velit, quis egestas eros. Quisque sed condimentum neque.',
    bgColor: '#ff6ec4'
  },
  {
    day: '15',
    month: 'May',
    title: 'Training course',
    text:
      'Fusce arcu tortor, tempor aliquam augue vel, consectetur vehicula lectus.',
    bgColor: '#2ec6ff'
  },
  {
    day: '12',
    month: 'June',
    title: 'Dinner with Ashley',
    text: 'Curabitur rhoncus facilisis augue sed fringilla.',
    bgColor: '#a9dc7b'
  },
  {
    day: '14',
    month: 'June',
    title: 'Sport time',
    text: 'Vivamus tristique enim eros, ac ultricies sem ultrices vitae.',
    bgColor: '#ff9e80'
  },
  {
    day: '29',
    month: 'July',
    title: 'Birthday of Julia',
    text: 'Nam porttitor justo nec elit efficitur vestibulum.',
    bgColor: '#ffd86f'
  }
];

export const userInfos: Array<UserInfo> = [
  {
    name: 'visitor',
    token: '111aaa222bbb333ccc'
  },
  {
    name: 'smileboyi',
    token: '111222333aaabbbccc'
  },
  {
    name: 'admin',
    token: 'aaabbbccc111222333'
  }
];

export const userPermissions: Array<Array<string>> = [
  ['Full'],
  ['User'],
  ['Manager', 'exportDataToExcel']
];

const _personInfos: Array<PersonInfo> = [];
for (let i = 1; i <= 100; i++) {
  _personInfos.push(
    Mock.mock({
      no: i,
      name: Mock.Random.name(),
      'weight|45-80.2': 1,
      'sex|1': ['man', 'woman'],
      'symbol|1': ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    })
  );
}
export const personInfos: Array<PersonInfo> = _personInfos;
