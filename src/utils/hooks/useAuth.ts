import { useAuth0 } from '@auth0/auth0-react';
import { useCallback, useState } from 'react';
import config from '../config';
import type { IdToken } from '@auth0/auth0-spa-js';

export type AuthState = { accessToken?: string; idToken?: IdToken; error?: Error; fetchTokens?: () => Promise<void> };

const initialState: AuthState = {
  accessToken: undefined,
  idToken: undefined,
  error: undefined,
  fetchTokens: undefined,
};

const useAuth = (): AuthState => {
  const { getAccessTokenSilently, getIdTokenClaims } = useAuth0();
  const [state, setState] = useState<AuthState>(initialState);

  const fetchTokens = useCallback(async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: { redirect_uri: config.auth0.redirectUri },
      });
      const idToken = await getIdTokenClaims();
      setState((s) => ({ ...s, accessToken, idToken, error: undefined }));
    } catch (e) {
      const error = e as Error;
      console.log('useAuth: fetchTokens failed', { error });
      setState((s) => ({ ...s, error }));
    }
  }, [getAccessTokenSilently, getIdTokenClaims]);

  return { ...state, fetchTokens };
};

export default useAuth;
