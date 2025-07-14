import { Component, type ReactNode } from 'react';

import './CardList.scss';
import Card from './Card';

interface CardListProps {
  items: Array<{ name: string; description: string }>;
}

export default class CardList extends Component<CardListProps> {
  render(): ReactNode {
    return (
      <div className="card-list">
        {this.props.items.map((item, index) => (
          <Card key={index} name={item.name} description={item.description} />
        ))}
      </div>
    );
  }
}
