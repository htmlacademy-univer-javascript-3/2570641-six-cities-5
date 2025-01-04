import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppData } from '@/types/state';
import { CITIES, NameSpace, SortType } from '../../const.ts';
import { City } from '@/types/city';

const initialState: AppData = {
  city: CITIES[0],
  sortType: SortType.Popular,
};

export const appData = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
    setSortType: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    },
  },
});

export const { setCity, setSortType } = appData.actions;
