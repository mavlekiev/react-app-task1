import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../../components/Search/Search';
import { describe, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

describe('Search Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders input and button', () => {
    render(<Search onSearch={() => {}} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  test('loads saved search term from localStorage', () => {
    localStorage.setItem('searchTerm', 'pikachu');
    render(<Search onSearch={() => {}} />);
    expect(screen.getByRole('textbox')).toHaveValue('pikachu');
  });

  test('triggers onSearch and saves to localStorage', async () => {
    const mockSearch = vi.fn();
    render(<Search onSearch={mockSearch} />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'charmander' } });
    fireEvent.click(button);

    expect(mockSearch).toHaveBeenCalledWith('charmander');
    expect(localStorage.getItem('searchTerm')).toBe('charmander');
  });

  test('trims whitespace before saving', async () => {
    const mockSearch = vi.fn();
    render(<Search onSearch={mockSearch} />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: '  bulbasaur  ' } });
    fireEvent.click(button);

    expect(mockSearch).toHaveBeenCalledWith('bulbasaur');
    expect(localStorage.getItem('searchTerm')).toBe('bulbasaur');
  });
});
