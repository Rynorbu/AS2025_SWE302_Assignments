import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CommentList from './CommentList';

jest.mock('./Comment', () => {
  return function Comment({ comment }) {
    return <div>{comment.body}</div>;
  };
});

describe('CommentList Component', () => {
  const mockComments = [
    {
      id: 1,
      body: 'First comment',
      author: { username: 'user1', image: 'img1.jpg' },
      createdAt: '2025-01-01T00:00:00.000Z'
    },
    {
      id: 2,
      body: 'Second comment',
      author: { username: 'user2', image: 'img2.jpg' },
      createdAt: '2025-01-02T00:00:00.000Z'
    },
    {
      id: 3,
      body: 'Third comment',
      author: { username: 'user3', image: 'img3.jpg' },
      createdAt: '2025-01-03T00:00:00.000Z'
    }
  ];

  test('renders all comments', () => {
    render(
      <BrowserRouter>
        <CommentList comments={mockComments} currentUser={null} slug="test-article" />
      </BrowserRouter>
    );
    
    expect(screen.getByText('First comment')).toBeInTheDocument();
    expect(screen.getByText('Second comment')).toBeInTheDocument();
    expect(screen.getByText('Third comment')).toBeInTheDocument();
  });

  test('renders empty list when no comments', () => {
    const { container } = render(
      <BrowserRouter>
        <CommentList comments={[]} currentUser={null} slug="test-article" />
      </BrowserRouter>
    );
    
    expect(container.querySelector('div').children.length).toBe(0);
  });

  test('renders correct number of comments', () => {
    render(
      <BrowserRouter>
        <CommentList comments={mockComments} currentUser={null} slug="test-article" />
      </BrowserRouter>
    );
    
    const comments = screen.queryAllByText(/comment/i);
    expect(comments.length).toBe(3);
  });
});
