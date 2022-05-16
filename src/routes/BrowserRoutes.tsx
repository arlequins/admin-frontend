import { Suspense } from 'react';

import { Route, Routes } from 'react-router-dom';

import LoadingLayout from '@app/components/layouts/LoadingLayout';
import AnonymousAuth from '@app/routes/AnonymousAuth';
import RequireAuth from '@app/routes/RequireAuth';
import routes from '@app/routes/routes.config';
import { AuthEnum, PermissionEnum, RouteConfigElement } from '@app/types/typings/app/index.types';

interface WrapProps {
  auth?: AuthEnum;
  permissions?: PermissionEnum[];
  component: JSX.Element;
}

const wrapComponent = ({ auth, permissions, component }: WrapProps) => {
  const element = <Suspense fallback={<LoadingLayout />}>{component}</Suspense>;

  switch (auth) {
    case AuthEnum.REQUIRE_AUTH:
      return <RequireAuth permissions={permissions}>{element}</RequireAuth>;
    case AuthEnum.ANONYMOUS_AUTH:
      return <AnonymousAuth>{element}</AnonymousAuth>;
    default:
      return element;
  }
};

const routeWrapper = ({ path, component, auth, permissions }: RouteConfigElement) => {
  return <Route path={path} key={path} element={wrapComponent({ auth, component, permissions })}></Route>;
};

const BrowserRoutes = () => {
  return (
    <Routes>
      {routes.map((route, key) => (
        <Route element={route.layout} key={key}>
          {route.elements.map(element => routeWrapper(element))}
        </Route>
      ))}
    </Routes>
  );
};

export default BrowserRoutes;
