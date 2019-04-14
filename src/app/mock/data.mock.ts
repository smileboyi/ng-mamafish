import Mock from 'mockjs';

import {
  Message,
  File,
  Schedule,
  UserInfo,
  PersonInfo,
  ChatUser,
  ChatTalk
} from '@declare';

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

export const chatUsers: Array<ChatUser> = [
  new ChatUser('assets/images/ashley.jpg', 'Ashley Ahlberg', 'Online'),
  new ChatUser('assets/images/bruno.jpg', 'Bruno Vespa', 'Do not disturb'),
  new ChatUser('assets/images/julia.jpg', 'Julia Aniston', 'Away'),
  new ChatUser('assets/images/adam.jpg', 'Adam Sandler', 'Online'),
  new ChatUser('assets/images/tereza.jpg', 'Tereza Stiles', 'Offline'),
  new ChatUser('assets/images/michael.jpg', 'Michael Blair', 'Online')
];

export const getChatTalks = (user: ChatUser): Array<ChatTalk> => {
  const date = new Date(),
    day = date.getDate(),
    month = date.getMonth(),
    year = date.getFullYear(),
    hour = date.getHours(),
    minute = date.getMinutes();
  return [
    new ChatTalk(
      user.avatar,
      user.author,
      'So, Emilio Verdines, you\'ve got a brother named Kirk!',
      new Date(year, month, day - 2, hour, minute + 9),
      false
    ),
    new ChatTalk(
      'assets/images/user.jpg',
      'Emilio Verdines',
      'Yes, that\'s right. He is two and a half years older than I am, and we get along very well now.',
      new Date(year, month, day - 2, hour, minute + 8),
      true
    ),
    new ChatTalk(
      user.avatar,
      user.author,
      'You get along very well now! How did you get along in the past?',
      new Date(year, month, day - 2, hour, minute + 7),
      false
    ),
    new ChatTalk(
      'assets/images/user.jpg',
      'Emilio Verdines',
      'Not very well at all actually. He was always very mean and heartless, should we say.',
      new Date(year, month, day - 2, hour, minute + 6),
      true
    ),
    new ChatTalk(
      user.avatar,
      user.author,
      'What was the first thing you remember him doing to you?',
      new Date(year, month, day - 2, hour, minute + 5),
      false
    ),
    new ChatTalk(
      'assets/images/user.jpg',
      'Emilio Verdines',
      'Perhaps the first thing was the time I fell asleep on the bus when I was on kindergarten.\
			He actually left me there sleeping, and I didn\'t wake up until my lunch box fell on the ground,\
			when the bus driver was parking1 in the bus garage. So anyway, yeah,\
			I learned2 at that point not to really depend on him so much.',
      new Date(year, month, day - 2, hour, minute + 4),
      true
    ),
    new ChatTalk(
      user.avatar,
      user.author,
      'What did your mum say when you got home?',
      new Date(year, month, day - 2, hour, minute + 3),
      false
    ),
    new ChatTalk(
      'assets/images/user.jpg',
      'Emilio Verdines',
      'My mom asked my brother,\'Hey! Aren\'t you forgetting something?\',\
			referring to me, and he responded3, \'Hey! How did you know I forgot my homework!\'',
      new Date(year, month, day - 2, hour, minute + 2),
      true
    )
  ];
};
