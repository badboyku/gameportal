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
  const context = useOutletContext<AppContext>();
  const { auth } = context;
  const { isAuthenticated, setData } = auth;
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
    if (auth0isAuthenticated && auth0user && !isAuthenticated) {
      (async () => {
        if (setData) {
          setData({
            isAuthenticated: auth0isAuthenticated,
            accessToken: await getAccessTokenSilently({
              authorizationParams: { redirect_uri: config.auth0.redirectUri },
            }),
            idToken: await getIdTokenClaims(),
            user: auth0user,
          });
        }
      })();
    }
  }, [auth0isAuthenticated, auth0user, isAuthenticated, getAccessTokenSilently, getIdTokenClaims, setData]);

  if (!isAuthenticated) {
    console.log('GameportalSecureOutlet - !isAuthenticated');

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
