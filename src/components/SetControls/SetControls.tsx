interface Props {
  sortBy: "name" | "population";
  onSort: (by: "name" | "population") => void;
}

export default function SortControls({ sortBy, onSort }: Props) {
  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      <span>Сортировать по:</span>
      <button
        onClick={() => onSort("name")}
        style={{
          fontWeight: sortBy === "name" ? "bold" : "normal",
          padding: "4px 8px",
          background: "#f0f0f0",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        Имени
      </button>
      <button
        onClick={() => onSort("population")}
        style={{
          fontWeight: sortBy === "population" ? "bold" : "normal",
          padding: "4px 8px",
          background: "#f0f0f0",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        Населению
      </button>
    </div>
  );
}
