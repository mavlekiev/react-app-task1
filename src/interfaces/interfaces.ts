import type { ReactNode } from "react";

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

export interface YearlyData {
  year: number | "N/A";
  population: number | "N/A";
  co2: number | "N/A";
  co2_per_capita: number | "N/A";
  cement_co2: number | "N/A";
  cement_co2_per_capita: number | "N/A";
  cumulative_cement_co2: number | "N/A";
  methane: number | "N/A";
  oil_co2: number | "N/A";
  gas_co2: number | "N/A";
  coal_co2: number | "N/A";
  flaring_co2: number | "N/A";
  other_industry_co2: number | "N/A";
  temperature_change_from_co2: number | "N/A";
}

export interface CountryRawData {
  iso_code: string;
  [key: string]: unknown;
}

export interface CountryData {
  country: string;
  iso_code: string;
  data: YearlyData[];
}

export interface ParsedData {
  [isoCode: string]: {
    country: string;
    data: YearlyData[];
  };
}

export type RawCO2Data = {
  [isoCode: string]: CountryRawData;
};
