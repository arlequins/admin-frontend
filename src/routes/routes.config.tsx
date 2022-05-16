import { lazy } from 'react';

import AuthLayout from '@app/components/layouts/AuthLayout';
import { AuthEnum, PermissionEnum, RouteConfig, UrlPathEnum } from '@app/types/typings/app/index.types';

const PublicPage = lazy(() => import('@app/pages'));
const LoginPage = lazy(() => import('@app/pages/login'));
const DashboardPage = lazy(() => import('@app/pages/dashboard'));

const routes: RouteConfig[] = [
  {
    layout: <AuthLayout />,
    elements: [
      {
        path: UrlPathEnum.ROOT,
        component: <PublicPage />,
        auth: AuthEnum.ALL,
      },
      {
        path: UrlPathEnum.LOGIN,
        component: <LoginPage />,
        auth: AuthEnum.ANONYMOUS_AUTH,
      },
      {
        path: UrlPathEnum.DASHBOARD,
        component: <DashboardPage />,
        auth: AuthEnum.REQUIRE_AUTH,
        permissions: [PermissionEnum.DASHBOARD],
      },
      {
        path: UrlPathEnum.PROTECTED,
        component: <DashboardPage />,
        auth: AuthEnum.REQUIRE_AUTH,
      },
      {
        path: UrlPathEnum.USERS_READ,
        component: <DashboardPage />,
        auth: AuthEnum.REQUIRE_AUTH,
        permissions: [PermissionEnum.USERS_READ],
      },
    ],
  },
];

export default routes;
