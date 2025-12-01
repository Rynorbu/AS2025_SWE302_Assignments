import common from './common';
import {
  APP_LOAD,
  REDIRECT,
  LOGOUT,
  LOGIN,
  REGISTER,
  DELETE_ARTICLE,
  HOME_PAGE_UNLOADED
} from '../constants/actionTypes';

describe('common reducer', () => {
  test('returns initial state', () => {
    const initialState = {
      appName: 'Conduit',
      token: null,
      viewChangeCounter: 0
    };
    
    expect(common(undefined, {})).toEqual(initialState);
  });

  test('handles APP_LOAD', () => {
    const action = { 
      type: APP_LOAD, 
      token: 'test-token',
      payload: { user: { username: 'testuser' } }
    };
    
    const newState = common(undefined, action);
    expect(newState.token).toBe('test-token');
    expect(newState.appLoaded).toBe(true);
    expect(newState.currentUser).toEqual({ username: 'testuser' });
  });

  test('handles REDIRECT', () => {
    const initialState = { redirectTo: '/test', appName: 'Conduit', token: null, viewChangeCounter: 0 };
    const action = { type: REDIRECT };
    
    const newState = common(initialState, action);
    expect(newState.redirectTo).toBeNull();
  });

  test('handles LOGOUT', () => {
    const initialState = { token: 'test-token', currentUser: { username: 'test' }, appName: 'Conduit', viewChangeCounter: 0 };
    const action = { type: LOGOUT };
    
    const newState = common(initialState, action);
    expect(newState.token).toBeNull();
    expect(newState.currentUser).toBeNull();
    expect(newState.redirectTo).toBe('/');
  });

  test('handles LOGIN success', () => {
    const action = {
      type: LOGIN,
      error: false,
      payload: { user: { username: 'newuser', token: 'new-token' } }
    };
    
    const newState = common(undefined, action);
    expect(newState.token).toBe('new-token');
    expect(newState.currentUser).toEqual({ username: 'newuser', token: 'new-token' });
    expect(newState.redirectTo).toBe('/');
  });

  test('handles LOGIN error', () => {
    const action = {
      type: LOGIN,
      error: true,
      payload: { errors: { 'email or password': ['is invalid'] } }
    };
    
    const newState = common(undefined, action);
    expect(newState.redirectTo).toBeNull();
  });

  test('handles REGISTER success', () => {
    const action = {
      type: REGISTER,
      error: false,
      payload: { user: { username: 'newuser', token: 'new-token' } }
    };
    
    const newState = common(undefined, action);
    expect(newState.token).toBe('new-token');
    expect(newState.redirectTo).toBe('/');
  });

  test('handles DELETE_ARTICLE', () => {
    const initialState = { appName: 'Conduit', token: 'test', viewChangeCounter: 0 };
    const action = { type: DELETE_ARTICLE };
    
    const newState = common(initialState, action);
    expect(newState.redirectTo).toBe('/');
  });

  test('increments viewChangeCounter on HOME_PAGE_UNLOADED', () => {
    const initialState = { appName: 'Conduit', token: null, viewChangeCounter: 5 };
    const action = { type: HOME_PAGE_UNLOADED };
    
    const newState = common(initialState, action);
    expect(newState.viewChangeCounter).toBe(6);
  });
});
