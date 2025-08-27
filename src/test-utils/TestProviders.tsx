import type { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import formSlice from "../store/formSlice";

const testStore = configureStore({
  reducer: {
    formData: formSlice,
  },
});

export const TestProviders = ({ children }: PropsWithChildren) => {
  return <Provider store={testStore}>{children}</Provider>;
};
