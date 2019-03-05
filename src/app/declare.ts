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
