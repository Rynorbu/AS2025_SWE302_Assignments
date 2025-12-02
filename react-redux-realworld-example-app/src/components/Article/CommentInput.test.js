import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { renderWithProviders, createMockStore } from '../../test-utils';
import CommentInput from './CommentInput';

jest.mock('../../agent', () => ({
  Comments: {
    create: jest.fn(() => Promise.resolve({ comment: { id: 1, body: 'New comment' } }))
  }
}));

describe('CommentInput Component', () => {
  const mockCurrentUser = {
    username: 'testuser',
    image: 'http://example.com/avatar.jpg'
  };

  test('renders comment textarea', () => {
    const store = createMockStore({});
    
    renderWithProviders(
      <CommentInput slug="test-article" currentUser={mockCurrentUser} />,
      { store }
    );
    
    expect(screen.getByPlaceholderText(/Write a comment/i)).toBeInTheDocument();
  });

  test('renders Post Comment button', () => {
    const store = createMockStore({});
    
    renderWithProviders(
      <CommentInput slug="test-article" currentUser={mockCurrentUser} />,
      { store }
    );
    
    expect(screen.getByText('Post Comment')).toBeInTheDocument();
  });

  test('renders user avatar', () => {
    const store = createMockStore({});
    
    renderWithProviders(
      <CommentInput slug="test-article" currentUser={mockCurrentUser} />,
      { store }
    );
    
    const img = screen.getByAltText('testuser');
    expect(img).toHaveAttribute('src', 'http://example.com/avatar.jpg');
  });

  test('updates textarea value on input', () => {
    const store = createMockStore({});
    
    renderWithProviders(
      <CommentInput slug="test-article" currentUser={mockCurrentUser} />,
      { store }
    );
    
    const textarea = screen.getByPlaceholderText(/Write a comment/i);
    fireEvent.change(textarea, { target: { value: 'Great article!' } });
    
    expect(textarea).toHaveValue('Great article!');
  });

  test('submits comment on form submit', () => {
    const store = createMockStore({});
    
    const { container } = renderWithProviders(
      <CommentInput slug="test-article" currentUser={mockCurrentUser} />,
      { store }
    );
    
    const textarea = screen.getByPlaceholderText(/Write a comment/i);
    fireEvent.change(textarea, { target: { value: 'Great article!' } });
    
    const form = container.querySelector('form');
    fireEvent.submit(form);
    
    const actions = store.getActions();
    expect(actions.some(a => a.type === 'ADD_COMMENT')).toBe(true);
  });

  test('clears textarea after submit', () => {
    const store = createMockStore({});
    
    const { container } = renderWithProviders(
      <CommentInput slug="test-article" currentUser={mockCurrentUser} />,
      { store }
    );
    
    const textarea = screen.getByPlaceholderText(/Write a comment/i);
    fireEvent.change(textarea, { target: { value: 'Great article!' } });
    
    const form = container.querySelector('form');
    fireEvent.submit(form);
    
    expect(textarea).toHaveValue('');
  });

  test('uses default avatar when user image is missing', () => {
    const store = createMockStore({});
    const userWithoutImage = { username: 'testuser', image: null };
    
    renderWithProviders(
      <CommentInput slug="test-article" currentUser={userWithoutImage} />,
      { store }
    );
    
    const img = screen.getByAltText('testuser');
    expect(img).toHaveAttribute('src', 'https://static.productionready.io/images/smiley-cyrus.jpg');
  });
});
