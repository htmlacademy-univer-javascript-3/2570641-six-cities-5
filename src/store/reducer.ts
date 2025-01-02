import { createReducer } from '@reduxjs/toolkit';
import { setOffersDataLoadingStatus, loadOffers, setCity, setSortType } from './action';
import { Offers } from '../types/offer';
import { DEFAULT_CITY, SortType } from '@/const';
import { Reviews } from '@/types/review';
import { City } from '@/types/city';


type StateType = {
  city: City;
  offers: Offers;
  reviews: Reviews;
  sortType: SortType;
  isOffersDataLoading: boolean;
};

const initialState: StateType = {
  city: DEFAULT_CITY,
  offers: [],
  reviews: [],
  sortType: SortType.Popular,
  isOffersDataLoading: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, { payload }) => {
      state.city = payload;
    })
    .addCase(setSortType, (state, { payload }) => {
      state.sortType = payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    });
});
