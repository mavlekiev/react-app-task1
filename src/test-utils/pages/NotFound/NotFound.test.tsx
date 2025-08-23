import { render, screen } from '@testing-library/react';
import { describe, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import NotFound from '../../../pages/NotFound/NotFound';

describe('NotFound Component', () => {
  test('renders the 404 title', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    const title = screen.getByText('404 — Page not found');
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H2');
  });

  test('displays the error message', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    const message = screen.getByText(
      'Sorry, the page you requested does not exist.'
    );
    expect(message).toBeInTheDocument();
    expect(message.tagName).toBe('P');
  });

  test('contains a link to the home page', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    const link = screen.getByRole('link', { name: /Return to home page/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });

  test('link text is correct', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    const link = screen.getByRole('link', { name: 'Return to home page' });
    expect(link).toHaveTextContent('Return to home page');
  });
});
