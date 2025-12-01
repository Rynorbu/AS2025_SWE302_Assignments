import reducer from './settings';
import {
  SETTINGS_SAVED,
  SETTINGS_PAGE_UNLOADED,
  ASYNC_START
} from '../constants/actionTypes';

describe('settings reducer', () => {
  test('returns initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  test('handles SETTINGS_SAVED success', () => {
    const action = {
      type: SETTINGS_SAVED,
      error: false,
      payload: { user: { username: 'updateduser', email: 'new@example.com' } }
    };
    
    const result = reducer({}, action);
    expect(result.errors).toBeNull();
    expect(result.inProgress).toBe(false);
  });

  test('handles SETTINGS_SAVED error', () => {
    const action = {
      type: SETTINGS_SAVED,
      error: true,
      payload: { errors: { email: ['is already taken'] } }
    };
    
    const result = reducer({}, action);
    expect(result.errors).toEqual({ email: ['is already taken'] });
  });

  test('handles SETTINGS_PAGE_UNLOADED', () => {
    const initialState = {
      errors: { test: 'error' },
      someField: 'value'
    };
    
    expect(reducer(initialState, { type: SETTINGS_PAGE_UNLOADED })).toEqual({});
  });

  test('handles ASYNC_START', () => {
    const action = {
      type: ASYNC_START
    };
    
    const result = reducer({}, action);
    expect(result.inProgress).toBe(true);
  });

  test('clears inProgress flag on SETTINGS_SAVED', () => {
    const initialState = { inProgress: true };
    
    const action = {
      type: SETTINGS_SAVED,
      payload: { user: {} }
    };
    
    const result = reducer(initialState, action);
    expect(result.inProgress).toBe(false);
  });
});
