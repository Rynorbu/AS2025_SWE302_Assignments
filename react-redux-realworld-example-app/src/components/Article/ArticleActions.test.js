import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders, createMockStore } from '../../test-utils';
import ArticleActions from './ArticleActions';

jest.mock('../../agent', () => ({
  Articles: {
    del: jest.fn(() => Promise.resolve({}))
  }
}));

describe('ArticleActions Component', () => {
  const mockArticle = {
    slug: 'test-article',
    title: 'Test Article'
  };

  test('renders edit and delete buttons when canModify is true', () => {
    const store = createMockStore({});
    
    renderWithProviders(
      <BrowserRouter>
        <ArticleActions article={mockArticle} canModify={true} />
      </BrowserRouter>,
      { store }
    );
    
    expect(screen.getByText(/Edit Article/i)).toBeInTheDocument();
    expect(screen.getByText(/Delete Article/i)).toBeInTheDocument();
  });

  test('does not render buttons when canModify is false', () => {
    const store = createMockStore({});
    
    renderWithProviders(
      <BrowserRouter>
        <ArticleActions article={mockArticle} canModify={false} />
      </BrowserRouter>,
      { store }
    );
    
    expect(screen.queryByText(/Edit Article/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Delete Article/i)).not.toBeInTheDocument();
  });

  test('edit button links to correct URL', () => {
    const store = createMockStore({});
    
    renderWithProviders(
      <BrowserRouter>
        <ArticleActions article={mockArticle} canModify={true} />
      </BrowserRouter>,
      { store }
    );
    
    const editLink = screen.getByText(/Edit Article/i).closest('a');
    expect(editLink).toHaveAttribute('href', '/editor/test-article');
  });

  test('delete button dispatches DELETE_ARTICLE action', () => {
    const store = createMockStore({});
    
    renderWithProviders(
      <BrowserRouter>
        <ArticleActions article={mockArticle} canModify={true} />
      </BrowserRouter>,
      { store }
    );
    
    const deleteButton = screen.getByText(/Delete Article/i);
    fireEvent.click(deleteButton);
    
    const actions = store.getActions();
    expect(actions.some(a => a.type === 'DELETE_ARTICLE')).toBe(true);
  });

  test('renders icons for edit and delete', () => {
    const store = createMockStore({});
    
    const { container } = renderWithProviders(
      <BrowserRouter>
        <ArticleActions article={mockArticle} canModify={true} />
      </BrowserRouter>,
      { store }
    );
    
    expect(container.querySelector('.ion-edit')).toBeInTheDocument();
    expect(container.querySelector('.ion-trash-a')).toBeInTheDocument();
  });
});
