import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders, createMockStore } from '../test-utils';
import Profile from './Profile';

const mockMatch = {
  params: { username: 'testuser' }
};

describe('Profile Component', () => {
  test('returns null when profile is not loaded', () => {
    const store = createMockStore({
      articleList: { articles: [], articlesCount: 0 },
      common: { currentUser: null },
      profile: null
    });

    const { container } = renderWithProviders(
      <Profile match={mockMatch} />,
      { store }
    );
    
    expect(container.querySelector('.profile-page')).toBeNull();
  });

  test('renders profile page when profile is loaded', () => {
    const store = createMockStore({
      articleList: { articles: [], articlesCount: 0 },
      common: { currentUser: null },
      profile: {
        username: 'testuser',
        bio: 'Test bio',
        image: 'http://example.com/image.jpg'
      }
    });

    const { container } = renderWithProviders(
      <Profile match={mockMatch} />,
      { store }
    );
    
    expect(container.querySelector('.profile-page')).toBeInTheDocument();
  });

  test('displays user information', () => {
    const store = createMockStore({
      articleList: { articles: [], articlesCount: 0 },
      common: { currentUser: null },
      profile: {
        username: 'testuser',
        bio: 'This is a test bio',
        image: 'http://example.com/image.jpg'
      }
    });

    renderWithProviders(<Profile match={mockMatch} />, { store });
    
    expect(screen.getByText('testuser')).toBeInTheDocument();
    expect(screen.getByText('This is a test bio')).toBeInTheDocument();
  });

  test('shows Edit Profile Settings for own profile', () => {
    const store = createMockStore({
      articleList: { articles: [], articlesCount: 0 },
      common: { currentUser: { username: 'testuser' } },
      profile: { username: 'testuser', bio: 'Bio' }
    });

    renderWithProviders(<Profile match={mockMatch} />, { store });
    
    expect(screen.getByText(/Edit Profile Settings/i)).toBeInTheDocument();
  });

  test('shows Follow button for other users', () => {
    const store = createMockStore({
      articleList: { articles: [], articlesCount: 0 },
      common: { currentUser: { username: 'currentuser' } },
      profile: { username: 'testuser', bio: 'Bio', following: false }
    });

    renderWithProviders(<Profile match={mockMatch} />, { store });
    
    expect(screen.getByText(/Follow testuser/i)).toBeInTheDocument();
  });

  test('shows Unfollow button when already following', () => {
    const store = createMockStore({
      articleList: { articles: [], articlesCount: 0 },
      common: { currentUser: { username: 'currentuser' } },
      profile: { username: 'testuser', bio: 'Bio', following: true }
    });

    renderWithProviders(<Profile match={mockMatch} />, { store });
    
    expect(screen.getByText(/Unfollow testuser/i)).toBeInTheDocument();
  });

  test('renders My Articles and Favorited Articles tabs', () => {
    const store = createMockStore({
      articleList: { articles: [], articlesCount: 0 },
      common: { currentUser: null },
      profile: { username: 'testuser', bio: 'Bio' }
    });

    renderWithProviders(<Profile match={mockMatch} />, { store });
    
    expect(screen.getByText('My Articles')).toBeInTheDocument();
    expect(screen.getByText('Favorited Articles')).toBeInTheDocument();
  });
});
