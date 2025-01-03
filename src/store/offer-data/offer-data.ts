import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '@/const';
import { CurrentOfferData } from '@/types/state';
import { Offer, Offers } from '@/types/offer';
import { Review, Reviews } from '@/types/review';

const initialState: CurrentOfferData = undefined;

export const currentOfferData = createSlice({
  name: NameSpace.CurrentOffer,
  initialState,
  reducers: {
    loadOffer: (state: CurrentOfferData, action: PayloadAction<{ offer: Offer; nearbyOffers: Offers; reviews: Reviews}>) => {
      state = {offer: action.payload.offer, nearbyOffers: action.payload.nearbyOffers, reviews: action.payload.reviews, notFound: false};
    },
    offerNotFound: (state: CurrentOfferData) => {
      state!.notFound = true;
    },
    sendReview: (state: CurrentOfferData, action: PayloadAction<Review>) => {
      state!.reviews.push(action.payload);
    },
  },
});

export const { loadOffer, sendReview, offerNotFound } = currentOfferData.actions;
