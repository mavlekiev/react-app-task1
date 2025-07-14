import { Component, type ReactNode } from 'react';
import type { CardProps } from '../../utils/interfaces';
import './Card.scss';

export default class Card extends Component<CardProps> {
  render(): ReactNode {
    return (
      <div className="card">
        <h3 className="card__name">{this.props.name}</h3>
        <p className="card__description">{this.props.description}</p>
      </div>
    );
  }
}
