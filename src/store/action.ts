import { createAction } from '@reduxjs/toolkit';
import { Offers } from '@/types/offer';
import { City } from '@/types/city';
import { AuthorizationStatus, SortType } from '@/const';
import { Reviews } from '@/types/review';

export const loadOffers = createAction<Offers>('offers/loadOffers');
export const loadReviews = createAction<Reviews>('reviews/loadReviews');

export const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorization');
export const setError = createAction<string | null>('setError');
export const setOffersDataLoadingStatus = createAction<boolean>('setOffersDataLoadingStatus');

export const setCity = createAction<City>('city/setCity');
export const setSortType = createAction<SortType>('setSortType');
