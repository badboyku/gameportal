/* eslint-disable @typescript-eslint/ban-ts-comment */
import { redirect } from 'react-router-dom';
import { Home, Login } from '../pages';
import { AppRoot } from './AppRoot';
import { ErrorBoundary } from './ErrorBoundary';
import { SecureOutlet } from './SecureOutlet';
import routes from './index';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  redirect: jest.fn(),
}));
jest.mock('../pages/Home', () => ({ Home: () => <div data-testid="home" /> }));
jest.mock('../pages/Login', () => ({ Login: () => <div data-testid="login" /> }));
jest.mock('./AppRoot', () => ({ AppRoot: () => <div data-testid="app-root" /> }));
jest.mock('./ErrorBoundary', () => ({ ErrorBoundary: () => <div data-testid="error-boundary" /> }));
jest.mock('./SecureOutlet', () => ({ SecureOutlet: () => <div data-testid="secure-outlet" /> }));

describe('Routes', () => {
  it('has one route object', () => {
    expect(routes.length).toEqual(1);
  });

  describe('first route in routes', () => {
    const route = routes[0];

    it('has path=/', () => {
      expect(route.path).toEqual('/');
    });

    it('has id=gameportal', () => {
      expect(route.id).toEqual('gameportal');
    });

    it('has an element=AppRoot', () => {
      // @ts-ignore
      expect(route.element?.type).toEqual(AppRoot);
    });

    it('has an errorElement=ErrorBoundary', () => {
      // @ts-ignore
      expect(route.errorElement?.type).toEqual(ErrorBoundary);
    });

    it('has three children', () => {
      expect(route.children?.length).toEqual(3);
    });

    describe("first child in route's children", () => {
      const child = route.children?.[0];

      it('has path=login/', () => {
        expect(child?.path).toEqual('login/');
      });

      it('has an element=Login', () => {
        // @ts-ignore
        expect(child?.element?.type).toEqual(Login);
      });
    });

    describe("second child in route's children", () => {
      const child = route.children?.[1];

      it('has an element=SecureOutlet', () => {
        // @ts-ignore
        expect(child?.element?.type).toEqual(SecureOutlet);
      });

      it('has two children', () => {
        expect(child?.children?.length).toEqual(2);
      });

      describe("first child in second child's children", () => {
        const innerChild = child?.children?.[0];

        it('has index=true', () => {
          expect(innerChild?.index).toEqual(true);
        });

        it('has an element=Login', () => {
          // @ts-ignore
          expect(innerChild?.element?.type).toEqual(Home);
        });
      });

      describe("second child in second child's children", () => {
        const innerChild = child?.children?.[1];
        console.log('innerChild?.children', innerChild?.children);

        it('has path=/poker/*', () => {
          expect(innerChild?.path).toEqual('/poker/*');
        });

        it('has children from getRoutes for poker app', () => {
          expect(innerChild?.children?.length).toEqual(1);
        });
      });
    });

    describe("third child in route's children", () => {
      const child = route.children?.[2];

      it('has path=*', () => {
        expect(child?.path).toEqual('*');
      });

      it('has loader', () => {
        expect(child?.loader).toBeTruthy();
      });

      describe('when loader is called', () => {
        it('calls redirect', () => {
          // @ts-ignore
          child?.loader();

          expect(redirect).toHaveBeenCalledWith('/');
        });
      });
    });
  });
});
