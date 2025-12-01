import common from './common';
import {
  APP_LOAD,
  REDIRECT,
  LOGOUT
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
});
