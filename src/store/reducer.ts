import { createReducer } from '@reduxjs/toolkit';
import { setOffersList, setCity, setSortType } from './action';
import { Offers } from '../types/offer';
import { offers as mockOffers } from '@/mocks/offers';
import { DEFAULT_CITY, SortType } from '@/const';
import { Reviews } from '@/types/review';
import { City } from '@/types/city';


type StateType = {
  city: City;
  offers: Offers;
  reviews: Reviews;
  sortType: SortType;
};

const initialState: StateType = {
  city: DEFAULT_CITY,
  offers: [],
  reviews: [],
  sortType: SortType.Popular,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, { payload }) => {
      state.city = payload;
    })
    .addCase(setOffersList, (state) => {
      state.offers = mockOffers;
    })
    .addCase(setSortType, (state, { payload }) => {
      state.sortType = payload;
    });
});
