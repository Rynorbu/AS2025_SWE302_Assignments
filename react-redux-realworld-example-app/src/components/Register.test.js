import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders, createMockStore } from '../test-utils';
import Register from './Register';
import { REGISTER, UPDATE_FIELD_AUTH } from '../constants/actionTypes';

describe('Register Component', () => {
  test('renders sign up heading', () => {
    const store = createMockStore({ auth: {} });
    renderWithProviders(<Register />, { store });
    
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  test('renders link to login page', () => {
    const store = createMockStore({ auth: {} });
    renderWithProviders(<Register />, { store });
    
    const loginLink = screen.getByText('Have an account?');
    expect(loginLink).toBeInTheDocument();
    expect(loginLink.closest('a')).toHaveAttribute('href', '/login');
  });

  test('renders username input field', () => {
    const store = createMockStore({ auth: {} });
    renderWithProviders(<Register />, { store });
    
    const usernameInput = screen.getByPlaceholderText('Username');
    expect(usernameInput).toBeInTheDocument();
    expect(usernameInput).toHaveAttribute('type', 'text');
  });

  test('renders email input field', () => {
    const store = createMockStore({ auth: {} });
    renderWithProviders(<Register />, { store });
    
    const emailInput = screen.getByPlaceholderText('Email');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'email');
  });

  test('renders password input field', () => {
    const store = createMockStore({ auth: {} });
    renderWithProviders(<Register />, { store });
    
    const passwordInput = screen.getByPlaceholderText('Password');
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('renders submit button', () => {
    const store = createMockStore({ auth: {} });
    renderWithProviders(<Register />, { store });
    
    const submitButton = screen.getByRole('button', { name: 'Sign up' });
    expect(submitButton).toBeInTheDocument();
  });

  test('username input updates on change', () => {
    const store = createMockStore({ auth: { username: '' } });
    renderWithProviders(<Register />, { store });
    
    const usernameInput = screen.getByPlaceholderText('Username');
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    
    const actions = store.getActions();
    expect(actions[0].type).toBe(UPDATE_FIELD_AUTH);
    expect(actions[0].key).toBe('username');
    expect(actions[0].value).toBe('testuser');
  });

  test('email input updates on change', () => {
    const store = createMockStore({ auth: { email: '' } });
    renderWithProviders(<Register />, { store });
    
    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    const actions = store.getActions();
    expect(actions[0].type).toBe(UPDATE_FIELD_AUTH);
    expect(actions[0].key).toBe('email');
    expect(actions[0].value).toBe('test@example.com');
  });

  test('password input updates on change', () => {
    const store = createMockStore({ auth: { password: '' } });
    renderWithProviders(<Register />, { store });
    
    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    const actions = store.getActions();
    expect(actions[0].type).toBe(UPDATE_FIELD_AUTH);
    expect(actions[0].key).toBe('password');
    expect(actions[0].value).toBe('password123');
  });

  test('form submission dispatches register action', () => {
    const store = createMockStore({ 
      auth: { 
        username: 'testuser',
        email: 'test@example.com', 
        password: 'password123' 
      } 
    });
    const { container } = renderWithProviders(<Register />, { store });
    
    const form = container.querySelector('form');
    fireEvent.submit(form);
    
    const actions = store.getActions();
    const hasRegisterAction = actions.some(action => action.type === REGISTER);
    expect(hasRegisterAction).toBe(true);
  });

  test('submit button is disabled when inProgress is true', () => {
    const store = createMockStore({ 
      auth: { 
        username: 'testuser',
        email: 'test@example.com', 
        password: 'password123',
        inProgress: true
      } 
    });
    renderWithProviders(<Register />, { store });
    
    const submitButton = screen.getByRole('button', { name: 'Sign up' });
    expect(submitButton).toBeDisabled();
  });

  test('displays error messages when errors exist', () => {
    const store = createMockStore({ 
      auth: { 
        errors: { 
          'username': ['is already taken'] 
        } 
      } 
    });
    renderWithProviders(<Register />, { store });
    
    expect(screen.getByText(/username/)).toBeInTheDocument();
  });
});
