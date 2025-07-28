import { render, screen } from '@testing-library/react';
import { describe, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import About from '../../../pages/About/About';

describe('About Component', () => {
  test('renders the main title', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );

    const title = screen.getByText('About Pokémon Search App');
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H1');
  });

  test('displays application details section', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );

    const sectionTitle = screen.getByText('Application Details');
    expect(sectionTitle).toBeInTheDocument();

    const rsSchoolText = screen.getByText(/built as part of the/);
    expect(rsSchoolText).toBeInTheDocument();

    const descriptionText = screen.getByText(
      /It allows users to search for Pokémon, view details, and navigate through paginated results./
    );
    expect(descriptionText).toBeInTheDocument();
  });

  test('displays author information', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );

    const authorTitle = screen.getByText('Author');
    expect(authorTitle).toBeInTheDocument();

    const nameText = screen.getByText('Name:', { exact: false });
    expect(nameText).toBeInTheDocument();
    expect(screen.getByText('Marat')).toBeInTheDocument();

    const githubLink = screen.getByRole('link', {
      name: /https:\/\/github\.com\/mavlekiev/i,
    });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/mavlekiev');
    expect(githubLink).toHaveAttribute('target', '_blank');
  });

  test('displays technologies used list', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );

    const techTitle = screen.getByText('Technologies Used');
    expect(techTitle).toBeInTheDocument();

    const technologies = [
      'React + TypeScript',
      'React Router',
      'Vite',
      'PokeAPI',
      'CSS (SCSS)',
      'Vitest',
    ];

    technologies.forEach((tech) => {
      expect(screen.getByText(tech)).toBeInTheDocument();
    });
  });

  test('displays course link', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );

    const courseLink = screen.getByRole('link', {
      name: /RS School React Course/i,
    });
    expect(courseLink).toBeInTheDocument();
    expect(courseLink).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );
    expect(courseLink).toHaveAttribute('target', '_blank');
  });

  test('has a back link to the main page', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );

    const backLink = screen.getByRole('link', { name: /← Back to Search/i });
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute('href', '/');
  });
});
