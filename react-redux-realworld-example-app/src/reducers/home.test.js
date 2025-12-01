import home from './home';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED
} from '../constants/actionTypes';

describe('home reducer', () => {
  test('returns initial state', () => {
    expect(home(undefined, {})).toEqual({});
  });

  test('handles HOME_PAGE_LOADED', () => {
    const payload = [
      { tags: ['test', 'example', 'redux'] }
    ];
    const action = { type: HOME_PAGE_LOADED, payload };
    
    const newState = home({}, action);
    expect(newState.tags).toEqual(['test', 'example', 'redux']);
  });

  test('handles HOME_PAGE_UNLOADED', () => {
    const initialState = { articles: [1, 2, 3], tags: ['test'] };
    const action = { type: HOME_PAGE_UNLOADED };
    
    expect(home(initialState, action)).toEqual({});
  });
});
