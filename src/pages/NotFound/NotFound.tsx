import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.scss';

const NotFound = () => {
  return (
    <div className="not-found">
      <h2 className="not-found__title">404 — Page not found</h2>
      <p className="not-found__text">
        Sorry, the page you requested does not exist.
      </p>
      <Link className="not-found__link" to="/">
        Return to home page
      </Link>
    </div>
  );
};

export default NotFound;
