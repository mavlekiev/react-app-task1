interface Props {
  onYearChange: (year: number) => void;
}

export default function YearSelector({ onYearChange }: Props) {
  const years = Array.from({ length: 175 }, (_, i) => 1850 + i);
  const currentYear = 2020;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = Number(e.target.value);
    onYearChange(year);
  };

  return (
    <div>
      <label htmlFor="year-select">Год: </label>
      <select
        id="year-select"
        defaultValue={currentYear}
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
