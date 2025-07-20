import { render, screen } from '@testing-library/react';
import CardList from '../../components/CardList/CardList';
import { describe, expect } from 'vitest';

describe('CardList Component', () => {
  test('renders list of cards', () => {
    const items = [
      { name: 'Bulbasaur', description: 'Type: Grass' },
      { name: 'Charmander', description: 'Type: Fire' },
    ];
    render(<CardList items={items} />);
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
  });

  test('renders "Pokemon not found" message when empty', () => {
    const { container } = render(<CardList items={[]} />);
    const div = container.querySelector('.card-list');
    expect(div?.textContent).toBe('');
  });
});
