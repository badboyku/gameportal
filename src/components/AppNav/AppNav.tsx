import { useAuth0 } from '@auth0/auth0-react';
import { memo } from 'react';
import { NavLink, useOutletContext } from 'react-router-dom';
import config from '../../utils/config';
import type { Context } from '../../routes';

type Props = {};

const AppNav = (_props: Props) => {
  const { user, logout } = useAuth0();
  const context = useOutletContext<Context>();

  const { auth } = context;
  const { accessToken, idToken } = auth;
  console.log('gameportal AppNav', { user, accessToken, idToken });

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
