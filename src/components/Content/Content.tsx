import { useState, useCallback, useMemo } from "react";
import { useCO2Data } from "../../hooks/useCO2Data";
import CountryCard from "../CountryCard/CountryCard";
import SearchBar from "../SearchBar/SearchBar";
import YearSelector from "../YearSelector/YearSelector";
import RegionFilter from "../RegionFilter/RegionFilter";
import SortControls from "../SetControls/SetControls";
import ColumnModal from "../ColumnModal/ColumnModal";
import type { CountryData } from "../../interfaces/interfaces";

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
    return Object.keys(sample).filter((key) => key !== "year");
  }, [countries]);

  const filteredCountries = useMemo(() => {
    return countries.filter((c) => {
      const matchesSearch = c.country
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const latest = c.data[c.data.length - 1];
      const region = latest?.region || "";
      const matchesRegion = regionFilter === "All" || region === regionFilter;
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
        const popA = aData.population || 0;
        const popB = bData.population || 0;
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
    <div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        <SearchBar onSearch={handleSearch} />
        <YearSelector onYearChange={handleYearChange} />
        <RegionFilter regions={regions} onFilter={handleRegionChange} />
        <SortControls sortBy={sortBy} onSort={handleSort} />
        <button onClick={openModal}>Выбрать колонки</button>
      </div>

      {sortedCountries.map((c) => (
        <CountryCard
          key={c.iso_code}
          country={c}
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
