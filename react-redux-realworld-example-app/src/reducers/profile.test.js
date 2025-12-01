import reducer from './profile';
import {
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
  FOLLOW_USER,
  UNFOLLOW_USER
} from '../constants/actionTypes';

describe('profile reducer', () => {
  test('returns initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  test('handles PROFILE_PAGE_LOADED', () => {
    const action = {
      type: PROFILE_PAGE_LOADED,
      payload: [
        { profile: { username: 'testuser', bio: 'Test bio', following: false } }
      ]
    };
    
    const result = reducer({}, action);
    expect(result).toEqual({ username: 'testuser', bio: 'Test bio', following: false });
  });

  test('handles PROFILE_PAGE_UNLOADED', () => {
    const initialState = {
      username: 'testuser',
      bio: 'Test bio'
    };
    
    expect(reducer(initialState, { type: PROFILE_PAGE_UNLOADED })).toEqual({});
  });

  test('handles FOLLOW_USER success', () => {
    const initialState = {
      username: 'testuser',
      following: false
    };
    
    const action = {
      type: FOLLOW_USER,
      payload: { profile: { username: 'testuser', following: true } }
    };
    
    const result = reducer(initialState, action);
    expect(result.following).toBe(true);
  });

  test('handles FOLLOW_USER with payload', () => {
    const initialState = {
      username: 'testuser',
      following: false
    };
    
    const action = {
      type: FOLLOW_USER,
      payload: { profile: { username: 'testuser', following: true, bio: 'Updated' } }
    };
    
    const result = reducer(initialState, action);
    expect(result).toEqual({ username: 'testuser', following: true, bio: 'Updated' });
  });

  test('handles UNFOLLOW_USER success', () => {
    const initialState = {
      username: 'testuser',
      following: true
    };
    
    const action = {
      type: UNFOLLOW_USER,
      payload: { profile: { username: 'testuser', following: false } }
    };
    
    const result = reducer(initialState, action);
    expect(result.following).toBe(false);
  });

  test('handles UNFOLLOW_USER with complete payload', () => {
    const initialState = {
      username: 'testuser',
      following: true
    };
    
    const action = {
      type: UNFOLLOW_USER,
      payload: { profile: { username: 'testuser', following: false, bio: 'Test bio' } }
    };
    
    const result = reducer(initialState, action);
    expect(result).toEqual({ username: 'testuser', following: false, bio: 'Test bio' });
  });
});
