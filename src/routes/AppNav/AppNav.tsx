import { useAuth0 } from '@auth0/auth0-react';
import { memo } from 'react';
import { NavLink, useOutletContext } from 'react-router-dom';
import config from '../../utils/config';
import type { AppContext } from '../../@types/global';

type Props = {};

const AppNav = (_props: Props) => {
  const { logout } = useAuth0();
  const { auth } = useOutletContext<AppContext>();
  const { isAuthenticated, authSetDateTime, accessToken, idToken, user } = auth;
  console.log('GameportalAppNav', { isAuthenticated, authSetDateTime, accessToken, idToken, user });

  return (
    <div>
      <span>
        <NavLink to="/">Home</NavLink>
      </span>
      <span>&nbsp;-&nbsp;</span>
      <span>
        <NavLink to="/poker">Poker</NavLink>
      </span>
      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <span>
        <button type="button" onClick={() => logout({ logoutParams: { returnTo: config.auth0.redirectUri } })}>
          Logout
        </button>
      </span>
    </div>
  );
};

export default memo(AppNav);
