import { Component, type ReactNode } from 'react';
import type { CardProps } from '../../utils/interfaces';
import './Card.scss';

export default class Card extends Component<CardProps> {
  render(): ReactNode {
    const { name, description } = this.props;

    return (
      <div className="card">
        <h3 className="card__name">{name}</h3>
        <p className="card__description">{description || 'No data'}</p>
      </div>
    );
  }
}
