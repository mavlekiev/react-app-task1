import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CardList from '../../../components/CardList/CardList';
import selectedReducer from '../../../store/selectedSlice';

const renderWithRedux = (component: React.ReactNode) => {
  const store = configureStore({
    reducer: { selected: selectedReducer },
    preloadedState: {
      selected: { items: {} },
    },
  });

  render(<Provider store={store}>{component}</Provider>);
  return { store };
};

describe('CardList Component', () => {
  const mockItems = [
    { name: 'Bulbasaur', description: 'Type: grass' },
    { name: 'Charmander', description: 'Type: fire' },
  ];

  const mockOnCardClick = vi.fn();

  test('renders list of cards', () => {
    renderWithRedux(
      <CardList items={mockItems} onCardClick={mockOnCardClick} />
    );

    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Charmander')).toBeInTheDocument();
  });

  test('calls onCardClick when card is clicked', () => {
    renderWithRedux(
      <CardList items={mockItems} onCardClick={mockOnCardClick} />
    );

    const card = screen.getByText('Bulbasaur');
    fireEvent.click(card);

    expect(mockOnCardClick).toHaveBeenCalledWith('Bulbasaur');
  });

  test('shows "No results" when items are empty', () => {
    renderWithRedux(<CardList items={[]} onCardClick={mockOnCardClick} />);

    expect(screen.getByText('No results')).toBeInTheDocument();
  });
});
