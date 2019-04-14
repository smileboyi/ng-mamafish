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
  name: string;
  token: string;
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
