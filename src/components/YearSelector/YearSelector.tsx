import React from "react";

interface Props {
  onYearChange: (year: number) => void;
  currentYear: number;
}

export default function YearSelector({ onYearChange, currentYear }: Props) {
  const years = Array.from({ length: 174 }, (_, i) => 1850 + i);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = Number(e.target.value);
    onYearChange(year);
  };

  return (
    <div>
      <label htmlFor="year-selector">Год: </label>
      <select
        id="year-selector"
        value={currentYear}
        onChange={handleChange}
        style={{ padding: "6px", marginLeft: "8px" }}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}
