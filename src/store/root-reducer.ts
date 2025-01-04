import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '@/const';
import { appData } from './app-data/app-data';
import { currentOfferData } from './offer-data/offer-data';
import { userProcess } from './user-process/user-process';
import { offersData } from './offers-data/offers-data';
import { favoritesData } from './favorites/favorites';

export const rootReducer = combineReducers({
  [NameSpace.App]: appData.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.CurrentOffer]: currentOfferData.reducer,
  [NameSpace.Offers]: offersData.reducer,
  [NameSpace.Favorites]: favoritesData.reducer,
});
