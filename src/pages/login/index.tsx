import { useNavigate } from 'react-router-dom';

import { useAuth } from '@app/contexts/AuthProvider';
import { useLocationState } from '@app/hooks/locations';
import { LoginStatus } from '@typings/app/index.types';

const LoginPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const { from, reason } = useLocationState();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    const loginStatus = await auth.signIn({
      username,
      password,
      grantType: 'password',
    });

    if (loginStatus === LoginStatus.LOGIN) {
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      navigate(from, { replace: true });
    }
  };

  return (
    <div>
      <p>You must log in to view the page at {from}</p>
      <p>reason: {reason}</p>

      <form onSubmit={handleSubmit}>
        <label>
          Username: <input name="username" type="text" />
        </label>{' '}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
