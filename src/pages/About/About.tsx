import React from 'react';
import { Link } from 'react-router-dom';
import './About.scss';

const About = () => {
  return (
    <div className="about">
      <h1 className="about__title">About Pokémon Search App</h1>

      <section className="about-section">
        <h2 className="about-section__title">Application Details</h2>
        <p className="about-section__text">
          This is a React application built as part of the
          <strong> RS School React Course</strong>.
        </p>
        <p className="about-section__text">
          It allows users to search for Pokémon, view details, and navigate
          through paginated results.
        </p>
      </section>

      <section className="about-section">
        <h2 className="about-section__title">Author</h2>
        <p className="about-section__text">
          <strong>Name:</strong> Marat
        </p>
        <p>
          <strong>GitHub: </strong>
          <a
            className="about-section__link"
            href="https://github.com/mavlekiev"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://github.com/mavlekiev
          </a>
        </p>
      </section>

      <section className="about-section">
        <h2 className="about-section__title">Technologies Used</h2>
        <ul className="about-section__list">
          <li className="about-section__item">React + TypeScript</li>
          <li className="about-section__item">React Router</li>
          <li className="about-section__item">Vite</li>
          <li className="about-section__item">PokeAPI</li>
          <li className="about-section__item">CSS (SCSS)</li>
          <li className="about-section__item">Vitest</li>
        </ul>
      </section>

      <section className="about-section">
        <h2 className="about-section__title">Course Link</h2>
        <p className="about-section__text">
          <a
            className="about-section__link"
            href="https://rs.school/courses/reactjs"
            target="_blank"
            rel="noopener noreferrer"
          >
            RS School React Course
          </a>
        </p>
      </section>

      <footer className="about-footer">
        <Link className="about-footer__link" to="/">
          ← Back to Search
        </Link>
      </footer>
    </div>
  );
};

export default About;
