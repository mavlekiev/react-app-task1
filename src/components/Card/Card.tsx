import type { ReactNode } from 'react';
import type { CardProps } from '../../utils/interfaces';
import './Card.scss';

const Card = ({ name, description }: CardProps): ReactNode => {
  return (
    <div className="card">
      <h3 className="card__name">{name}</h3>
      <p className="card__description">{description || 'No data'}</p>
    </div>
  );
};

export default Card;
