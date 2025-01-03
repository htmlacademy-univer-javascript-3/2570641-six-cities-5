import { createReducer } from '@reduxjs/toolkit';
import { loadOffer, loadOffers, requireAuthorization, sendReview, setCity, setSortType, setUserEmail } from './action';
import { Offers, Offer } from '../types/offer';
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
  offer: {offer: Offer; nearbyOffers: Offers; reviews: Reviews } | undefined | null;
};

const initialState: StateType = {
  city: DEFAULT_CITY,
  offers: undefined,
  reviews: [],
  sortType: SortType.Popular,
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: '',
  userToken: '',
  offer: undefined,
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
    })
    .addCase(loadOffer, (state, { payload }) => {
      if (payload === null){
        state.offer = null;
      } else {
        state.offer = {
          offer: payload.offer,
          nearbyOffers: payload.nearestOffers,
          reviews: payload.reviews
        };
      }
    })
    .addCase(sendReview, (state, { payload }) => {
      state.offer?.reviews.push(payload);
    });
});
