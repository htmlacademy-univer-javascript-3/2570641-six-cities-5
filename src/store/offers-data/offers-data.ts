import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '@/const';
import { OffersData } from '@/types/state';
import { Offers } from '@/types/offer';

const initialState: OffersData = {
  offers: [],
};

export const offersData = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    loadOffers: (state, action: PayloadAction<Offers>) => {
      state.offers = action.payload;
    },
  },
});

export const { loadOffers } = offersData.actions;
