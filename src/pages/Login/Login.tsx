import { useAuth0 } from '@auth0/auth0-react';
import { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {};

const Login = (_props: Props) => {
  const { isAuthenticated: auth0isAuthenticated, user: auth0user, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  console.log('GameportalLogin', { auth0isAuthenticated, auth0user });

  useEffect(() => {
    console.log('GameportalLogin - useEffect1', { auth0isAuthenticated });
    if (auth0isAuthenticated) {
      console.log('GameportalLogin - useEffect1 before navigate to home');
      navigate('/');
    }
  }, [auth0isAuthenticated, navigate]);

  return (
    <div>
      <button type="button" onClick={() => loginWithRedirect()}>
        Login
      </button>
    </div>
  );
};

export default memo(Login);
