import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders, createMockStore } from '../test-utils';
import ListPagination from './ListPagination';

describe('ListPagination Component', () => {
  const mockPager = jest.fn((page) => Promise.resolve({ articles: [], articlesCount: 0 }));
  let store;

  beforeEach(() => {
    mockPager.mockClear();
    store = createMockStore({});
  });

  test('returns null when articlesCount is 0', () => {
    const { container } = renderWithProviders(
      <ListPagination 
        pager={mockPager} 
        articlesCount={0} 
        currentPage={0} 
      />,
      { store }
    );
    
    expect(container.querySelector('nav')).toBeNull();
  });

  test('returns null when articlesCount is less than 10', () => {
    const { container } = renderWithProviders(
      <ListPagination 
        pager={mockPager} 
        articlesCount={9} 
        currentPage={0} 
      />,
      { store }
    );
    
    expect(container.querySelector('nav')).toBeNull();
  });

  test('renders pagination for 20 articles (2 pages)', () => {
    const { container } = renderWithProviders(
      <ListPagination 
        pager={mockPager} 
        articlesCount={20} 
        currentPage={0} 
      />,
      { store }
    );
    
    const pageLinks = container.querySelectorAll('.page-link');
    expect(pageLinks.length).toBe(2);
  });

  test('renders pagination for 50 articles (5 pages)', () => {
    const { container } = renderWithProviders(
      <ListPagination 
        pager={mockPager} 
        articlesCount={50} 
        currentPage={0} 
      />,
      { store }
    );
    
    const pageLinks = container.querySelectorAll('.page-link');
    expect(pageLinks.length).toBe(5);
  });

  test('first page has active class', () => {
    const { container } = renderWithProviders(
      <ListPagination 
        pager={mockPager} 
        articlesCount={30} 
        currentPage={0} 
      />,
      { store }
    );
    
    const activeItem = container.querySelector('.page-item.active');
    expect(activeItem).toBeInTheDocument();
    expect(activeItem.textContent).toBe('1');
  });

  test('second page has active class when currentPage is 1', () => {
    const { container } = renderWithProviders(
      <ListPagination 
        pager={mockPager} 
        articlesCount={30} 
        currentPage={1} 
      />,
      { store }
    );
    
    const activeItem = container.querySelector('.page-item.active');
    expect(activeItem).toBeInTheDocument();
    expect(activeItem.textContent).toBe('2');
  });

  test('clicking page link dispatches SET_PAGE action', () => {
    renderWithProviders(
      <ListPagination 
        pager={mockPager} 
        articlesCount={30} 
        currentPage={0} 
      />,
      { store }
    );
    
    const secondPageLink = screen.getByText('2');
    fireEvent.click(secondPageLink);
    
    const actions = store.getActions();
    expect(actions.some(a => a.type === 'SET_PAGE')).toBe(true);
  });

  test('displays correct page numbers', () => {
    renderWithProviders(
      <ListPagination 
        pager={mockPager} 
        articlesCount={40} 
        currentPage={0} 
      />,
      { store }
    );
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  test('handles large article counts correctly', () => {
    const { container } = renderWithProviders(
      <ListPagination 
        pager={mockPager} 
        articlesCount={100} 
        currentPage={5} 
      />,
      { store }
    );
    
    const pageLinks = container.querySelectorAll('.page-link');
    expect(pageLinks.length).toBe(10);
  });

  test('renders at exact threshold of 11 articles', () => {
    const { container } = renderWithProviders(
      <ListPagination 
        pager={mockPager} 
        articlesCount={11} 
        currentPage={0} 
      />,
      { store }
    );
    
    const pageLinks = container.querySelectorAll('.page-link');
    expect(pageLinks.length).toBe(2);
  });
});
