interface Props {
  regions: string[];
  onFilter: (region: string) => void;
}

export default function RegionFilter({ regions, onFilter }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilter(e.target.value);
  };

  return (
    <div>
      <label htmlFor="region-filter">Регион: </label>
      <select
        id="region-filter"
        defaultValue="All"
        onChange={handleChange}
        style={{ padding: "6px", marginLeft: "8px" }}
      >
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
}
