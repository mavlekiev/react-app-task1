import { render, screen } from '@testing-library/react';
import Card from '../../components/Card/Card';
import { describe, expect } from 'vitest';

describe('Card Component', () => {
  test('renders name and description correctly', () => {
    const props = {
      name: 'Bulbasaur',
      description: 'Type: Grass / Poison',
    };
    render(<Card {...props} />);
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/grass/i)).toBeInTheDocument();
  });

  test('renders fallback text when no description provided', () => {
    const props = {
      name: 'Unknown',
      description: '',
    };
    render(<Card {...props} />);
    expect(screen.getByText(/no data/i)).toBeInTheDocument();
  });
});
