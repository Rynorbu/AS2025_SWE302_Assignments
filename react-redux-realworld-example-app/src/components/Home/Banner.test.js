import React from 'react';
import { render } from '@testing-library/react';
import Banner from './Banner';

describe('Banner Component', () => {
  test('renders banner with correct text when not logged in', () => {
    const { getByText } = render(<Banner appName="Conduit" token={null} />);
    
    expect(getByText(/conduit/i)).toBeInTheDocument();
    expect(getByText(/place to share your knowledge/i)).toBeInTheDocument();
  });

  test('renders banner with correct styling', () => {
    const { container } = render(<Banner appName="Conduit" token={null} />);
    const banner = container.querySelector('.banner');
    
    expect(banner).toBeInTheDocument();
  });

  test('does not render banner when logged in', () => {
    const { container } = render(<Banner appName="Conduit" token="fake-token" />);
    const banner = container.querySelector('.banner');
    
    expect(banner).not.toBeInTheDocument();
  });
});
