import { render, screen } from '@testing-library/react';
import { describe, expect } from 'vitest';
import Card from '../../../components/Card/Card';

describe('Card Component', () => {
  test('renders name and description', () => {
    render(<Card name="Bulbasaur" description="Type: grass, Weight: 6.9 kg" />);

    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Type: grass, Weight: 6.9 kg')).toBeInTheDocument();
  });

  test('shows "No data" if description is empty', () => {
    render(<Card name="Pikachu" description="" />);

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('No data')).toBeInTheDocument();
  });
});
