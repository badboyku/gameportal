import { useAuth0 } from '@auth0/auth0-react';
import { memo, useEffect } from 'react';
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import config from '../../utils/config';
import { AppNav } from '../AppNav';
import type { AppContext } from '../../@types/global';

type Props = {};

const SecureOutlet = (_props: Props) => {
  const {
    isAuthenticated: auth0isAuthenticated,
    user: auth0user,
    getAccessTokenSilently,
    getIdTokenClaims,
  } = useAuth0();
  const navigate = useNavigate();
  const outletContext = useOutletContext<AppContext>();
  const { auth: authState } = outletContext || {};
  const { isAuthenticated, setData: setAuthData } = authState || {};
  console.log('GameportalSecureOutlet', { auth0isAuthenticated, auth0user, isAuthenticated });

  useEffect(() => {
    console.log('GameportalSecureOutlet - useEffect1', { auth0isAuthenticated });
    if (!auth0isAuthenticated) {
      console.log('GameportalSecureOutlet - useEffect1 before navigate to login');
      navigate('/login');
    }
  }, [auth0isAuthenticated, navigate]);

  useEffect(() => {
    console.log('GameportalSecureOutlet - useEffect2', { auth0isAuthenticated, auth0user, isAuthenticated });
    if (auth0isAuthenticated && !isAuthenticated && setAuthData) {
      (async () => {
        setAuthData({
          accessToken: await getAccessTokenSilently({
            authorizationParams: { redirect_uri: config.auth0.redirectUri },
          }),
          idToken: await getIdTokenClaims(),
          user: auth0user,
        });
      })();
    }
  }, [auth0isAuthenticated, auth0user, isAuthenticated, getAccessTokenSilently, getIdTokenClaims, setAuthData]);

  if (!isAuthenticated) {
    console.log('GameportalSecureOutlet - !isAuthenticated');

    return null;
  }

  return (
    <>
      <AppNav />
      <Outlet context={outletContext} />
    </>
  );
};

export default memo(SecureOutlet);
