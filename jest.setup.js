import '@testing-library/jest-dom';

global.React = require('react');

jest.mock('gameportal_poker/pokerRoutes', () => ({ getRoutes: () => [{ element: <div data-testid="gameportal-poker"/> }] }), { virtual: true });
