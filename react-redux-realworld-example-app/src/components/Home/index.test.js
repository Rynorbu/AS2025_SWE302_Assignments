import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders, createMockStore } from '../../test-utils';

// Mock agent module
jest.mock('../../agent', () => ({
  Tags: {
    getAll: jest.fn(() => Promise.resolve({ tags: ['test', 'example'] }))
  },
  Articles: {
    all: jest.fn(() => Promise.resolve({ articles: [], articlesCount: 0 })),
    feed: jest.fn(() => Promise.resolve({ articles: [], articlesCount: 0 }))
  }
}));

const Home = require('./index').default;

describe('Home Component', () => {
  test('renders home page', () => {
    const store = createMockStore({
      home: { tags: ['test', 'example'] },
      common: { appName: 'Conduit', token: null },
      articleList: { articles: [], articlesCount: 0 }
    });

    const { container } = renderWithProviders(<Home />, { store });
    expect(container.querySelector('.home-page')).toBeInTheDocument();
  });

  test('renders Popular Tags heading', () => {
    const store = createMockStore({
      home: { tags: [] },
      common: { appName: 'Conduit', token: null },
      articleList: { articles: [], articlesCount: 0 }
    });

    renderWithProviders(<Home />, { store });
    expect(screen.getByText('Popular Tags')).toBeInTheDocument();
  });

  test('renders Banner when not logged in', () => {
    const store = createMockStore({
      home: { tags: [] },
      common: { appName: 'Conduit', token: null },
      articleList: { articles: [], articlesCount: 0 }
    });

    const { container } = renderWithProviders(<Home />, { store });
    expect(container.querySelector('.banner')).toBeInTheDocument();
  });

  test('does not render Banner when logged in', () => {
    const store = createMockStore({
      home: { tags: [] },
      common: { appName: 'Conduit', token: 'test-token' },
      articleList: { articles: [], articlesCount: 0 }
    });

    const { container } = renderWithProviders(<Home />, { store });
    expect(container.querySelector('.banner')).not.toBeInTheDocument();
  });

  test('dispatches HOME_PAGE_LOADED on mount', async () => {
    const store = createMockStore({
      home: { tags: [] },
      common: { appName: 'Conduit', token: null },
      articleList: { articles: [], articlesCount: 0 }
    });

    renderWithProviders(<Home />, { store });
    
    // Wait for async actions to complete
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const actions = store.getActions();
    const hasHomePageLoaded = actions.some(a => a.type === 'HOME_PAGE_LOADED');
    expect(hasHomePageLoaded).toBe(true);
  });

  test('renders Tags component', () => {
    const store = createMockStore({
      home: { tags: ['react', 'testing'] },
      common: { appName: 'Conduit', token: null },
      articleList: { articles: [], articlesCount: 0 }
    });

    renderWithProviders(<Home />, { store });
    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getByText('testing')).toBeInTheDocument();
  });
});
