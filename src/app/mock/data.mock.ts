import Mock from 'mockjs';

import { Message, File, Schedule } from '../declare';

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

export const files: Array<File> = [
  {
    name: 'annular.zip',
    size: '~6.2 MB',
    value: '47',
    color: 'primary'
  },
  {
    name: 'documentation.pdf',
    size: '~14.6 MB',
    value: '33',
    color: 'accent'
  },
  {
    name: 'wallpaper.jpg',
    size: '~558 KB',
    value: '60',
    color: 'warn'
  },
  {
    name: 'letter.doc',
    size: '~57 KB',
    value: '80',
    color: 'primary'
  },
  {
    name: 'azimuth.zip',
    size: '~10.2 MB',
    value: '55',
    color: 'warn'
  },
  {
    name: 'contacts.xlsx',
    size: '~96 KB',
    value: '75',
    color: 'accent'
  }
];

export const schedules: Array<Schedule> = [
  {
    day: '09',
    month: 'May',
    title: 'Meeting with Bruno',
    text:
      'Fusce ut condimentum velit, quis egestas eros. Quisque sed condimentum neque.',
    bgColor: 'gradient-purple'
  },
  {
    day: '15',
    month: 'May',
    title: 'Training course',
    text:
      'Fusce arcu tortor, tempor aliquam augue vel, consectetur vehicula lectus.',
    bgColor: 'gradient-indigo'
  },
  {
    day: '12',
    month: 'June',
    title: 'Dinner with Ashley',
    text: 'Curabitur rhoncus facilisis augue sed fringilla.',
    bgColor: 'gradient-teal'
  },
  {
    day: '14',
    month: 'June',
    title: 'Sport time',
    text: 'Vivamus tristique enim eros, ac ultricies sem ultrices vitae.',
    bgColor: 'gradient-red'
  },
  {
    day: '29',
    month: 'July',
    title: 'Birthday of Julia',
    text: 'Nam porttitor justo nec elit efficitur vestibulum.',
    bgColor: 'gradient-orange'
  }
];
