import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface PokemonItem {
  name: string;
  description: string;
  url: string;
}

interface SelectedState {
  items: Record<string, PokemonItem>;
}

const initialState: SelectedState = {
  items: {},
};

export const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    toggleItem: (state, action: PayloadAction<PokemonItem>) => {
      const item = action.payload;
      if (state.items[item.name]) {
        delete state.items[item.name];
      } else {
        state.items[item.name] = item;
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      delete state.items[action.payload];
    },
    clearAll: (state) => {
      state.items = {};
    },
    addItems: (state, action: PayloadAction<Record<string, PokemonItem>>) => {
      state.items = { ...state.items, ...action.payload };
    },
  },
});

export const { toggleItem, removeItem, clearAll, addItems } =
  selectedSlice.actions;

export default selectedSlice.reducer;
