import { Component, type ReactNode } from 'react';

import './CardList.scss';
import Card from '../Card/Card';
import type { CardListProps } from '../../utils/interfaces';

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
