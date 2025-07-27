// src/test-utils/components/Search/Search.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';
import Search from '../../../components/Search/Search';

// ✅ Обобщённое хранилище для мока
let mockStoredValue: unknown = '';

// Мокаем useLocalStorage
vi.mock('../../../hooks/useLocalStorage', () => {
  return {
    useLocalStorage: <T,>(
      key: string,
      initialValue: T
    ): [T, (value: T) => void] => {
      const setValue = (newValue: T) => {
        mockStoredValue = newValue;
      };
      // Явно утверждаем тип, так как мы контролируем мок
      return [(mockStoredValue as T) || initialValue, setValue] as const;
    },
  };
});

describe('Search Component', () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    // ✅ Сбрасываем мок-состояние
    mockStoredValue = '';
    vi.clearAllMocks();
  });

  test('renders input and button', () => {
    render(<Search onSearch={mockOnSearch} disabled={false} />);

    const input = screen.getByPlaceholderText(/enter the name of the pokemon/i);
    const button = screen.getByRole('button', { name: /search/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  test('loads saved search term from localStorage', () => {
    // Устанавливаем начальное значение
    mockStoredValue = 'pikachu';

    render(<Search onSearch={mockOnSearch} disabled={false} />);

    const input = screen.getByPlaceholderText(/enter the name of the pokemon/i);
    expect(input).toHaveValue('pikachu');
  });

  test('does not trigger onSearch when disabled', () => {
    render(<Search onSearch={mockOnSearch} disabled={true} />);

    const button = screen.getByRole('button', { name: /search/i });
    const input = screen.getByPlaceholderText(/enter the name of the pokemon/i);

    fireEvent.change(input, { target: { value: 'pikachu' } });
    fireEvent.click(button);

    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  test('disables input and button when disabled prop is true', () => {
    render(<Search onSearch={mockOnSearch} disabled={true} />);

    const input = screen.getByPlaceholderText(/enter the name of the pokemon/i);
    const button = screen.getByRole('button', { name: /search/i });

    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
  });
});
