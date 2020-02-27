export interface LoginInfo {
  account: string;
  password: string;
  signInIp: string;
}
export interface JwtPayload {
  sub: string | number;
  username: string;
}
export interface JwtToken {
  expiresIn: string | number;
  accessToken: string;
}
