import article from './article';
import {
  ARTICLE_PAGE_LOADED,
  ARTICLE_PAGE_UNLOADED
} from '../constants/actionTypes';

describe('article reducer', () => {
  test('returns initial state', () => {
    expect(article(undefined, {})).toEqual({});
  });

  test('handles ARTICLE_PAGE_LOADED', () => {
    const payload = [
      { article: { title: 'Test Article', body: 'Content' } },
      { comments: [{ id: 1, body: 'Comment' }] }
    ];
    const action = { type: ARTICLE_PAGE_LOADED, payload };
    
    const result = article({}, action);
    expect(result.article).toEqual({ title: 'Test Article', body: 'Content' });
    expect(result.comments).toEqual([{ id: 1, body: 'Comment' }]);
  });

  test('handles ARTICLE_PAGE_UNLOADED', () => {
    const initialState = { article: { title: 'Test' } };
    const action = { type: ARTICLE_PAGE_UNLOADED };
    
    expect(article(initialState, action)).toEqual({});
  });
});
