import React from "react";

interface Props {
  regions: string[];
  onFilter: (region: string) => void;
  currentRegion: string;
}

export default function RegionFilter({
  regions,
  onFilter,
  currentRegion,
}: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilter(e.target.value);
  };

  return (
    <div>
      <label htmlFor="region-filter">Регион: </label>
      <select
        id="region-filter"
        value={currentRegion}
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
