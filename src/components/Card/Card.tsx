import { useDispatch, useSelector } from 'react-redux';
import { toggleItem } from '../../store/selectedSlice';
import type { RootState } from '../../store/store';
import type { CardProps } from '../../utils/interfaces';
import './Card.scss';

const Card = ({ name, description }: CardProps) => {
  const dispatch = useDispatch();
  const isSelected = useSelector((state: RootState) =>
    Boolean(state.selected.items[name])
  );

  const item = { name, description, url: `/details/${name}` };

  const handleToggle = () => {
    dispatch(toggleItem(item));
  };

  return (
    <div className="card">
      <div className="card__controls">
        <label>
          <input type="checkbox" checked={isSelected} onChange={handleToggle} />
        </label>
      </div>
      <h3 className="card__name">{name}</h3>
      <p className="card__description">{description || 'No data'}</p>
    </div>
  );
};

export default Card;
