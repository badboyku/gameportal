import { useCallback, useState } from 'react';
import { DateTime } from 'luxon';
import type { AuthData, AuthState } from '../../@types/global';

const initialState = {
  isAuthenticated: false,
  authSetDateTime: undefined,
  accessToken: undefined,
  idToken: undefined,
  user: undefined,
  setData: undefined,
};

export const useAuth = (): AuthState => {
  const [state, setState] = useState<AuthState>(initialState);

  const setData = useCallback((data: AuthData) => {
    setState((oldState) => {
      const { idToken, ...rest } = data;
      const newState = {
        ...oldState,
        ...rest,
        isAuthenticated: !!idToken?.__raw?.length,
        idToken,
        authSetDateTime: DateTime.local(),
      };
      console.log('GameportalUseAuth - setData', { data, oldState, newState });

      return newState;
    });
  }, []);

  return { ...state, setData };
};
