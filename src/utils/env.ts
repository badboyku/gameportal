import type { ReactAppEnvVars } from '../@types/global';

const DefaultEnvVars: ReactAppEnvVars = {
  REACT_APP_AUTH0_DOMAIN: '',
  REACT_APP_AUTH0_CLIENT_ID: '',
  REACT_APP_AUTH0_REDIRECT_URI: '',
};

const getEnvVars = (): ReactAppEnvVars => {
  const { __RUNTIME_CONFIG__: env = DefaultEnvVars } = window;

  return { ...DefaultEnvVars, ...env };
};

const setEnvVars = (newEnvVars: ReactAppEnvVars): void => {
  window.__RUNTIME_CONFIG__ = { ...DefaultEnvVars, ...newEnvVars };
};

export { DefaultEnvVars, getEnvVars, setEnvVars };
