import { Link, Outlet } from 'react-router-dom';

import AuthStatus from '@app/components/templates/AuthStatus';
import { UrlPathEnum } from '@typings/app/index.types';

const AuthLayout = () => {
  return (
    <div>
      <AuthStatus />

      <ul>
        <li>
          <Link to="/">Public Page</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
        <li>
          <Link to={UrlPathEnum.DASHBOARD}>dashboard Page</Link>
        </li>
        <li>
          <Link to={UrlPathEnum.USERS_READ}>users read Page</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
};

export default AuthLayout;
