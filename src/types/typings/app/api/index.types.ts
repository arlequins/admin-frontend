import { RoleEnum } from '@typings/app/index.types';

export const enum ApiVersionEnum {
  V1 = 'v1',
  V2 = 'v2',
}

export const enum EndpointsEnum {
  LOGIN = 'login',
  LOGOUT = 'logout',
  RESET_PASSWORD = 'reset-password',
  REFRESH_TOKEN = 'refresh-token',
  USERS = 'users',
  DASHBOARD_LIST = 'dashboard/list',
}

export interface PostLoginParams {
  grantType: string;
  username: string;
  password: string;
}

export interface PostLoginResponse {
  username: string;
  accessToken: string;
  expiresIn: number;
  idToken: string;
  refreshToken: string;
  scope: RoleEnum;
  tokenType: string;
}

export interface GetDashboardListParams {
  date?: string;
}

export interface GetDashboardListResponseList {
  id: number;
  name: string;
}

export interface GetDashboardListResponse {
  list: GetDashboardListResponseList[];
}
