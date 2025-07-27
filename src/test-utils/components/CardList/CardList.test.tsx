import { render, screen } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';
import CardList from '../../../components/CardList/CardList';

describe('CardList Component', () => {
  const mockItems = [
    { name: 'Bulbasaur', description: 'Type: grass' },
    { name: 'Charmander', description: 'Type: fire' },
  ];

  const mockOnCardClick = vi.fn();

  test('renders list of cards', () => {
    render(<CardList items={mockItems} onCardClick={mockOnCardClick} />);

    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Charmander')).toBeInTheDocument();
  });

  test('calls onCardClick when card is clicked', () => {
    render(<CardList items={mockItems} onCardClick={mockOnCardClick} />);

    const card = screen.getByText('Bulbasaur');
    card.click();

    expect(mockOnCardClick).toHaveBeenCalledWith('Bulbasaur');
  });

  test('shows "No results" when items are empty', () => {
    render(<CardList items={[]} onCardClick={mockOnCardClick} />);

    expect(screen.getByText('No results')).toBeInTheDocument();
  });
});
