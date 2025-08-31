import { useState } from "react";

interface Props {
  allColumns: string[];
  selectedColumns: string[];
  onClose: () => void;
  onUpdate: (cols: string[]) => void;
}

export default function ColumnModal({
  allColumns,
  selectedColumns,
  onClose,
  onUpdate,
}: Props) {
  const [temp, setTemp] = useState(selectedColumns);

  const toggle = (col: string) => {
    setTemp((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col],
    );
  };

  const save = () => {
    onUpdate(temp);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Выберите колонки</h3>
        {allColumns.map((col) => (
          <label key={col}>
            <input
              type="checkbox"
              checked={temp.includes(col)}
              onChange={() => toggle(col)}
            />
            {col}
          </label>
        ))}
        <button onClick={save}>Сохранить</button>
        <button onClick={onClose}>Отмена</button>
      </div>
    </div>
  );
}
