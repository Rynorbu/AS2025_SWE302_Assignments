import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders, createMockStore } from '../test-utils';
import Settings from './Settings';

describe('Settings Component', () => {
  test('renders settings form', () => {
    const store = createMockStore({
      settings: {},
      common: { currentUser: { username: 'testuser', email: 'test@example.com' } }
    });

    renderWithProviders(<Settings />, { store });
    expect(screen.getByText('Your Settings')).toBeInTheDocument();
  });

  test('renders logout button', () => {
    const store = createMockStore({
      settings: {},
      common: { currentUser: { username: 'testuser' } }
    });

    renderWithProviders(<Settings />, { store });
    expect(screen.getByText(/Or click here to logout/i)).toBeInTheDocument();
  });

  test('renders all form fields', () => {
    const store = createMockStore({
      settings: {},
      common: { currentUser: { username: 'testuser', email: 'test@example.com' } }
    });

    renderWithProviders(<Settings />, { store });
    
    expect(screen.getByPlaceholderText(/URL of profile picture/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Short bio/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/New Password/i)).toBeInTheDocument();
  });

  test('pre-fills form with current user data', () => {
    const store = createMockStore({
      settings: {},
      common: { 
        currentUser: { 
          username: 'testuser',
          email: 'test@example.com',
          bio: 'Test bio',
          image: 'http://example.com/image.jpg'
        }
      }
    });

    renderWithProviders(<Settings />, { store });
    
    expect(screen.getByPlaceholderText(/Username/i)).toHaveValue('testuser');
    expect(screen.getByPlaceholderText(/Email/i)).toHaveValue('test@example.com');
  });

  test('clicking logout dispatches LOGOUT action', () => {
    const store = createMockStore({
      settings: {},
      common: { currentUser: { username: 'testuser' } }
    });

    renderWithProviders(<Settings />, { store });
    
    const logoutButton = screen.getByText(/Or click here to logout/i);
    fireEvent.click(logoutButton);
    
    const actions = store.getActions();
    expect(actions.some(a => a.type === 'LOGOUT')).toBe(true);
  });

  test('renders update settings button', () => {
    const store = createMockStore({
      settings: {},
      common: { currentUser: { username: 'testuser' } }
    });

    renderWithProviders(<Settings />, { store });
    expect(screen.getByText('Update Settings')).toBeInTheDocument();
  });
});
