import { memo } from "react";
import DataTable from "../DataTable/DataTable";
import "./CountryCard.css";
import type { CountryData, YearlyData } from "../../interfaces/interfaces";

interface Props {
  country: CountryData;
  selectedYear: number;
  selectedColumns: string[];
}

const CountryCard = ({ country, selectedYear, selectedColumns }: Props) => {
  const currentData =
    country.data.find((d) => d.year === selectedYear) ||
    country.data[country.data.length - 1];

  return (
    <div className="country-card">
      <h3>
        {country.country} ({country.iso_code})
      </h3>
      <p>
        <strong>Население:</strong>{" "}
        {currentData.population?.toLocaleString() || "N/A"}
      </p>

      <DataTable
        data={country.data as YearlyData[]}
        columns={selectedColumns}
        selectedYear={selectedYear}
      />
    </div>
  );
};

export default memo(CountryCard);
