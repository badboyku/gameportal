import { useAuth0 } from '@auth0/auth0-react';
import { memo, useEffect } from 'react';
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import { AppNav } from '../../components';
import type { Context } from '../index';

type Props = {};

const SecureOutlet = (_props: Props) => {
  const { error: auth0error, isAuthenticated, isLoading, user } = useAuth0();
  const navigate = useNavigate();
  const context = useOutletContext<Context>();

  const { auth } = context;
  const { accessToken, idToken, error, fetchTokens } = auth;
  console.log('gameportal SecureOutlet', { auth0error, isAuthenticated, isLoading, user, accessToken, idToken, error });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      console.log('GameportalSecureOutlet - navigate to login');
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, navigate]);

  useEffect(() => {
    (async () => {
      if (fetchTokens) {
        await fetchTokens();
      }
    })();
  }, [fetchTokens]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (auth0error) {
    return <div>Oops... {auth0error.message}</div>;
  }
  if (!isAuthenticated || !accessToken || !idToken) {
    return null;
  }

  return (
    <>
      <AppNav />
      <Outlet context={context} />
    </>
  );
};

export default memo(SecureOutlet);
