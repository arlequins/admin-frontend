export interface RequestLogin {
  grantType: string;
  username: string;
  password: string;
}

export interface ResponseLogin {
  accessToken: string;
  expiresIn: number;
  idToken: string;
  refreshToken: string;
  scope: string;
  tokenType: string;
}
