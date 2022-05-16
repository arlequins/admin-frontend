import { useNavigate } from 'react-router-dom';

import { useAuth } from '@app/contexts/AuthProvider';

const AuthStatus = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <div>
      Welcome {`${auth.user.username}! `}
      <button
        onClick={async () => {
          auth.signOut();
          navigate('/');
        }}
      >
        Sign out
      </button>
    </div>
  );
};

export default AuthStatus;
