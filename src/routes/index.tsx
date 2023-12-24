/* eslint-disable import/no-unresolved, import/order, @typescript-eslint/ban-ts-comment */
import { Auth0Provider } from '@auth0/auth0-react';
import { useMemo } from 'react';
import { Outlet, redirect } from 'react-router-dom';
import { ErrorBoundary } from '../components';
import { Home, Login } from '../pages';
import config from '../utils/config';
import { useAuth } from '../utils/hooks';
import { SecureOutlet } from './SecureOutlet';
import type { RouteObject } from 'react-router-dom';
import type { AuthState } from '../utils/hooks/useAuth';

// @ts-ignore
import { getRoutes as getPokerRoutes } from 'gameportal_poker/pokerRoutes';

export type Context = { auth: AuthState };

const Root = () => {
  const auth = useAuth();
  const context = useMemo(() => ({ auth }), [auth]);
  const { accessToken, idToken, error } = auth;
  console.log('gameportal Root', { accessToken, idToken, error, context });

  return <Outlet context={context} />;
};

const routes: RouteObject[] = [
  {
    path: '/',
    id: 'gameportal',
    element: (
      <Auth0Provider
        domain={config.auth0.domain}
        clientId={config.auth0.clientId}
        authorizationParams={{ redirect_uri: config.auth0.redirectUri }}
        useRefreshTokens
        useRefreshTokensFallback
      >
        <Root />
      </Auth0Provider>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      { path: 'login/', element: <Login /> },
      {
        element: <SecureOutlet />,
        children: [
          { index: true, element: <Home /> },
          { path: '/poker/*', children: getPokerRoutes ? getPokerRoutes({ appPath: '/poker', isRemote: true }) : [] },
        ],
      },
      { path: '*', loader: () => redirect('/') },
    ],
  },
];

export default routes;
