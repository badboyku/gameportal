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

const useAuth = (): AuthState => {
  const [state, setState] = useState<AuthState>(initialState);

  const setData = useCallback((data: AuthData) => {
    setState((s) => ({ ...s, authSetDateTime: DateTime.local(), ...data }));
  }, []);

  return { ...state, setData };
};

export default useAuth;
