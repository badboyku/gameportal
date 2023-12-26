/* eslint-disable import/no-unresolved, import/order, @typescript-eslint/ban-ts-comment */
import { Auth0Provider } from '@auth0/auth0-react';
import { redirect } from 'react-router-dom';
import { Home, Login } from '../pages';
import config from '../utils/config';
import { AppRoot } from './AppRoot';
import { ErrorBoundary } from './ErrorBoundary';
import { SecureOutlet } from './SecureOutlet';
import type { RouteObject } from 'react-router-dom';

// @ts-ignore
import { getRoutes as getPokerRoutes } from 'gameportal_poker/pokerRoutes';

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
        <AppRoot />
      </Auth0Provider>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      { path: 'login/', element: <Login /> },
      {
        element: <SecureOutlet />,
        children: [
          { index: true, element: <Home /> },
          {
            path: '/poker/*',
            children: getPokerRoutes
              ? getPokerRoutes({ appPath: '/poker', isRemote: true })
              : /* istanbul ignore next */ [],
          },
        ],
      },
      { path: '*', loader: () => redirect('/') },
    ],
  },
];

export default routes;
