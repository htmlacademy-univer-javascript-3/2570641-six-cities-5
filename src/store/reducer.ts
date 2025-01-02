import { createReducer } from '@reduxjs/toolkit';
import { setOffersList, setCity } from './action';
import { Offers } from '../types/offer';
import { offers as mockOffers } from '@/mocks/offers';
import { DEFAULT_CITY } from '@/const';
import { Reviews } from '@/types/review';
import { City } from '@/types/city';


type StateType = {
  city: City;
  offers: Offers;
  reviews: Reviews;
};

const initialState: StateType = {
  city: DEFAULT_CITY,
  offers: [],
  reviews: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, { payload }) => {
      state.city = payload;
    })
    .addCase(setOffersList, (state) => {
      state.offers = mockOffers;
    });
});
