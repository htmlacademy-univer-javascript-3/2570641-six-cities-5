import { createAction } from '@reduxjs/toolkit';
import { Offers } from '@/types/offer';
import { City } from '@/types/city';
import { SortType } from '@/const';

export const setOffersList = createAction<Offers>('offers/setOffersList');
export const setCity = createAction<City>('city/setCity');
export const setSortType = createAction<SortType>('setSortType');