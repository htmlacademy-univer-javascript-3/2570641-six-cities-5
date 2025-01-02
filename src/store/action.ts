import { createAction } from '@reduxjs/toolkit';
import { Offers } from '@/types/offer';
import { City } from '@/types/city';

export const setOffersList = createAction<Offers>('offers/setOffersList');
export const setCity = createAction<City>('city/setCity');
