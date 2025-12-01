import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ArticleMeta from './ArticleMeta';

jest.mock('./ArticleActions', () => {
  return function ArticleActions() {
    return <div>ArticleActions</div>;
  };
});

describe('ArticleMeta Component', () => {
  const mockArticle = {
    author: {
      username: 'testuser',
      image: 'http://example.com/image.jpg'
    },
    createdAt: '2025-01-01T00:00:00.000Z'
  };

  test('renders article author username', () => {
    render(
      <BrowserRouter>
        <ArticleMeta article={mockArticle} canModify={false} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('testuser')).toBeInTheDocument();
  });

  test('renders author image', () => {
    render(
      <BrowserRouter>
        <ArticleMeta article={mockArticle} canModify={false} />
      </BrowserRouter>
    );
    
    const img = screen.getByAltText('testuser');
    expect(img).toHaveAttribute('src', 'http://example.com/image.jpg');
  });

  test('renders formatted creation date', () => {
    render(
      <BrowserRouter>
        <ArticleMeta article={mockArticle} canModify={false} />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/2025/)).toBeInTheDocument();
  });

  test('uses default image when author image is missing', () => {
    const articleWithoutImage = {
      ...mockArticle,
      author: { username: 'testuser', image: null }
    };
    
    render(
      <BrowserRouter>
        <ArticleMeta article={articleWithoutImage} canModify={false} />
      </BrowserRouter>
    );
    
    const img = screen.getByAltText('testuser');
    expect(img).toHaveAttribute('src', 'https://static.productionready.io/images/smiley-cyrus.jpg');
  });

  test('renders ArticleActions component', () => {
    render(
      <BrowserRouter>
        <ArticleMeta article={mockArticle} canModify={true} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('ArticleActions')).toBeInTheDocument();
  });
});
