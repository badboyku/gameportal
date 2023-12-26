import type { IdToken, User } from '@auth0/auth0-spa-js';
import type { DateTime } from 'luxon';

export type AuthData = {
  isAuthenticated?: boolean;
  authSetDateTime?: DateTime;
  accessToken?: string;
  idToken?: IdToken;
  user?: User;
};
export type AuthState = { setData?: (data: AuthData) => void } & AuthData;
export type AppContext = { auth: AuthState };

// Add custom react env vars here for runtime env vars.
export type ReactAppEnvVars = {
  NODE_ENV?: string;
  REACT_APP_AUTH0_DOMAIN: string;
  REACT_APP_AUTH0_CLIENT_ID: string;
  REACT_APP_AUTH0_REDIRECT_URI: string;
};

declare global {
  declare const IS_DEV: boolean;
  declare const IS_PROD: boolean;

  // Add custom react env vars here for buildtime env vars.
  declare const REACT_APP_MY_VAR: string;

  export interface Window {
    __RUNTIME_CONFIG__?: ReactAppEnvVars | {};
  }
}
