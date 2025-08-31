import type {
  ParsedData,
  YearlyData,
  CountryRawData,
} from "../interfaces/interfaces";

let dataCache: ParsedData | null = null;

let pendingPromise: Promise<ParsedData> | null = null;

const fetchData = (): Promise<ParsedData> => {
  if (dataCache) {
    return Promise.resolve(dataCache);
  }

  if (pendingPromise) {
    return pendingPromise;
  }

  pendingPromise = fetch(
    "https://raw.githubusercontent.com/mavlekiev/co2-data/refs/heads/main/owid-co2-data%20(2).json"
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      return res.json();
    })
    .then((rawData: Record<string, CountryRawData | null>): ParsedData => {
      const parsed: ParsedData = {};

      for (const [countryName, entry] of Object.entries(rawData)) {
        if (
          entry === null ||
          typeof entry !== "object" ||
          !("iso_code" in entry) ||
          !Array.isArray(entry.data)
        ) {
          console.warn(`Пропущена некорректная запись: ${countryName}`);
          continue;
        }

        const isoCode = entry.iso_code as string;

        try {
          parsed[countryName] = {
            country: isoCode,
            data: entry.data.map(
              (item): YearlyData => ({
                year: item.year ?? "N/A",
                population: item.population ?? "N/A",
                co2: item.co2 ?? "N/A",
                co2_per_capita: item.co2_per_capita ?? "N/A",
                cement_co2: item.cement_co2 ?? "N/A",
                cement_co2_per_capita: item.cement_co2_per_capita ?? "N/A",
                cumulative_cement_co2: item.cumulative_cement_co2 ?? "N/A",
                methane: item.methane ?? "N/A",
                oil_co2: item.oil_co2 ?? "N/A",
                gas_co2: item.gas_co2 ?? "N/A",
                coal_co2: item.coal_co2 ?? "N/A",
                flaring_co2: item.flaring_co2 ?? "N/A",
                other_industry_co2: item.other_industry_co2 ?? "N/A",
                temperature_change_from_co2:
                  item.temperature_change_from_co2 ?? "N/A",
              })
            ),
          };
        } catch (err) {
          console.warn(`Ошибка обработки данных для ${countryName}:`, err);
          continue;
        }
      }

      dataCache = parsed;
      return parsed;
    })
    .catch((err) => {
      pendingPromise = null;
      console.error("Ошибка загрузки или обработки данных:", err);
      throw err;
    });

  return pendingPromise;
};

export function useCO2Data(): ParsedData {
  if (dataCache) {
    return dataCache;
  }

  throw fetchData();
}
