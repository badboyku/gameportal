import { getEnvVars } from './env';

const { REACT_APP_AUTH0_DOMAIN, REACT_APP_AUTH0_CLIENT_ID, REACT_APP_AUTH0_REDIRECT_URI } = getEnvVars();

export default {
  auth0: {
    domain: REACT_APP_AUTH0_DOMAIN,
    clientId: REACT_APP_AUTH0_CLIENT_ID,
    redirectUri: REACT_APP_AUTH0_REDIRECT_URI,
  },
};
