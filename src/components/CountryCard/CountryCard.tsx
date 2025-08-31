import { memo } from "react";
import DataTable from "../DataTable/DataTable";
import "./CountryCard.css";

interface Props {
  country: {
    country: string;
    iso_code: string;
    data: Array<{ year: number; [key: string]: number | undefined }>;
  };
  selectedYear: number;
  selectedColumns: string[];
}

const CountryCard = ({ country, selectedYear, selectedColumns }: Props) => {
  const latest = country.data[country.data.length - 1];
  const current = country.data.find((d) => d.year === selectedYear) || latest;

  return (
    <div className="country-card">
      <h3>
        {country.country} ({country.iso_code})
      </h3>
      <p>
        <strong>Население:</strong>{" "}
        {current.population?.toLocaleString() || "N/A"}
      </p>
      <DataTable
        data={country.data}
        columns={selectedColumns}
        highlightYear={selectedYear}
      />
    </div>
  );
};

export default memo(CountryCard);
