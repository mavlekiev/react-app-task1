import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./formSlice";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    formData: formReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
