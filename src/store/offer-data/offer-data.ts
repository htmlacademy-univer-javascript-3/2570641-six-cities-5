import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '@/const';
import { CurrentOfferData } from '@/types/state';
import { Offer, Offers } from '@/types/offer';
import { Review, Reviews } from '@/types/review';

const initialState: CurrentOfferData = {
  offer: null,
  nearbyOffers: [],
  reviews: [],
  notFound: false,
  isLoad: false,
};

export const currentOfferData = createSlice({
  name: NameSpace.CurrentOffer,
  initialState,
  reducers: {
    loadOffer: (state: CurrentOfferData, action: PayloadAction<{ offer: Offer; nearbyOffers: Offers; reviews: Reviews}>) => {
      state.offer = action.payload.offer;
      state.nearbyOffers = action.payload.nearbyOffers;
      state.reviews = action.payload.reviews;
      state.notFound = false;
      state.isLoad = true;
    },
    offerNotFound: (state: CurrentOfferData) => {
      state.notFound = true;
      state.isLoad = true;
    },
    sendReview: (state: CurrentOfferData, action: PayloadAction<Review>) => {
      state.reviews.push(action.payload);
    },
    clearFavorite: (state: CurrentOfferData) => {
      if (state.offer !== null){
        state.offer.isFavorite = false;
      }
    }
  },
});

export const { loadOffer, sendReview, offerNotFound, clearFavorite } = currentOfferData.actions;
