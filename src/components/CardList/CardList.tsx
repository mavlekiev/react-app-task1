import React from 'react';
import Card from '../Card/Card';
import type { CardListProps } from '../../utils/interfaces';

const CardList = ({ items, onCardClick }: CardListProps) => {
  if (items.length === 0) {
    return <p>No results</p>;
  }

  return (
    <div className="card-list">
      {items.map((item, index) => (
        <div
          key={index}
          onClick={() => onCardClick(item.name)}
          style={{ cursor: 'pointer' }}
        >
          <Card name={item.name} description={item.description} />
        </div>
      ))}
    </div>
  );
};

export default CardList;
