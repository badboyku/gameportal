import type {RouteObject} from 'react-router-dom';
import {Outlet, redirect, useLoaderData, useRouteLoaderData} from 'react-router-dom';
import {AppNav, ErrorBoundary} from '../components';
import {Home} from '../pages';

// @ts-ignore
import {getRoutes as getPokerRoutes} from 'gameportal_poker/pokerRoutes';

const Root = () => {
  const gameportalData = useRouteLoaderData('gameportal');
  const gameportalPokerData = useRouteLoaderData('gameportalPoker');
  const data = useLoaderData();
  console.log('gameportal Root', { gameportalData, gameportalPokerData, data });

  return (
    <div>
      <AppNav />
      <Outlet />
    </div>
  );
};

const features: { name: string; hasFeature: boolean}[] = [];
const isRemote = true;
const token = 'tokenFromHostApp';

const routes: RouteObject[] = [
  {
    path: '/',
    id: 'gameportal',
    element: <Root />,
    errorElement: <ErrorBoundary />,
    loader(loader1Props) {
      console.log('gameportal root loader', { loader1Props })

      return { features, isRemote, token };
    },
    children: [
      { index: true, element: <Home /> },
      { path: '/poker/*', children: getPokerRoutes({ appPath: '/poker', features, isRemote, token }) },
      { path: '*', loader: () => redirect('/') },
    ],
  },
];

export default routes;
