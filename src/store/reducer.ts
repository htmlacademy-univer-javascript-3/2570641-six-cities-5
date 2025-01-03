import { createReducer } from '@reduxjs/toolkit';
import { loadOffers, requireAuthorization, setCity, setSortType, setUserEmail } from './action';
import { Offers } from '../types/offer';
import { AuthorizationStatus, DEFAULT_CITY, SortType } from '@/const';
import { Reviews } from '@/types/review';
import { City } from '@/types/city';


type StateType = {
  city: City;
  offers: Offers | undefined;
  reviews: Reviews;
  sortType: SortType;
  authorizationStatus: AuthorizationStatus;
  userEmail: string;
  userToken: string;
};

const initialState: StateType = {
  city: DEFAULT_CITY,
  offers: undefined,
  reviews: [],
  sortType: SortType.Popular,
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: '',
  userToken: '',
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, { payload }) => {
      state.city = payload;
    })
    .addCase(setSortType, (state, { payload }) => {
      state.sortType = payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setUserEmail, (state, { payload }) => {
      state.userEmail = payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});
