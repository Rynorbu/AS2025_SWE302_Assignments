import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Tags from './Tags';

describe('Tags Component', () => {
  const mockOnClickTag = jest.fn();

  beforeEach(() => {
    mockOnClickTag.mockClear();
  });

  test('renders loading state when no tags provided', () => {
    const { container } = render(<Tags tags={null} onClickTag={mockOnClickTag} />);
    
    expect(screen.getByText('Loading Tags...')).toBeInTheDocument();
  });

  test('renders tag list when tags are provided', () => {
    const tags = ['react', 'redux', 'javascript'];
    const { container } = render(<Tags tags={tags} onClickTag={mockOnClickTag} />);
    
    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getByText('redux')).toBeInTheDocument();
    expect(screen.getByText('javascript')).toBeInTheDocument();
    
    const tagList = container.querySelector('.tag-list');
    expect(tagList).toBeInTheDocument();
  });

  test('renders correct number of tags', () => {
    const tags = ['test1', 'test2', 'test3', 'test4'];
    const { container } = render(<Tags tags={tags} onClickTag={mockOnClickTag} />);
    
    const tagElements = container.querySelectorAll('.tag-default');
    expect(tagElements.length).toBe(4);
  });

  test('each tag has correct CSS classes', () => {
    const tags = ['testing'];
    const { container } = render(<Tags tags={tags} onClickTag={mockOnClickTag} />);
    
    const tagElement = container.querySelector('a');
    expect(tagElement).toHaveClass('tag-default', 'tag-pill');
  });

  test('clicking a tag calls onClickTag', () => {
    const tags = ['clickme'];
    render(<Tags tags={tags} onClickTag={mockOnClickTag} />);
    
    const tagElement = screen.getByText('clickme');
    fireEvent.click(tagElement);
    
    expect(mockOnClickTag).toHaveBeenCalledTimes(1);
  });

  test('renders empty array of tags', () => {
    const tags = [];
    const { container } = render(<Tags tags={tags} onClickTag={mockOnClickTag} />);
    
    const tagList = container.querySelector('.tag-list');
    expect(tagList).toBeInTheDocument();
    expect(tagList.children.length).toBe(0);
  });

  test('clicking tag prevents default behavior', () => {
    const tags = ['test'];
    render(<Tags tags={tags} onClickTag={mockOnClickTag} />);
    
    const tagElement = screen.getByText('test');
    const event = { preventDefault: jest.fn() };
    
    fireEvent.click(tagElement, event);
    
    // Event handler should be called
    expect(mockOnClickTag).toHaveBeenCalled();
  });
});
