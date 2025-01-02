import { createAction } from '@reduxjs/toolkit';
import { Offers } from '@/types/offer';

export const setOffersList = createAction<Offers>('offers/setOffersList');
export const setCity = createAction<string>('city/setCity');
