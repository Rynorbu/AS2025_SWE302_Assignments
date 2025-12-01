import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders, createMockStore } from '../test-utils';
import ProfileFavorites from './ProfileFavorites';

const mockMatch = {
  params: { username: 'testuser' }
};

describe('ProfileFavorites Component', () => {
  test('renders favorited articles tab as active', () => {
    const store = createMockStore({
      articleList: { articles: [], articlesCount: 0 },
      common: { currentUser: null },
      profile: {
        username: 'testuser',
        bio: 'Test bio'
      }
    });

    const { container } = renderWithProviders(
      <ProfileFavorites match={mockMatch} />,
      { store }
    );
    
    const favoritesTab = screen.getByText('Favorited Articles').closest('a');
    expect(favoritesTab).toHaveClass('nav-link', 'active');
  });

  test('renders My Articles tab as inactive', () => {
    const store = createMockStore({
      articleList: { articles: [], articlesCount: 0 },
      common: { currentUser: null },
      profile: {
        username: 'testuser',
        bio: 'Test bio'
      }
    });

    const { container } = renderWithProviders(
      <ProfileFavorites match={mockMatch} />,
      { store }
    );
    
    const myArticlesTab = screen.getByText('My Articles').closest('a');
    expect(myArticlesTab).toHaveClass('nav-link');
    expect(myArticlesTab).not.toHaveClass('active');
  });

  test('returns null when profile is not loaded', () => {
    const store = createMockStore({
      articleList: { articles: [], articlesCount: 0 },
      common: { currentUser: null },
      profile: null
    });

    const { container } = renderWithProviders(
      <ProfileFavorites match={mockMatch} />,
      { store }
    );
    
    expect(container.querySelector('.profile-page')).toBeNull();
  });
});
