import { memo } from "react";
import { highlightCell } from "../../utils/highlightTransition";
import type { YearlyData } from "../../interfaces/interfaces";
import "./DataTable.css";

interface Props {
  data: YearlyData[];
  columns: string[];
  selectedYear: number;
}

const DataTable = ({ data, columns, selectedYear }: Props) => {
  const rowData = data.find((item) => item.year === selectedYear);
  const displayRow = rowData || data[data.length - 1] || null;

  if (!displayRow) {
    return <p>Нет данных</p>;
  }

  return (
    <table className="data-table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col}>{col.replace("_", " ")}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {columns.map((col) => {
            const value = displayRow[col];
            const cellKey = `${selectedYear}-${col}`;

            let displayValue: React.ReactNode = "N/A";

            if (value !== undefined && value !== null) {
              if (col === "year") {
                displayValue = value;
              } else if (col === "population") {
                displayValue =
                  typeof value === "number"
                    ? value.toLocaleString("ru-RU")
                    : value;
              } else if (typeof value === "number") {
                displayValue = value.toFixed(2);
              } else {
                displayValue = value;
              }
            }

            return (
              <td key={cellKey} ref={(el) => highlightCell(el, true)}>
                {displayValue}
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  );
};

export default memo(DataTable);
