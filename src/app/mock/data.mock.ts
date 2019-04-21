import Mock from 'mockjs';

import {
  Message,
  File,
  Schedule,
  UserInfo,
  PersonInfo,
  ChatUser,
  ChatTalk,
  Mail
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



export const Mails: Array<Mail> = [
  new Mail(
    2,
    'Josiah Fromdahl',
    'assets/images/bruno.jpg',
    'Reekie8647@gmail.com',
    'Useful tool for those who are involved in SEO',
    '9:47 AM',
    '<p>Hi, I want to introduce the Website Reviewer is an incredibly useful tool for those who are involved in SEO and web designing. ' +
      'This particular tool will provide you with quick website review and SEO audit of the websites you’ve created so ' +
      'you will be able to determine if and where any changes should be made so you can make it as effective ' +
      'as possible when it comes to getting visitors and keeping them interested. ' +
      'Unlike many similar tools, website reviewer is completely free.</p>',
    true,
    [
      '/assets/images/image-1.gif',
      '/assets/images/image-2.jpg',
      '/assets/images/image-3.webp'
    ],
    true,
    false,
    true,
    false,
    false,
    false
  ),
  new Mail(
    3,
    'Google Cloud Platform',
    'assets/images/google-platform.png',
    'CloudPlatform-noreply@google.com',
    'Lessons from the field: surviving success with Customer Reliability Engineering',
    'Jan 5',
    '<h4>TRENDING</h4>' +
      '<p>For those who missed the early adoption of Infrastructure as a Service circa 2007,' +
      'this in-depth history stresses why businesses need to begin building around "serverless" architectures.</p>' +
      '<p>A stress test led by Pivotal’s Cloud Foundry team ran 250,000 real-life app containers on Google Compute Engine. ' +
      'GCP made it possible to stand the environment up in hours, and scaled it without pre-planning.</p>' +
      '<p>Dig in to a new site packed with open-source tools and resources that aims to make it easy for anyone to explore,' +
      'develop, and share AI creations. Play an AI duet, or have your phone guess what you’re drawing.</p>',
    false,
    [],
    false,
    false,
    false,
    false,
    false,
    false
  ),
  new Mail(
    4,
    'Microsoft Visual Studio',
    'assets/images/vs.jpg',
    'MVS@e-mail.microsoft.com',
    'Welcome to Visual Studio Team Services',
    '24.12.2016',
    '<p>Whether your teams develop in Java, .NET, or in multiple languages, Visual Studio Team Services offers an open,' +
      'cloud-hosted development hub. Use your favorite IDE, develop in any language, and empower your teams to iterate ' +
      'rapidly.</p> <p>Rogue security software scams. Rogue security software, also known as "scareware," is software that ' +
      'appears to be beneficial from a security perspective but provides limited or no security, generates erroneous or ' +
      'misleading alerts, or attempts to lure you into participating in fraudulent transactions. These scams can appear ' +
      'in email, online advertisements, your social networking site, search engine results, or even in pop-up windows on ' +
      'your computer that might appear to be part of your operating system, but are not.</p>',
    false,
    [],
    true,
    false,
    false,
    false,
    false,
    false
  ),
  new Mail(
    6,
    'Draft',
    '',
    '',
    'Please confirm your email',
    'Jan 7',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elementum interdum ex, sed aliquet nisl maximus imperdiet.' +
      'Phasellus pharetra nunc eu dui hendrerit, quis ullamcorper tortor malesuada.' +
      'Nullam ante mi, auctor eu nunc vitae, gravida molestie arcu.',
    false,
    [],
    false,
    false,
    false,
    true,
    false,
    false
  ),
  new Mail(
    7,
    'MailChimp',
    'assets/images/mailchimp.jpg',
    'hello@mailchimp.com',
    'Our 2016 annual report',
    '22.12.2016',
    '<p>For our 2016 annual report, we let our design team run wild with our most fun facts and proudest moments from the year.' +
      'From GIFs in email campaigns to physical tons of infrastructure added to dollars raised for charity, it’s our year in numbers.</p>' +
      '<p>We’re proud of our new features, our customer support tickets solved, and our philanthropy in Atlanta.' +
      'But we’re even more proud of you and the billions of emails you’ve sent to grow your businesses your way in 2016.' +
      'Keep up the good work!</p><p>Cheers to the new year,</p><p>MailChimp</p>',
    false,
    [],
    false,
    false,
    false,
    false,
    false,
    false
  ),
  new Mail(
    8,
    'Bluehost',
    'assets/images/bluehost.jpg',
    'no-reply@e.bluehost.com',
    'Your domain privacy may be at risk',
    '20.12.2016',
    '<h4>New ICANN Rules Require Accurate Contact Information</h4>' +
      '<p>Your domain information may be at risk. However, you can protect your information with domain privacy.</p>' +
      '<p>Protect yourself with Domain Privacy.</p><p><small>Only $11.88 per year.**</small></p>' +
      '<p><a href="http://bluehost.com/" target="blank" class="btn btn-success">Get started</a></p>',
    false,
    [],
    false,
    false,
    true,
    false,
    false,
    false
  ),
];
