import { store } from '@/store/index';
import { City } from './city';
import { AuthorizationStatus, SortType } from '@/const';
import { Offer, Offers } from './offer';
import { Reviews } from './review';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export type AppData = {
    city: City;
    sortType: SortType;
};

export type UserProcess = {
    authorizationStatus: AuthorizationStatus;
    userEmail: string | null;
    userToken: string | null;
};

export type CurrentOfferData = {
    offer: Offer | null;
    nearbyOffers: Offers;
    reviews: Reviews;
    notFound: boolean;
    isLoad: boolean;
};

export type OffersData = {
    offers: Offers;
};

export type FavoritesData = {
    favorites: Offers;
};
