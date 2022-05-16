export const enum PermissionEnum {
  DASHBOARD = 'dashboard',
  USERS_CREATE = 'users:create',
  USERS_READ = 'users:read',
  USERS_WRITE = 'users:write',
  USERS_DELETE = 'users:delete',
}

export const enum UrlPathEnum {
  ROOT = '/',
  LOGIN = '/login',
  DASHBOARD = '/dashboard',
  PROTECTED = '/protected',
  USERS_READ = '/users/read',
}

export const enum RoleEnum {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  USER = 'user',
}

export const enum AuthEnum {
  ALL = 0,
  REQUIRE_AUTH = 1,
  ANONYMOUS_AUTH = 2,
}

export const enum LoginStatus {
  NOT_LOGIN = 'not login',
  LOGIN = 'login',
  EXPIRES = 'expires',
}

export const enum RedirectEnum {
  EXPIRES = 'user token is expires',
  PERMISSION = 'user have no permissions',
  REDIRECT = 'web page is redirected',
}

export interface ResponseAuthUserType {
  permissions: PermissionEnum[];
  roles: RoleEnum[];
  expires: number;
  username?: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface AuthUserType extends ResponseAuthUserType {
  expiresTimestamp: number;
}

export interface AnyObjectType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface StorageData {
  data: AnyObjectType;
  expires?: number;
}

export interface RouteConfigElement {
  path: string;
  component: JSX.Element;
  auth?: AuthEnum;
  permissions?: PermissionEnum[];
}

export interface RouteConfig {
  layout: JSX.Element;
  elements: RouteConfigElement[];
}

export const enum StorageStatus {
  EMPTY,
  SET,
  REMOVED,
}
