import { Component, type ReactNode } from 'react';
import './Card.scss';

interface CardProps {
  name: string;
  description: string;
}

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
