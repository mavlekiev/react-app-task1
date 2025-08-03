import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Flyout from '../../../components/Flyout/Flyout';
import selectedReducer, {
  type SelectedState,
} from '../../../store/selectedSlice';

const renderWithRedux = (preloadedState: Partial<SelectedState> = {}) => {
  const store = configureStore({
    reducer: { selected: selectedReducer },
    preloadedState: {
      selected: {
        items: {},
        ...preloadedState,
      },
    },
  });

  render(
    <Provider store={store}>
      <Flyout />
    </Provider>
  );

  return { store };
};

describe('Flyout Component', () => {
  it('does not render when no items are selected', () => {
    renderWithRedux();

    expect(screen.queryByText(/items are selected/i)).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Unselect all/i })
    ).not.toBeInTheDocument();
  });

  it('renders with correct count when items are selected', () => {
    renderWithRedux({
      items: {
        bulbasaur: {
          name: 'bulbasaur',
          description: 'Type: grass',
          url: '/details/bulbasaur',
        },
        charmander: {
          name: 'charmander',
          description: 'Type: fire',
          url: '/details/charmander',
        },
      },
    });

    expect(screen.getByText('2 items are selected')).toBeInTheDocument();
  });

  it('dispatches clearAll when "Unselect all" is clicked', () => {
    const { store } = renderWithRedux({
      items: {
        pikachu: {
          name: 'pikachu',
          description: 'Electric mouse',
          url: '/details/pikachu',
        },
      },
    });

    const unselectAllButton = screen.getByRole('button', {
      name: /Unselect all/i,
    });
    fireEvent.click(unselectAllButton);

    expect(store.getState().selected.items).toEqual({});
  });

  it('button has correct classes', () => {
    renderWithRedux({
      items: {
        bulbasaur: {
          name: 'bulbasaur',
          description: 'Type: grass',
          url: '/details/bulbasaur',
        },
      },
    });

    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toHaveClass('flyout__button');
    });
  });
});
