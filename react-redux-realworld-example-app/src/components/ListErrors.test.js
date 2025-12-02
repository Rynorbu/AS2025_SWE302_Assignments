import React from 'react';
import { render, screen } from '@testing-library/react';
import ListErrors from './ListErrors';

describe('ListErrors Component', () => {
  test('renders null when no errors', () => {
    const { container } = render(<ListErrors errors={null} />);
    expect(container.firstChild).toBeNull();
  });

  test('renders empty ul when errors object is empty', () => {
    const { container } = render(<ListErrors errors={{}} />);
    expect(container.querySelector('ul.error-messages')).toBeInTheDocument();
    expect(container.querySelectorAll('li').length).toBe(0);
  });

  test('renders error list when errors exist', () => {
    const errors = {
      email: 'is invalid',
      password: 'is too short'
    };

    render(<ListErrors errors={errors} />);
    
    expect(screen.getByText(/email/)).toBeInTheDocument();
    expect(screen.getByText(/is invalid/)).toBeInTheDocument();
    expect(screen.getByText(/password/)).toBeInTheDocument();
    expect(screen.getByText(/is too short/)).toBeInTheDocument();
  });

  test('renders with danger class', () => {
    const errors = { email: ['is invalid'] };
    
    const { container } = render(<ListErrors errors={errors} />);
    
    expect(container.querySelector('.error-messages')).toBeInTheDocument();
  });
});
