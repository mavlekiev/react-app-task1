import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { expect, vi } from 'vitest';

const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
});

beforeEach(() => {
  vi.clearAllMocks();
  window.localStorage.clear();
});

describe('useLocalStorage', () => {
  test('returns initialValue if there is no data in localStorage', () => {
    mockLocalStorage.getItem.mockReturnValue(null);

    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

    expect(result.current[0]).toBe('default');
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('test-key');
  });

  test('returns the value from localStorage if it exists', () => {
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify('saved-value'));

    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

    expect(result.current[0]).toBe('saved-value');
  });

  test('returns initialValue on JSON parsing error', () => {
    mockLocalStorage.getItem.mockReturnValue('invalid-json');
    const consoleWarnSpy = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {});

    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

    expect(result.current[0]).toBe('default');
    expect(consoleWarnSpy).toHaveBeenCalled();
    consoleWarnSpy.mockRestore();
  });

  test('updates the value and saves it to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

    act(() => {
      result.current[1]('new-value');
    });

    expect(result.current[0]).toBe('new-value');
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'test-key',
      JSON.stringify('new-value')
    );
  });

  test('synchronizes with changes from another tab (storage event)', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'test-key',
          newValue: JSON.stringify('updated-by-another-tab'),
        })
      );
    });

    expect(result.current[0]).toBe('updated-by-another-tab');
  });

  test('sets initialValue if storage event has removed the value', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'test-key',
          newValue: null,
        })
      );
    });

    expect(result.current[0]).toBe('default');
  });

  test('ignores storage event for other keys', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'other-key',
          newValue: JSON.stringify('something'),
        })
      );
    });

    expect(result.current[0]).toBe('default');
  });

  test('handles error when writing to localStorage', () => {
    mockLocalStorage.setItem.mockImplementation(() => {
      throw new Error('Storage quota exceeded');
    });
    const consoleWarnSpy = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {});

    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

    act(() => {
      result.current[1]('new-value');
    });

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'Error writing to localStorage by key "test-key"',
      expect.any(Error)
    );
    consoleWarnSpy.mockRestore();
  });

  test('handles error when reading from localStorage', () => {
    mockLocalStorage.getItem.mockImplementation(() => {
      throw new Error('Storage access denied');
    });
    const consoleWarnSpy = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {});

    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

    expect(result.current[0]).toBe('default');
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'Error reading from localStorage by key "test-key"',
      expect.any(Error)
    );
    consoleWarnSpy.mockRestore();
  });
});
