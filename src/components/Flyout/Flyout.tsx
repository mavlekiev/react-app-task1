import { useSelector, useDispatch } from 'react-redux';
import { clearAll } from '../../store/selectedSlice';
import type { RootState } from '../../store/store';
import './Flyout.scss';

const Flyout = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector((state: RootState) => state.selected.items);
  const count = Object.keys(selectedItems).length;

  if (count === 0) return null;

  const handleDownload = () => {
    const csvContent = [
      ['Name', 'Description', 'URL'].join(','),
      ...Object.values(selectedItems).map(
        (item) => `"${item.name}","${item.description}","${item.url}"`
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${count}_items.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flyout">
      <span>{count} items are selected</span>
      <div className="flyout__buttons">
        <button className="flyout__button" onClick={() => dispatch(clearAll())}>
          Unselect all
        </button>
        <button className="flyout__button" onClick={handleDownload}>
          Download
        </button>
      </div>
    </div>
  );
};

export default Flyout;
