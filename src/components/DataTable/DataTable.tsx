import { memo } from "react";
import { highlightCell } from "../../utils/highlightTransition";

interface Props {
  data: Array<{ year: number; [key: string]: number | undefined }>;
  columns: string[];
  highlightYear: number;
}

const DataTable = ({ data, columns, highlightYear }: Props) => {
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
        {data.map((row) => (
          <tr key={row.year}>
            {columns.map((col) => (
              <td
                key={`${row.year}-${col}`}
                className={row.year === highlightYear ? "highlight" : ""}
                ref={(el) => highlightCell(el, row.year === highlightYear)}
              >
                {typeof row[col] === "number" ? row[col]?.toFixed(2) : "N/A"}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default memo(DataTable);
