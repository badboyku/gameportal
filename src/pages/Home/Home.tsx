import { memo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { HelloWorld } from '../../components';
import { getEnvVars } from '../../utils/env';
import logoUrl, { ReactComponent as Logo } from './logo.svg';
import './style.scss';
import './styles.css';
import type { AppContext } from '../../@types/global';

type Props = {};

const Home = (_props: Props) => {
  const { REACT_APP_AUTH0_DOMAIN, REACT_APP_AUTH0_CLIENT_ID, REACT_APP_AUTH0_REDIRECT_URI } = getEnvVars();
  const outletContext = useOutletContext<AppContext>();
  const { auth: authState } = outletContext || {};
  const { isAuthenticated, authSetDateTime, accessToken, idToken, user } = authState || {};
  console.log('GameportalHome', { isAuthenticated, authSetDateTime, accessToken, idToken, user });

  return (
    <div>
      <h1>Game Portal</h1>
      <HelloWorld />
      <img src={logoUrl} className="logo" alt="logo" />
      <Logo width={40} />
      <h3>Auth</h3>
      <div>
        accessToken: <code style={{ fontWeight: 'bold' }}>{accessToken || ''}</code>
      </div>
      <div>
        idToken: <code style={{ fontWeight: 'bold' }}>{idToken?.__raw || ''}</code>
      </div>
      <h3>Env Vars</h3>
      <div>
        IS_DEV: <span style={{ fontWeight: 'bold' }}>{IS_DEV.toString()}</span>
      </div>
      <div>
        IS_PROD: <span style={{ fontWeight: 'bold' }}>{IS_PROD.toString()}</span>
      </div>
      <div>
        REACT_APP_AUTH0_DOMAIN: <span style={{ fontWeight: 'bold' }}>{REACT_APP_AUTH0_DOMAIN}</span>
      </div>
      <div>
        REACT_APP_AUTH0_CLIENT_ID: <span style={{ fontWeight: 'bold' }}>{REACT_APP_AUTH0_CLIENT_ID}</span>
      </div>
      <div>
        REACT_APP_AUTH0_REDIRECT_URI: <span style={{ fontWeight: 'bold' }}>{REACT_APP_AUTH0_REDIRECT_URI}</span>
      </div>
    </div>
  );
};

export default memo(Home);
