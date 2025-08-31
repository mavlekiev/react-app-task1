import { useState, useCallback, useMemo } from "react";
import { useCO2Data } from "../../hooks/useCO2Data";
import CountryCard from "../CountryCard/CountryCard";
import SearchBar from "../SearchBar/SearchBar";
import YearSelector from "../YearSelector/YearSelector";
import RegionFilter from "../RegionFilter/RegionFilter";
import SortControls from "../SetControls/SetControls";
import ColumnModal from "../ColumnModal/ColumnModal";
import type { CountryData } from "../../interfaces/interfaces";
import { countryToRegion, isRegionGroup } from "../../utils/regionMapping";

const Content: React.FC = () => {
  const rawData = useCO2Data();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState(2020);
  const [regionFilter, setRegionFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"name" | "population">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    "year",
    "population",
    "co2",
    "co2_per_capita",
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const regions = [
    "All",
    "Europe",
    "Asia",
    "Africa",
    "Americas",
    "Oceania",
    "International",
  ];

  const countries = useMemo((): CountryData[] => {
    return Object.entries(rawData).map(([iso, data]) => ({
      country: data.country,
      iso_code: iso,
      data: data.data,
    }));
  }, [rawData]);

  const allColumns = useMemo(() => {
    const sample = countries[0]?.data[0];
    if (!sample) return [];
    return Object.keys(sample).filter(
      (key) => !["year", "country"].includes(key),
    );
  }, [countries]);

  const filteredCountries = useMemo(() => {
    return countries.filter((country) => {
      const matchesSearch = country.country
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      let countryRegion = countryToRegion[country.country];

      if (!countryRegion && isRegionGroup.has(country.country)) {
        countryRegion = country.country;
      }

      if (!countryRegion) {
        const lastData = country.data[country.data.length - 1];
        countryRegion = lastData?.region?.toString() || "";
      }

      if (!countryRegion) {
        countryRegion = "";
      }

      const matchesRegion =
        regionFilter === "All" || countryRegion === regionFilter;

      return matchesSearch && matchesRegion;
    });
  }, [countries, searchQuery, regionFilter]);

  const sortedCountries = useMemo(() => {
    return [...filteredCountries].sort((a, b) => {
      const aData =
        a.data.find((d) => d.year === selectedYear) ||
        a.data[a.data.length - 1];
      const bData =
        b.data.find((d) => d.year === selectedYear) ||
        b.data[b.data.length - 1];

      if (sortBy === "name") {
        return sortOrder === "asc"
          ? a.country.localeCompare(b.country)
          : b.country.localeCompare(a.country);
      } else {
        const popA =
          typeof aData.population === "number" ? aData.population : 0;
        const popB =
          typeof bData.population === "number" ? bData.population : 0;
        return sortOrder === "asc" ? popA - popB : popB - popA;
      }
    });
  }, [filteredCountries, sortBy, sortOrder, selectedYear]);

  const handleSearch = useCallback(
    (query: string) => setSearchQuery(query),
    [],
  );
  const handleYearChange = useCallback(
    (year: number) => setSelectedYear(year),
    [],
  );
  const handleRegionChange = useCallback(
    (region: string) => setRegionFilter(region),
    [],
  );
  const handleSort = useCallback(
    (by: "name" | "population") => {
      if (by === sortBy) {
        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
      } else {
        setSortBy(by);
        setSortOrder("asc");
      }
    },
    [sortBy],
  );

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);
  const updateColumns = useCallback(
    (cols: string[]) => setSelectedColumns(cols),
    [],
  );

  return (
    <div className="content-container">
      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          marginBottom: "24px",
          alignItems: "center",
        }}
      >
        <SearchBar onSearch={handleSearch} />
        <YearSelector
          onYearChange={handleYearChange}
          currentYear={selectedYear}
        />
        <RegionFilter
          regions={regions}
          onFilter={handleRegionChange}
          currentRegion={regionFilter}
        />
        <SortControls sortBy={sortBy} onSort={handleSort} />
        <button
          onClick={openModal}
          style={{
            padding: "6px 12px",
            background: "#4a90e2",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Выбрать столбцы
        </button>
      </div>

      {sortedCountries.map((country) => (
        <CountryCard
          key={country.iso_code}
          country={country}
          selectedYear={selectedYear}
          selectedColumns={selectedColumns}
        />
      ))}

      {isModalOpen && (
        <ColumnModal
          allColumns={allColumns}
          selectedColumns={selectedColumns}
          onClose={closeModal}
          onUpdate={updateColumns}
        />
      )}
    </div>
  );
};

export default Content;
