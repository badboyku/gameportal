import { useAuth0 } from '@auth0/auth0-react';
import { memo, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import type { Context } from '../../routes';

type Props = {};

const Login = (_props: Props) => {
  const { error: auth0error, isAuthenticated, isLoading, user, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  const context = useOutletContext<Context>();

  const { auth } = context;
  const { accessToken, idToken, error } = auth;
  console.log('gameportal Login', { auth0error, isAuthenticated, isLoading, user, accessToken, idToken, error });

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      console.log('GameportalLogin - navigate to home');
      navigate('/');
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (auth0error) {
    return <div>Oops... {auth0error.message}</div>;
  }

  return (
    <div>
      <button type="button" onClick={() => loginWithRedirect()}>
        Login
      </button>
    </div>
  );
};

export default memo(Login);
