import { Observable } from 'rxjs';

export interface Message {
  avatar: string;
  name: string;
  time: string;
  text: string;
}

export interface File {
  name: string;
  size: string;
  value: string;
  color: string;
}

export interface Schedule {
  title: string;
  text: string;
  day: string;
  month: string;
  bgColor: string;
}

export enum UserRole {
  Full = 1,
  User = 5,
  Manager = 10
}

export interface UserInfo {
  avatar: string | null;
  createdDate: string;
  email: string;
  id: number;
  lastSignInAt: string;
  lastSignInIp: string;
  layoutConfig: string | null;
  signInCount: number;
  themeColorConfig: string | null;
  token: {
    access_token: string;
    expires_in: number | string;
  };
  userRole: {
    description: string;
    id: number;
    role: string;
    value: string;
  };
  username: string;
}

export interface PersonInfo {
  no: number;
  name: string;
  weight: number;
  sex: 'man' | 'woman';
  symbol: string;
}

export class ChatUser {
  constructor(
    public avatar: string,
    public author: string,
    public status: string
  ) {}
}

export class ChatTalk {
  constructor(
    public avatar: string,
    public author: string,
    public text: string,
    public date: Date,
    public me: boolean
  ) {}
}

export class Mail {
  constructor(
    public id: number,
    public sender: string,
    public senderPhoto: string,
    public senderMail: string,
    public subject: string,
    public date: string,
    public body: string,
    public attachment: boolean,
    public attachments: string[],
    public unread: boolean,
    public sent: boolean,
    public starred: boolean,
    public draft: boolean,
    public trash: boolean,
    public selected: boolean
  ) {}
}

export class UserProfile {
  name: string;
  surname: string;
  birthday: Object;
  gender: string;
  image: string;
}

export class UserWork {
  company: string;
  position: string;
  salary: number;
}

export class UserContacts {
  email: string;
  phone: string;
  address: string;
}

export class UserSocial {
  weibo: string;
  qq: string;
  google: string;
}

export class UserSettings {
  isActive: boolean;
  isDeleted: boolean;
  registrationDate: string;
  joinedDate: string;
  bgColor: string;
}

export class User {
  id: number;
  username: string;
  password: string;
  profile: UserProfile;
  work: UserWork;
  contacts: UserContacts;
  social: UserSocial;
  settings: UserSettings;
}

export class Activitie {
  name: string;
  avatar: string;
  type: string;
  time: string;
  images: string[] = [];
  text: string;
}

export interface CanDeactivateComponent {
  isFormDirty: () => boolean;
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export interface ThemeColor {
  selectedFg: string;
  selectedBg: string;
  selectedBc?: string;
}
