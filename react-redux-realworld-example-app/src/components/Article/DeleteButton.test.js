import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { renderWithProviders, createMockStore } from '../../test-utils';
import DeleteButton from './DeleteButton';

jest.mock('../../agent', () => ({
  Comments: {
    delete: jest.fn(() => Promise.resolve({}))
  }
}));

describe('DeleteButton Component', () => {
  test('renders delete icon when show is true', () => {
    const store = createMockStore({});
    
    const { container } = renderWithProviders(
      <DeleteButton show={true} slug="test-article" commentId={123} />,
      { store }
    );
    
    expect(container.querySelector('.ion-trash-a')).toBeInTheDocument();
  });

  test('returns null when show is false', () => {
    const store = createMockStore({});
    
    const { container } = renderWithProviders(
      <DeleteButton show={false} slug="test-article" commentId={123} />,
      { store }
    );
    
    expect(container.querySelector('.mod-options')).not.toBeInTheDocument();
  });

  test('dispatches DELETE_COMMENT on click', () => {
    const store = createMockStore({});
    
    const { container } = renderWithProviders(
      <DeleteButton show={true} slug="test-article" commentId={123} />,
      { store }
    );
    
    const deleteIcon = container.querySelector('.ion-trash-a');
    fireEvent.click(deleteIcon);
    
    const actions = store.getActions();
    expect(actions.some(a => a.type === 'DELETE_COMMENT')).toBe(true);
  });

  test('includes commentId in action', () => {
    const store = createMockStore({});
    
    const { container } = renderWithProviders(
      <DeleteButton show={true} slug="test-article" commentId={456} />,
      { store }
    );
    
    const deleteIcon = container.querySelector('.ion-trash-a');
    fireEvent.click(deleteIcon);
    
    const actions = store.getActions();
    const deleteAction = actions.find(a => a.type === 'DELETE_COMMENT');
    expect(deleteAction.commentId).toBe(456);
  });
});
