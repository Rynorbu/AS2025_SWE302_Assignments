import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders, createMockStore } from '../../test-utils';
import MainView from './MainView';

describe('MainView Component', () => {
  test('renders Global Feed tab', () => {
    const store = createMockStore({
      articleList: { articles: [], articlesCount: 0, tab: 'all' },
      home: { tags: [] },
      common: { token: null }
    });

    renderWithProviders(<MainView />, { store });
    expect(screen.getByText('Global Feed')).toBeInTheDocument();
  });

  test('renders Your Feed tab when logged in', () => {
    const store = createMockStore({
      articleList: { articles: [], articlesCount: 0, tab: 'feed' },
      home: { tags: [] },
      common: { token: 'test-token' }
    });

    renderWithProviders(<MainView />, { store });
    expect(screen.getByText('Your Feed')).toBeInTheDocument();
  });

  test('does not render Your Feed tab when not logged in', () => {
    const store = createMockStore({
      articleList: { articles: [], articlesCount: 0, tab: 'all' },
      home: { tags: [] },
      common: { token: null }
    });

    renderWithProviders(<MainView />, { store });
    expect(screen.queryByText('Your Feed')).not.toBeInTheDocument();
  });

  test('highlights active Global Feed tab', () => {
    const store = createMockStore({
      articleList: { articles: [], articlesCount: 0, tab: 'all' },
      home: { tags: [] },
      common: { token: null }
    });

    const { container } = renderWithProviders(<MainView />, { store });
    const globalTab = screen.getByText('Global Feed').closest('a');
    expect(globalTab).toHaveClass('nav-link', 'active');
  });

  test('highlights active Your Feed tab', () => {
    const store = createMockStore({
      articleList: { articles: [], articlesCount: 0, tab: 'feed' },
      home: { tags: [] },
      common: { token: 'test-token' }
    });

    const { container } = renderWithProviders(<MainView />, { store });
    const feedTab = screen.getByText('Your Feed').closest('a');
    expect(feedTab).toHaveClass('nav-link', 'active');
  });

  test('shows tag filter tab when tag is selected', () => {
    const store = createMockStore({
      articleList: { articles: [], articlesCount: 0, tab: 'all', tag: 'testing' },
      home: { tags: [] },
      common: { token: null }
    });

    renderWithProviders(<MainView />, { store });
    expect(screen.getByText('testing')).toBeInTheDocument();
  });

  test('does not show tag filter when no tag selected', () => {
    const store = createMockStore({
      articleList: { articles: [], articlesCount: 0, tab: 'all', tag: null },
      home: { tags: [] },
      common: { token: null }
    });

    const { container } = renderWithProviders(<MainView />, { store });
    const ionPound = container.querySelector('.ion-pound');
    expect(ionPound).not.toBeInTheDocument();
  });
});
