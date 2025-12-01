import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders, createMockStore } from '../test-utils';
import App from './App';

describe('App Component', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('renders header when app is loaded', () => {
    const store = createMockStore({
      common: {
        appLoaded: true,
        appName: 'Conduit',
        currentUser: null
      }
    });

    renderWithProviders(<App />, { store });
    expect(screen.getByText('Conduit')).toBeInTheDocument();
  });

  test('renders header when app is not loaded', () => {
    const store = createMockStore({
      common: {
        appLoaded: false,
        appName: 'Conduit',
        currentUser: null
      }
    });

    renderWithProviders(<App />, { store });
    expect(screen.getByText('Conduit')).toBeInTheDocument();
  });

  test('dispatches APP_LOAD on mount without token', () => {
    const store = createMockStore({
      common: {
        appLoaded: false,
        appName: 'Conduit',
        currentUser: null
      }
    });

    renderWithProviders(<App />, { store });
    
    const actions = store.getActions();
    expect(actions.some(a => a.type === 'APP_LOAD')).toBe(true);
  });

  test('dispatches APP_LOAD with token from localStorage', () => {
    window.localStorage.setItem('jwt', 'test-token-123');
    
    const store = createMockStore({
      common: {
        appLoaded: false,
        appName: 'Conduit',
        currentUser: null
      }
    });

    renderWithProviders(<App />, { store });
    
    const actions = store.getActions();
    const appLoadAction = actions.find(a => a.type === 'APP_LOAD');
    expect(appLoadAction).toBeDefined();
    expect(appLoadAction.token).toBe('test-token-123');
  });

  test('renders routes when appLoaded is true', () => {
    const store = createMockStore({
      common: {
        appLoaded: true,
        appName: 'Conduit',
        currentUser: null
      }
    });

    const { container } = renderWithProviders(<App />, { store });
    
    // Switch component should be rendered
    expect(container.querySelector('div')).toBeInTheDocument();
  });

  test('shows current user in header when logged in', () => {
    const store = createMockStore({
      common: {
        appLoaded: true,
        appName: 'Conduit',
        currentUser: { username: 'testuser', email: 'test@example.com' }
      }
    });

    renderWithProviders(<App />, { store });
    expect(screen.getByText('testuser')).toBeInTheDocument();
  });
});
