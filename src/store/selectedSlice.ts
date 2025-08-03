import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface PokemonItem {
  name: string;
  description: string;
  url: string;
}

export interface SelectedState {
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
        delete state.items[item.name]; // eslint-disable-line @typescript-eslint/no-dynamic-delete
      } else {
        state.items[item.name] = item;
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      delete state.items[action.payload]; // eslint-disable-line @typescript-eslint/no-dynamic-delete
    },
    clearAll: (state) => {
      state.items = {};
    },
  },
});

export const { toggleItem, removeItem, clearAll } = selectedSlice.actions;

export default selectedSlice.reducer;
