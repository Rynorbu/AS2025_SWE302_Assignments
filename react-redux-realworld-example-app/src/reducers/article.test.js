import article from './article';
import {
  ARTICLE_PAGE_LOADED,
  ARTICLE_PAGE_UNLOADED,
  ADD_COMMENT,
  DELETE_COMMENT
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

  test('handles ADD_COMMENT success', () => {
    const initialState = {
      article: { title: 'Test' },
      comments: [{ id: 1, body: 'First comment' }]
    };
    
    const action = {
      type: ADD_COMMENT,
      error: false,
      payload: { comment: { id: 2, body: 'New comment' } }
    };
    
    const result = article(initialState, action);
    expect(result.comments).toHaveLength(2);
    expect(result.comments[1]).toEqual({ id: 2, body: 'New comment' });
  });

  test('handles ADD_COMMENT error', () => {
    const initialState = {
      article: { title: 'Test' },
      comments: [{ id: 1, body: 'First comment' }]
    };
    
    const action = {
      type: ADD_COMMENT,
      error: true,
      payload: { errors: { body: ['cannot be empty'] } }
    };
    
    const result = article(initialState, action);
    expect(result.comments).toBeNull();
    expect(result.commentErrors).toEqual({ body: ['cannot be empty'] });
  });

  test('handles DELETE_COMMENT', () => {
    const initialState = {
      article: { title: 'Test' },
      comments: [
        { id: 1, body: 'First' },
        { id: 2, body: 'Second' },
        { id: 3, body: 'Third' }
      ]
    };
    
    const action = {
      type: DELETE_COMMENT,
      commentId: 2
    };
    
    const result = article(initialState, action);
    expect(result.comments).toHaveLength(2);
    expect(result.comments.find(c => c.id === 2)).toBeUndefined();
  });
});
