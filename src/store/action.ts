import { createAction } from '@reduxjs/toolkit';
import { Offers, Offer } from '@/types/offer';
import { City } from '@/types/city';
import { AuthorizationStatus, SortType } from '@/const';
import { Reviews, Review } from '@/types/review';

export const loadOffers = createAction<Offers>('offers/loadOffers');
export const loadReviews = createAction<Reviews>('reviews/loadReviews');
export const loadOffer = createAction<{offer: Offer; nearestOffers: Offers; reviews: Reviews } | null>('offers/loadOffer');


export const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorization');
export const setUserEmail = createAction<string>('setUserEmail');
export const setError = createAction<string | null>('setError');

export const setCity = createAction<City>('city/setCity');
export const setSortType = createAction<SortType>('setSortType');
export const sendReview = createAction<Review>('review/send');
