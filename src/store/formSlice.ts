import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { countries } from "../utils/countries";
import type { RootState } from "./store";

export interface FormData {
  id: string;
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  acceptTc: boolean;
  image: string;
  country: string;
}

const initialState = {
  entries: [] as FormData[],
  countries: [...countries],
};

const formSlice = createSlice({
  name: "formData",
  initialState,
  reducers: {
    addEntry: (
      state,
      action: PayloadAction<Omit<FormData, "isNew" | "id">>,
    ) => {
      state.entries.unshift({
        ...action.payload,
        id: uuidv4(),
      });
    },

    setCountries: (state, action: PayloadAction<string[]>) => {
      state.countries = action.payload;
    },
  },
});

export const { addEntry, setCountries } = formSlice.actions;
export default formSlice.reducer;

export const selectEntries = (state: RootState) => state.formData.entries;
export const selectCountries = (state: RootState) => state.formData.countries;
