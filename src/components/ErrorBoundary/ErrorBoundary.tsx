import {memo, useCallback, useRef} from 'react';
import {useRouteError} from 'react-router-dom';

const ErrorBoundary = () => {
  const error = useRef(useRouteError() as Error);

  // eslint-disable-next-line no-console
  console.error(error.current.message);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 className="error">We&apos;re sorry, but something went wrong</h1>
      <h3>You may go back, or click below to try again</h3>
      <button type="button" onClick={useCallback(() => window.location.reload(), [])}>
        Retry
      </button>
    </div>
  );
};

export default memo(ErrorBoundary);
