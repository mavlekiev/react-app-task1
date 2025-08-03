import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Card from '../../../components/Card/Card';
import selectedReducer from '../../../store/selectedSlice';

const renderWithRedux = (component: React.ReactNode, preloadedState = {}) => {
  const store = configureStore({
    reducer: { selected: selectedReducer },
    preloadedState: {
      selected: {
        items: {},
        ...preloadedState,
      },
    },
  });

  render(<Provider store={store}>{component}</Provider>);
  return { store };
};

describe('Card Component', () => {
  const defaultProps = {
    name: 'Bulbasaur',
    description: 'Type: grass, Weight: 6.9 kg',
  };

  test('renders name and description', () => {
    renderWithRedux(<Card {...defaultProps} />);
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Type: grass, Weight: 6.9 kg')).toBeInTheDocument();
  });

  test('shows "No data" if description is empty', () => {
    renderWithRedux(<Card name="Pikachu" description="" />);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('No data')).toBeInTheDocument();
  });

  test('checkbox is unchecked by default', () => {
    renderWithRedux(<Card {...defaultProps} />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  test('checkbox becomes checked when item is selected', () => {
    renderWithRedux(<Card {...defaultProps} />, {
      items: {
        Bulbasaur: {
          name: 'Bulbasaur',
          description: 'Type: grass, Weight: 6.9 kg',
          url: '/details/Bulbasaur',
        },
      },
    });

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  test('clicking checkbox toggles selection', () => {
    const { store } = renderWithRedux(<Card {...defaultProps} />);
    const checkbox = screen.getByRole('checkbox');

    fireEvent.click(checkbox);
    expect(store.getState().selected.items['Bulbasaur']).toBeDefined();

    fireEvent.click(checkbox);
    expect(store.getState().selected.items['Bulbasaur']).toBeUndefined();
  });
});
