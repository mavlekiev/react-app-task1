import React from "react";
import "./ColumnModal.css";

interface Props {
  allColumns: string[];
  selectedColumns: string[];
  onClose: () => void;
  onUpdate: (columns: string[]) => void;
}

export default function ColumnModal({
  allColumns,
  selectedColumns,
  onClose,
  onUpdate,
}: Props) {
  const [tempColumns, setTempColumns] =
    React.useState<string[]>(selectedColumns);

  const toggleColumn = (col: string) => {
    setTempColumns((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col],
    );
  };

  const save = () => {
    onUpdate(tempColumns);
    onClose();
  };

  const reset = () => {
    setTempColumns(["year", "population", "co2", "co2_per_capita"]);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Выберите столбцы для отображения</h3>

        <div className="modal-actions">
          <button onClick={reset} type="button">
            Сбросить
          </button>
          <button onClick={onClose} type="button">
            Отмена
          </button>
          <button onClick={save} type="button" className="save-btn">
            Применить
          </button>
        </div>

        <ul className="column-list">
          {allColumns.map((col) => (
            <li key={col}>
              <label>
                <input
                  type="checkbox"
                  checked={tempColumns.includes(col)}
                  onChange={() => toggleColumn(col)}
                />
                {col.replace("_", " ")}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
