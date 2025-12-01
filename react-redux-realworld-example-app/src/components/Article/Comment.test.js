import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Comment from './Comment';

jest.mock('./DeleteButton', () => {
  return function DeleteButton({ show }) {
    return show ? <button>Delete</button> : null;
  };
});

describe('Comment Component', () => {
  const mockComment = {
    id: 1,
    body: 'This is a test comment',
    author: {
      username: 'commenter',
      image: 'http://example.com/avatar.jpg'
    },
    createdAt: '2025-01-01T00:00:00.000Z'
  };

  test('renders comment body', () => {
    render(
      <BrowserRouter>
        <Comment comment={mockComment} currentUser={null} slug="test-article" />
      </BrowserRouter>
    );
    
    expect(screen.getByText('This is a test comment')).toBeInTheDocument();
  });

  test('renders comment author username', () => {
    render(
      <BrowserRouter>
        <Comment comment={mockComment} currentUser={null} slug="test-article" />
      </BrowserRouter>
    );
    
    expect(screen.getByText('commenter')).toBeInTheDocument();
  });

  test('renders author avatar image', () => {
    render(
      <BrowserRouter>
        <Comment comment={mockComment} currentUser={null} slug="test-article" />
      </BrowserRouter>
    );
    
    const img = screen.getByAltText('commenter');
    expect(img).toHaveAttribute('src', 'http://example.com/avatar.jpg');
  });

  test('renders comment date', () => {
    render(
      <BrowserRouter>
        <Comment comment={mockComment} currentUser={null} slug="test-article" />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/2025/)).toBeInTheDocument();
  });

  test('shows delete button for comment author', () => {
    const currentUser = { username: 'commenter' };
    
    render(
      <BrowserRouter>
        <Comment comment={mockComment} currentUser={currentUser} slug="test-article" />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  test('does not show delete button for other users', () => {
    const currentUser = { username: 'otheruser' };
    
    render(
      <BrowserRouter>
        <Comment comment={mockComment} currentUser={currentUser} slug="test-article" />
      </BrowserRouter>
    );
    
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });

  test('uses default image when author image is missing', () => {
    const commentWithoutImage = {
      ...mockComment,
      author: { ...mockComment.author, image: null }
    };
    
    render(
      <BrowserRouter>
        <Comment comment={commentWithoutImage} currentUser={null} slug="test-article" />
      </BrowserRouter>
    );
    
    const img = screen.getByAltText('commenter');
    expect(img).toHaveAttribute('src', 'https://static.productionready.io/images/smiley-cyrus.jpg');
  });
});
