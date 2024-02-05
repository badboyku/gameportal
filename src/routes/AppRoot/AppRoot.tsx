import { memo, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useAuth } from '../../utils/hooks';

type Props = {};

const AppRoot = (_props: Props) => {
  const auth = useAuth();
  const { isLoading: auth0isLoading, error: auth0error } = useAuth0();
  const context = useMemo(() => ({ auth }), [auth]);
  console.log('GameportalAppRoot', { context });

  if (auth0isLoading) {
    console.log('GameportalAppRoot - auth0isLoading');

    return <div>Loading...</div>;
  }
  if (auth0error) {
    console.log('GameportalAppRoot - auth0error');

    return <div>Oops... {auth0error.message}</div>;
  }

  return <Outlet context={context} />;
};

export default memo(AppRoot);
